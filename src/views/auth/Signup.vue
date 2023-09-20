<template>
  <div class="mt-9 flex flex-col justify-center items-center">
    <form @submit.prevent="handleSubmit">
      <h3 class="text-xl font-semibold m-1 mb-4">Get a new account</h3>
      <input type="text" class="input" placeholder="Display Name" v-model="displayName" required>
      <br>
      <input type="email" class="input" placeholder="Email" v-model="email" required>
      <br>
      <input type="password" class="input" placeholder="Password" v-model="password" required>
      <br>
      <div class="error" v-if="error">{{ error }}</div>
      <br>
      <button class="btn" v-if="!isPending">Sign up</button>
      <button class="btn" disabled v-else>Working..</button>
      <div class="text-xs text-gray-500 hover:underline font-bold p-1">
        <router-link :to="{name:'login'}">Log in instead?</router-link>
      </div>
  </form>
</div>
</template>

<script>
import useSignup from '@/composables/useSignup'
import { ref } from 'vue'
import { useRouter } from "vue-router"

export default {

  setup() {
    const { error, isPending, signup} = useSignup()
    const displayName = ref('')
    const email = ref('')
    const password = ref('')
    const router = useRouter()


    const handleSubmit = async () => {
      const creds = await signup(email.value, password.value, displayName.value)
      if (!error.value) {
          console.log(`User ${email.value} created `)
          router.push({name:'home'})
      }
    }
    return { displayName, email, password, error, isPending, handleSubmit}
  }
}
</script>

<style>

</style>