<template>
  <div class="navbar">
    <nav>
        <h1><router-link :to="{ name: 'home'}">WorkI</router-link></h1>
        <div class="links">
            <div v-if="user">
                <button  @click="handleLogout">Logout</button>
            </div>            
            <div v-else>
                <router-link v-if="!user" class="btn" :to="{ name: 'signup' }">Signup</router-link>
                <router-link v-if="!user" class="btn" :to="{ name: 'login' }">Login</router-link>
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
        const { user } = getCurrentUser()
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

<style scoped>
.navbar {
    padding: 16px 10px;
    margin-bottom: 60px;
    background: white;
}

nav {
    display: flex;
    align-items: center;
    max-width: auto;
    margin:0 auto;
}

nav h1 {
    margin-left: 20px;
}

nav .links {
    margin-left: auto;
}

nav .links a, button {
    margin-left: 16px;
    font-size: 14px;
}
</style>