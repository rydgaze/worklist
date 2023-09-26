<template>
  <div class="">
    <ul class="flex flex-col m-10 justify-center items-center">
      <li  v-for="item in items" :key="item.id" ref="itemRefs">          
        <div class="inline-block">
          <svg @click="showPopup(item)" class="w-6 mr-2 text-gray-400 hover:text-gray-800 cursor-pointer inline-block"    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <Popup v-if="showModalWithId==item.id" :id=item.id :items="menuItems"  @selectItem="selectItem" @closeModal="closeModal" />
        </div>

        <input
          type="text"
          class="bg-gray-100 focus:border-b focus:outline-none hover:border-gray-400 focus:border-gray-400"
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
import Popup from '@/components/Popup.vue'

export default {
  components: { Popup },
  setup() {
  
      let showModalWithId = ref('')
      let pos_x=ref('0px')
      const menuItems = ref([
        {
          id: uuidv4(),
          val: 'Complete'
        },
        {
          id: uuidv4(),
          val: 'Share'
        },
        {
          id: uuidv4(),
          val: 'Add note'
        },
        {
          id: uuidv4(),
          val: 'Delete'
        }
      ])

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

      const showPopup = (item) => {
        console.log('show popup')
        console.log(item)
        showModalWithId.value = item.id
      }

      const closeModal = () => {
        console.log('close modal', item)
        showModalWithId.value = ''

      }

      const selectItem = (item) => {
        console.log('select item', item)
        showModalWithId.value = ''
      }

      return {
        items, 
        finishEditing, 
        insertItem,
        itemRefs,
        showPopup,
        showModalWithId,
        menuItems,
        closeModal,
        selectItem,
      }
  }

}
</script>
