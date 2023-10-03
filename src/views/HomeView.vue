<template>
  <ul class="flex flex-col m-10 justify-center items-center ">
    <li  v-for="item in globalStore.workItems" :key="item.id" ref="itemRefs" >
      <Row :item="item"  @insert="insertItem" />
    </li>
  </ul>
</template>

<script>
import Row from "@/components/Row.vue";
import { useGlobalStore } from "@/stores/GlobalStore";
import { ref, nextTick } from "vue";

export default {
  components: { Row },
  setup() {
    const itemRefs = ref([])
    const globalStore = useGlobalStore();
    const  insertItem = async (itemId) => {
      console.log('insert', itemId)
      console.log('itemrefs', itemRefs.value)
      let toFocus = null;

      itemRefs.value.forEach((itemRef) => {
          if (itemRef.children[0].children[2].innerText === itemId) {
              toFocus = itemRef;
          }
      });
      if (toFocus) {   
          //console.log(toFocus.children[0].children[1].children[0])
          toFocus.children[0].children[1].children[0].focus()
      } else {
          console.log('Couldnt find a match to focus')
      }
    }

    return {
      globalStore,
      itemRefs,
      insertItem
    };
  },
};
</script>
