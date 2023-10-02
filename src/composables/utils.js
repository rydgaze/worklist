import { useGlobalStore } from "@/stores/GlobalStore";


const insertItemAfterId = (id, itemToInsert) => {
    const globalStore = useGlobalStore();
    let newArray = []
    globalStore.workItems.forEach((item)=> {
        newArray.push(item)
        // Insert new item after this
        if (item.id === id) {
            newArray.push( itemToInsert)
        }
    })
    return newArray
}


export { insertItemAfterId }