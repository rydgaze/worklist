<template>
  <div>
    <LeftContext class="inline-block" :item="item" />
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
export default {
  props: ["item"],
  components: { LeftContext, TextContent },
  setup(props, {emit}) {

    const insertItem = (itemId) => {
      emit('insert', itemId)
    }

    const setLevel = (item) => {
        console.log('set level for ', item)
    }

    return { 
      insertItem,
      setLevel
     }
  }
};
</script>

<style></style>
