<template>
    <div class="inline-block relative">
        <input type="text"
            class="inline-block bg-gray-100 hover:border-b w-full hover:border-gray-200 focus:border-b focus:outline-none focus:border-gray-300 selection:bg-blue-200"
            :class="{ 'line-through text-gray-200': item && item.attr.complete }" v-model="item.val"
            @blur="finishEditing(item)" @keyup.enter="insertItem(item)" @keydown.tab.prevent="makeChild(item)" @select="onTextSelect()" />
    </div>
</template>

<script>
import { useGlobalStore } from "@/stores/GlobalStore";
import { ref, onMounted, nextTick, emit } from "vue";
import { v4 as uuidv4 } from "uuid";
import { insertItemAfterId } from "@/composables/utils";

export default {
    props: ["item", "refs"],
    setup(props, { emit }) {
        const globalStore = useGlobalStore();
        const insertItem = async (item) => {
            //console.log(globalStore.workItems)

            let newUUID = uuidv4();
            globalStore.insertItemAfterId(item.id, {
                id: newUUID,
                val: "",
                attr: { complete: false },
            });

            await nextTick()  
            emit('insert', newUUID)
        };

        const makeChild = async (item) => {
            console.log('make child')
        }

        const onTextSelect = () => { };

        const finishEditing = () => { };

        return {
            insertItem,
            onTextSelect,
            finishEditing,
            makeChild
        };
    },
};
</script>

<style></style>
