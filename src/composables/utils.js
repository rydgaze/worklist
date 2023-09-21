const insertItemAfterId = (array, id, itemToInsert) => {
    let newArray = []
    array.forEach((item)=> {
        newArray.push(item)
        // Insert new item after this
        if (item.id === id) {
            newArray.push( itemToInsert)
        }
    })
    return newArray;
}


export { insertItemAfterId }