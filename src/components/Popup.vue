<template>
    <div class="z-10 absolute bg-gray-white bg-opacity-50 w-60 border-2 rounded-md border-gray-200 shadow-lg" @click.self="$emit('closeModal')">
        <div v-for="item in items" :key="item.id">
            <div class="hover:bg-blue-200" @click="$emit('selectItem',item)">{{  item.val  }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['items'],
    setup() {
       
    }
}
</script>

<style>

</style>