import { ref } from "vue"

const useCollection = (collection) => {
    const error = ref(null)
    const isPending = ref(false)

    // Add a doc to the collection
    const addDoc = async (doc) => {
        error.value = null
        isPending.value = true

        try {
            const res = await db.collection(collection).add(doc)
            isPending.value = false
            return res    
        } catch (err) {
            console.log(__filename, ' Failed adding doc: ', err.message)
            error.value = err.message
            isPending.value = false
        }
    }

    // Have to return these so it can be used in vue
    return { error, addDoc, isPending}
}

export default useCollection