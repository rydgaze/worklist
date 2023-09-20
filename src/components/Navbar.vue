<template>
  <div class="navbar" >
    <nav class="b-3 bg-gray-200 p-3 flex justify-between">
        <h1 class="text-3xl font-bold uppercase"><router-link :to="{ name: 'home'}">WorkI</router-link></h1>
        <div class="">
            <div v-if="user">
                <button class="btn"  @click="handleLogout">Logout</button>
            </div>            
            
        </div>
    </nav>
  </div>
</template>

<script>
import getCurrentUser from "@/composables/getCurrentUser"
import  useLogout  from "@/composables/useLogout"
import { useRouter } from "vue-router"
export default {
    setup() {
        const user = getCurrentUser()
        const { error, isPending, logout } =  useLogout()
        const router = useRouter()
        const handleLogout = async () => {
            await logout();
            router.push({ name: "login"})
        }
        return { user, isPending, handleLogout }
    }
}
</script>

<style>
</style>