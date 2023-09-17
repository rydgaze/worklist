import { db } from "@/firebase/config"
import { ref, watchEffect } from "vue"

const user = ref(auth.currentUser)

// Watch for auth change
auth.onAuthStateChanged(_user => {
    console.log("User state changed. Current User is: ", _user)
    user.value = _user;
})

const getCurrentUser = () => {
    return { user }
}

export default getCurrentUser
