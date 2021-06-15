import Vue from 'vue'
import Vuex from 'vuex'

import idb from '@/api/idb';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items:[],
    temp: []
  },
  getters: {
    getItems: state => state.items,
  },
  mutations: {

  },
  actions: {
    async deleteItem(dispatch, payload) {
      console.log('store is being asked to delete '+ payload.id)
      await idb.deleteData(payload.id)
    },
    async getItem(context, cat) {
      let result = await idb.read(cat)
      console.log(result)

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
    },    
    async removeAll(context) {
      await idb.removeAll()
      return context.state.items = []
    },
    async update(context, payload) {
      await idb.update(payload)
      context.state.items = []
      //this.$store.dispatch('getItems')
    }
  }
})
