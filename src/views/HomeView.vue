<template>

    <div  v-if="globalStore.isLoading">Loading ... </div>
    
      <ul class="flex flex-col ml-40 mt-10   ">
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
    console.log('setup')
    const itemRefs = ref([])
    const globalStore = useGlobalStore()

    globalStore.getItems()
    const workItems =  globalStore.workItems
    console.log("setup", workItems)

    const  insertItem = async (itemId) => {
      console.log('insert', itemId)
      //console.log('itemrefs', itemRefs.value)
      let toFocus = null;

      itemRefs.value.forEach((itemRef) => {
        console.log(itemRef)
          if (itemRef.children[0].children[2].innerText === itemId) {
              toFocus = itemRef;
          }
      });
      if (toFocus) {   
          console.log(toFocus.children[0].children[1])
          toFocus.children[0].children[1].focus()
      } else {
          console.log('Couldnt find a match to focus')
      }
    }

    return {
      globalStore,
      itemRefs,
      insertItem,
      workItems
    };
  },
};
</script>
