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
    getItems: state => state.items
  },
  mutations: {

  },
  actions: {
    async deleteItem(dispatch, payload) {
      console.log('store is being asked to delete ' + payload._id)
      await idb.deleteData(payload._id)
    },
    async removeAll(context) {
      await idb.removeAll()
      return context.state.items = []
    },
    async getItem(context, cat) {
      let result = await idb.read(cat)
      console.log(result)

    },
    async getItemsByUid(uid) {
      await idb.getItemsByUid(uid)
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
    async saveOrderDetails(context, order) {
      console.log('new action')
      await idb.saveOrderDetails(order);
    },
    async saveOrder(context, order) {
      await idb.saveOrder(order);
    }, 
    
    async update(context, payload) {
      await idb.update(payload)
      context.state.items = []
      //this.$store.dispatch('getItems')
    }
  }
})
