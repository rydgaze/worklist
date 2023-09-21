<template>
  <div class="">
    <Navbar />
    <div class="font-content">
      <router-view/>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue"
export default {
  components: { Navbar }
}
</script>
<style>

</style>
