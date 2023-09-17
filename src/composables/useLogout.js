import { auth } from "@/firebase/config"
import { ref } from "vue"
import { signOut } from "firebase/auth"

const error = ref(null)
const isPending = ref(false)

const logout = async (email, password) => {
    error.value = null
    isPending.value = true
    try {
         await signOut(auth)        
        console.log("User logged out")
        isPending.value = false
        error.value = null
    } catch (err) {
        console.log(err)
        isPending.value = false
        error.value = err.message
    }
}

const useLogout = () => {
    return { error, isPending, logout}
}

export default useLogout