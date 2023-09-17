import { db } from "@/firebase/config"
import { ref, watchEffect } from "vue"

const watchCollection = (collection, query) => {
    const documents = ref(null)
    const error = ref(null)

    // Get reference to the collection
    let collectionRef = db.collection(collection)
        .orderBy('createdAt')
    
    // If query params are passed in, use those as well    
    if (query) {
        collectionRef = collectionRef.where(...query)
    }

    // Connect with Websocket to the collection. This is a continuous watch on the collection for changes!
    // Returns a unsub to disconnect from websocket
    const unsub = collectionRef.onSnapShot( snap => {
        let results = []
        // This snapshot fire for ANY change to collection. Including local ones
        // For local ones, there will be no createdAt (this is a server object on commit)
        // So check for a valid CreatedAt so we react only to server side changes
        snap.docs.forEach(doc => {
            // Create a new oject and add the id of the document as a part of it - flattening        
            doc.data().createdAt && results.push({...doc.data(), id: doc.id})
        })

        // Only when we have all the data, we update the ref
        documents.value = results
        error.value = null        
    }, err => {
        console.log(err.message)
        document.value = null
        error.value = err.message
    })

    // When the component that loaded this is unmounted, we should stop watching, else we will leak!
    watchEffect((onInvalidate) => {
        onInvalidate(()=>unsub())
    })

    return { error, documents }
}

export default watchCollection
