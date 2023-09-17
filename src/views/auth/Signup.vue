<template>
  <form @submit.prevent="handleSubmit">
    <h3>Signup</h3>
    <input type="text" placeholder="Display Name" v-model="displayName" required>
    <input type="email" placeholder="Email" v-model="email" required>
    <input type="password" placeholder="Password" v-model="password" required>
    <div class="error" v-if="error">{{ error }}</div>
    <button v-if="!isPending">Sign up</button>
    <button disabled v-else>Working..</button>
  </form>
</template>

<script>
import useSignup from '@/composables/useSignup'
import { ref } from 'vue'

export default {

  setup() {
    const { error, isPending, signup} = useSignup()
    const displayName = ref('')
    const email = ref('')
    const password = ref('')

    const handleSubmit = async () => {
      const creds = await signup(email.value, password.value, displayName.value)
      if (!error.value) {
          console.log(`User ${email.value} created `)
      }
    }
    return { displayName, email, password, error, isPending, handleSubmit}
  }
}
</script>

<style>

</style>