<template>
    <div class="z-10 absolute p-2 bg-gray-100 bg-opacity-100 w-60 border-2 rounded-md border-gray-200 shadow-lg" @click.self="$emit('closeModal')">
        <div class="pl-1 hover:bg-gray-200 " 
        @click="$emit('selectItem',selectedItem, item)" 
        v-for="item in globalStore.contexMenu" :key="item.id">
            <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h- mr-1 align-middle inline-block ">
              <path stroke-linecap="round" stroke-linejoin="round" :d="item.icon" />
            </svg>
            <div class="text-sm inline-block" >{{  item.val  }}</div>
        </div>
    </div>
</template>

<script>
import { useGlobalStore } from "@/stores/GlobalStore";

export default {
    props: ['selectedItem'],
    setup() {
        const globalStore = useGlobalStore();

        return { globalStore }
    }
  }

</script>

<style>

</style>