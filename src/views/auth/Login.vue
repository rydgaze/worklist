<template>
  <div class="mt-9 flex flex-col justify-center items-center ">
    <form @submit.prevent="handleSubmit" >
      <h3 class="text-xl font-semibold m-1 mb-4">Login to your account</h3>
      <input class="input" type="email" placeholder="Email" v-model="email" required>
      <br>
      <input class="input" type="password" placeholder="Password" v-model="password" required>
      <br>
      <div class="error" v-if="error">{{ error }}</div>
      <br>
      <button class="btn" v-if="!isPending">Log in</button>
      <button class="btn" disabled v-else>Logging in</button>
      <div class="text-xs text-gray-500 hover:underline font-bold p-1">
        <router-link :to="{name:'signup'}">Sign up for a new account </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import useLogin from '@/composables/useLogin'
import { ref } from 'vue'
import { useRouter } from "vue-router"

export default {
    setup() {
        const { error, isPending, login } = useLogin()
        const email = ref('')
        const password = ref('')
        error.value = '';
        const router = useRouter()

        const handleSubmit = async () => {
           const res =  await login(email.value, password.value)
           if (!error.value) {
                console.log(`User ${email.value} logged in `)
                router.push({name:'home'})
           }
        }
        return { email, password, isPending, handleSubmit, error}
    }
}
</script>

<style>

</style>