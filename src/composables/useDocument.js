import { db } from "@/firebase/config"
import { ref } from "vue"

const useDocument = (collection, id) => {
    let error = ref(null)
    let isPending = ref(false)
    let docRef = db.collection(collection).doc(id)

    const deleteDoc = async () => {

    }

    const updateDoc = async (updates) => {

    }

    return { error, isPending, deleteDoc, updateDoc }
}

export default useDocument