import Vue from 'vue'
import Vuex from 'vuex'

import idb from '@/api/idb';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items:[]
  },
  getters: {
    Items: state => state.items,
  },
  mutations: {

  },
  actions: {
    async deleteItem(context, item) {
      console.log('store is being asked to delete '+ item.id);
      await idb.deleteItem(item); 
    },
    async getItems(context) {
      context.state.items = [];
      let items = await idb.getItems()
      items.forEach(c => {
        context.state.items.push(c)
      })
    },
    async saveItem(context, cat) {
      await idb.saveItem(cat);
    }
  }
})
