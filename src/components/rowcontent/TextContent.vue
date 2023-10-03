<template>
    <div class="inline-block">
        <input type="text"
            class="inline-block w-[40rem] bg-gray-100 hover:border-b hover:border-gray-200 focus:border-b focus:outline-none focus:border-gray-300 selection:bg-blue-200"
            :class="{ 'line-through text-gray-200': item && item.attr.complete }" 
            v-model="item.val"
            @blur="finishEditing(item)" 
            @keyup.enter="insertItem(item)" 
            @keydown.shift.tab.prevent="removeParent(item)" 
            @keydown.tab.exact.prevent="addParent(item)"
            @select="onTextSelect()" />
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
        const globalStore = useGlobalStore();
        const insertItem = async (item) => {
            //console.log(globalStore.workItems)

            let newUUID = uuidv4();
            globalStore.insertItemAfterId(item.id, {
                id: newUUID,
                parent_id: item.parent_id,
                val: "",
                attr: { complete: false },
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
                
                emit('setlevel', item)          
            }  
        }

        const removeParent = () => {
            console.log('remove parent')
        }

        const onTextSelect = () => { 
            console.log('Text selected')
        };

        const finishEditing = (item) => { 
            console.log('Finished editing', item)
            // Update the item
            globalStore.updateItem(item)
        };

        return {
            insertItem,
            onTextSelect,
            finishEditing,
            addParent,
            removeParent,
        };
    },
};
</script>

<style></style>
