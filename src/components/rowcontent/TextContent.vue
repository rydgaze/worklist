<template>
    <div class="outline-0"
    :class="{
            'line-through text-gray-300': (item && item.attr.complete),
        }"             
    @keyup.prevent.enter="insertItem(item)"
    @keydown.prevent.enter=""
    @blur="finishEditing(item)"
    @keydown.tab.exact.prevent="addParent(item)"
    contenteditable="true">
        
        <!--
        <label 
        class="absolute  
        mt-[-18px]
        text-gray-500
        xl:w-[60rem] lg:w-[40rem] md:w-[30rem] sm:w-[20rem]         
        inline-block" 
        :class="{
            'line-through text-gray-300': (item && item.attr.complete),
            'font-bold': (item && item.attr.bold),
            'italic': (item && item.attr.italic),
        }">
            {{ item.val }}
        </label>

        <input type="text" 
            class="absolute  
            mt-[-18px]
            text-opacity-0
            bg-opacity-0
            xl:w-[60rem] lg:w-[40rem] md:w-[30rem] sm:w-[20rem] 
            bg-gray-100 
            hover:border-b hover:border-gray-200 
            focus:border-b focus:outline-none focus:border-gray-300 
            selection:bg-blue-200
            " 
            :class="{
            'line-through text-gray-300': (item && item.attr.complete),
            'font-bold': (item && item.attr.bold),
            'italic': (item && item.attr.italic),
        }"
            v-model="item.val" 
            @blur="finishEditing(item)" 
            @keyup.enter="insertItem(item)"
            @keydown.shift.tab.prevent="removeParent(item)" 
            @keydown.tab.exact.prevent="addParent(item)"
            @keydown.prevent.ctrl.b="item.attr.bold = true" 
            @keydown.prevent.ctrl.i="item.attr.italic = true"
            @select="onTextSelect(item)" 
        />
        -->
        <span  v-html="item.val" ref="innerContent" class="outline-0"></span>

    </div>
</template>

<script>
import { useGlobalStore } from "@/stores/GlobalStore";
import { ref, onMounted, nextTick, emit } from "vue";
import { v4 as uuidv4 } from "uuid";
import { insertItemAfterId } from "@/composables/utils";

export default {
    props: ["item"],
    setup(props, { emit }) {
        const innerContent = ref("")
        const globalStore = useGlobalStore();
        const insertItem = async (item) => {
            console.log(globalStore.workItems)

            let newUUID = uuidv4();
            globalStore.insertItemAfterId(item.id, {
                id: newUUID,
                parent_id: item.parent_id,
                val: "",
                attr: { complete: false, bold: false, italic: false },
                level: item.level,
            });

            await nextTick()
            emit('insert', newUUID)
        };

        const addParent = (item) => {
            const itemAbove = globalStore.getElementAbove(item.id)
            console.log('add parent', itemAbove)
            if (itemAbove &&
                (itemAbove.level == item.level)) {
                item.level = itemAbove.level + 1
                item.parent_id = itemAbove.id
                emit('setlevel', item)

                // TODO: Move all children as well
            }
        }

        const removeParent = (item) => {
            const itemAbove = globalStore.getElementAbove(item.id)
            console.log('remove parent', itemAbove)
            if (itemAbove) {
                item.level = itemAbove.level
                item.parent_id = itemAbove.parent_id
                emit('setlevel', item)

                // TODO: Move all children as well

            }
        }

        const onTextSelect = (item) => {
            console.log('Text selected')
        }

        const finishEditing = (item) => {
            console.log('Finished editing', innerContent.value.innerHTML)
            // Update the item
            item.val = innerContent.value.innerHTML 
            globalStore.updateItem(item)
        }

        return {
            insertItem,
            onTextSelect,
            finishEditing,
            addParent,
            removeParent,
            innerContent
        }
    },
};
</script>

<style></style>
