<template>
  <div>
    <LeftContext :class="offset" class="inline-block" :item="item" />
    <TextContent class="inline-block" :item="item"  
    @insert="insertItem" 
    @setlevel="setLevel" />
    <label id="id" hidden> {{ item.id }}</label>
  </div>
</template>

<script>
import { ref, emit } from "vue";
import LeftContext from "./LeftContext.vue";
import TextContent from "./rowcontent/TextContent.vue";
import { getOffsetStyle }  from "../composables/utils";
import { useGlobalStore } from "@/stores/GlobalStore";

export default {
  props: ["item"],
  components: { LeftContext, TextContent },
  setup(props, {emit}) {
    const globalStore = useGlobalStore();
    const offset = ref('')
    offset.value = getOffsetStyle(props.item)

    const insertItem = (itemId) => {
      emit('insert', itemId)
    }

    const setLevel = (item) => {
        console.log('set level for ', item)
        offset.value = getOffsetStyle(item)
        console.log(offset.value)        
    }

    return { 
      insertItem,
      setLevel,
      offset,
      globalStore
     }
  }
};
</script>

<style></style>
