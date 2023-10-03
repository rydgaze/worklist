<template>
  <div class="inline-block relative">
    <svg
      @click="showPopup(item)"
      class="w-6 mr-2 text-gray-400 opacity-50 hover:opacity-100 hover:text-gray-800 cursor-pointer inline-block"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="{1.5}"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>

    <transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="transform opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="transform opacity-0"
    >
      <!-- class="right-9" to move this around-->
      <Popup
        v-if="showModalWithId == item.id"
        :id="item.id"
        :selectedItem="item"
        @selectItem="selectItem"
        @closeModal="closeModal"
      />
    </transition>
  </div>
</template>

<script>
import { ref } from "vue";
import Popup from "./Popup.vue";
export default {
  props: ["item"],
  components: { Popup },
  setup(props) {
    let showModalWithId = ref("");

    const selectItem = (selectedItem, item) => {
      console.log("Item", item);
      console.log("selectedItem", selectedItem);
      showModalWithId.value = "";
    };

    const closeModal = () => {
      showModalWithId.value = "";
    };

    const showPopup = (item) => {
      //console.log('show popup')
      //console.log(item)
      if (showModalWithId.value != item.id) {
        showModalWithId.value = item.id;
      } else {
        showModalWithId.value = "";
      }
    };

    return {
      selectItem,
      closeModal,
      showPopup,
      showModalWithId,
    };
  },
};
</script>

<style></style>


