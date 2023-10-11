import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/firebase/config";

import { collection, query, where, getDocs, doc } from "firebase/firestore";
import getCurrentUser from "@/composables/getCurrentUser";

export const useGlobalStore = defineStore("globalStore", {
  state: () => ({
    isLoading: false,
    showModalWithId: "",
    contexMenu: [
      {
        id: uuidv4(),
        icon: "M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12",
        val: "Complete",
      },
      {
        id: uuidv4(),
        icon: "M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z",
        val: "Share",
      },
      {
        id: uuidv4(),
        icon: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10",
        val: "Add note",
      },
      {
        id: uuidv4(),
        icon: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0",
        val: "Delete",
      },
    ],
    workItems: [      
      {
        id: uuidv4(),
        parent_id: null,
        val: "Task List ...",
        attr: {
          complete: false,
          bold: false,
          italic: false,
        },
        level: 0,
      },
    ],
  }),
  getters: {},
  actions: {
    async getItems() {
       await this.getItemsAsync()
    },

    async getItemsAsync() {
      const user = getCurrentUser();
      if (!user) {
        return [];
      }
      this.isLoading = true;
      console.log("User id ", user.value.uid);

      const q = query(
        collection(db, "workitems"),
        where("uid", "==", user.value.uid)
      );
      console.log("query", q);
      const querySnapshot =  await getDocs(q);
      console.log("query await over");
      if (querySnapshot.length > 0) {
        this.workItems = []
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          this.workItems.push([...doc.data(), doc.id]);
        });
  
      }

      console.log('get items', this.workItems);
      this.isLoading = false;      
    },

    getItem(id) {
      return this.workItems.find((item) => {
        return item.id === id;
      });
    },

    getParent(id) {
      let item = this.getItem(id);
      if (item) {
        return this.getItem(item.parent_id);
      }
      return null;
    },

    getDirectChildren(id) {
      return this.workItems.filter((item) => {
        return item.parent_id === id;
      });
    },

    replaceWorkItems(items) {
      this.workItems = items;
    },

    insertItemAfterId(id, itemToInsert) {
      let newArray = [];
      this.workItems.forEach((item) => {
        newArray.push(item);
        // Insert new item after this
        if (item.id === id) {
          console.log("inserting.. ")
          newArray.push(itemToInsert);
        }
      });
      this.workItems = newArray;
    },

    updateItem(item) {
      let current = this.getItem(item.id);
      if (current) {
        current = item;
      }
    },

    deleteItem(item) {
      this.workItems = this.workItems.filter((sItem) => {
        return item.id !== sItem.id && item.id !== sItem.parent_id;
      });
    },

    addChild(parent, child) {
      let item = this.getItem(child.id);
      if (item) {
        item.parent_id = parent.id;
      }
    },

    isTopElement(id) {
      return this.workItems[0].id === id;
    },

    getElementAbove(id) {

      for (let i = 0; i < this.workItems.length; i++) {
        let item = this.workItems[i];
        console.log('getting above element ', item.id, id)

        if (item.id === id) {
          if (i === 0) {
            return null;
          } else {
            // TODO: Use level field to make sure we return same level element above
            return this.workItems[i - 1];
          }
        }
      }
      return null;
    },
  },
});
