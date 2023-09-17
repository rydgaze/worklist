<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email" required>
    <input type="password" placeholder="Password" v-model="password" required>
    <div class="error" v-if="error">{{ error }}</div>
    <button v-if="!isPending">Log in</button>
    <button disabled v-else>Logging in</button>

  </form>
</template>

<script>
import useLogin from '@/composables/useLogin'
import { ref } from 'vue'
export default {
    setup() {
        const { error, isPending, login } = useLogin()
        const email = ref('')
        const password = ref('')

        const handleSubmit = async () => {
           const res =  await login(email.value, password.value)
           if (!error.value) {
                console.log(`User ${email.value} logged in `)
           }
        }

        return { email, password, isPending, handleSubmit, error}
    }
}
</script>

<style>

</style>