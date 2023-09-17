import { auth } from "@/firebase/config"
import { ref } from "vue"
import { signInWithEmailAndPassword } from "firebase/auth"

const error = ref(null)
const isPending = ref(false)

const login = async (email, password) => {
    error.value = null
    isPending.value = true
    try {
        const res = await signInWithEmailAndPassword(auth, email, password)
        if (!res) {
            throw new Error ("Failed to login!")
        }
        console.log("User logged in ", res.user)
        isPending.value = false
        error.value = null
    } catch (err) {
        console.log(err)
        isPending.value = false
        error.value = err.message
    }
}

const useLogin = () => {
    return { error, isPending, login}
}

export default useLogin