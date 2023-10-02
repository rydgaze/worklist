<template>
  <div class="flex">
    <LeftContext class="inline-block" :item="item" />
    <TextContent class="inline-block" :item="item"  @insert="insertItem"  />
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

    return { insertItem }
  }
};
</script>

<style></style>
