<template>
  <div >
      <ul class="flex flex-col m-10 justify-center items-center">
        <li  v-for="item in items" ref="itemRefs">          
          <svg class="w-6 mr-2 text-gray-400 hover:text-gray-800 cursor-pointer inline-block"  @click=""  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>

          <input
            type="text"
            class="bg-gray-100 focus:border-b focus:outline-none focus:border-gray-300"
            v-model="item.val"
            @blur="finishEditing(item)"
            @keyup.enter="insertItem(item)"
          /> 

          <label hidden> {{ item.id }}</label>          
        </li>
      </ul>      
  </div>
</template>

<script>

import { ref, onMounted, nextTick } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { insertItemAfterId } from '@/composables/utils'

export default {
  name: 'Home',
  components: {},
  setup() {
  
      const items =  ref ([
        {
          id: uuidv4(),
          val: 'Solve global warming'
        },
        {
          id: uuidv4(),
          val: 'Save Manatees'
        },
        {
          id: uuidv4(),
          val: 'Bring about world peace'
        }
      ])

      const itemRefs = ref([])

      /** Insert a new item after the item passed in */
      const insertItem = async (sItem) => {

        let newUUID = uuidv4()
        items.value = insertItemAfterId(items.value, sItem.id, {id:newUUID, val : ''})

        // Wait for the element to be inserted in UI
        await nextTick()

        //console.log(itemRefs.value)
        let toFocus = null;
        itemRefs.value.forEach( (itemRef) => {
          if (itemRef.children[2].innerText === newUUID) {
            toFocus = itemRef;
          }
        })
        toFocus.children[1].focus()
      }
      
      const finishEditing = (item) => {
        //console.log('finish editing', item) 
      }

      return {
        items, 
        finishEditing, 
        insertItem,
        itemRefs,
      }
  }

}
</script>
