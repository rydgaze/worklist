<template>
  <div class="inline-block relative">
    <svg @click="showPopup(item)"
      class="w-6 mr-2 text-gray-400 opacity-50 hover:opacity-100 hover:text-gray-800 cursor-pointer inline-block"
      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="{1.5}" stroke="currentColor"
      className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>

    <transition enter-active-class="duration-300 ease-out" enter-from-class="transform opacity-0"
      enter-to-class="opacity-100" leave-active-class="duration-200 ease-in" leave-from-class="opacity-100"
      leave-to-class="transform opacity-0">
      <!-- class="right-9" to move this around-->
      <Popup v-if="globalStore.showModalWithId == item.id" :id="item.id" :selectedItem="item" @selectItem="selectItem"
        @closeModal="closeModal" />
    </transition>
  </div>

  <!-- To handle external clock to close the popup
  <div class="top-0 left-0 fixed opacity-0 bg-gray-100 w-full h-full" 
    v-if="globalStore.showModalWithId == item.id"
    @click.self="closeModal">
  </div>
   -->
</template>

<script>
import { ref } from "vue"
import Popup from "./Popup.vue"
import { useGlobalStore } from "@/stores/GlobalStore";

export default {
  props: ["item"],
  components: { Popup },
  setup(props) {
    const globalStore = useGlobalStore();

    const closeModal = () => {
      globalStore.showModalWithId = ""
    };

    const selectItem = (selectedItem, item) => {
      console.log("Item", item);
      console.log("selectedItem", selectedItem)
      // Do not use string. Also.. Is this the place for this?
      if (item.val == 'Complete') {
        // TODO: All children?
        selectedItem.attr.complete = !selectedItem.attr.complete
      } else if (item.val == 'Delete') {
        globalStore.deleteItem(selectedItem)
      }
      closeModal()
    };

    const showPopup = (item) => {
      //console.log('show popup')
      //console.log(item)
      if (!item) {
        closeModal()
      } else if (globalStore.showModalWithId != item.id) {
        globalStore.showModalWithId = item.id;
      } else {
        closeModal()
      }
    };

    return {
      selectItem,
      closeModal,
      showPopup,
      globalStore
    };
  }

};
</script>

<style></style>


