import { auth } from "@/firebase/config"
import { ref } from "vue"
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth"

const error = ref(null)
const isPending = ref(false)
const signup = async (email, password, displayName) => {
    error.value = null
    isPending.value = true

    try {
        const creds = await createUserWithEmailAndPassword(auth, email, password)
        if (!creds) {
            throw new Error('Unable to signup')
        }
        await updateProfile(creds.user, { displayName })
        isPending.value = false
        error.value = null

        console.log(creds.user)
        return creds
    } catch (err) {
        console.log(err.message)
        isPending.value = false
        error.value = err.message
    }
}


const useSignup = () => {
    return { error, isPending, signup}
}

export default useSignup