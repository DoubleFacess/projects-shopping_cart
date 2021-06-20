import Vue from 'vue'
import Vuex from 'vuex'

import idb from '@/api/idb';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items:[],
    orders: [],
    details: []
  },
  getters: {
    getOrders: state => state.orders
  },
  mutations: {

  },
  actions: {

    /* delete */

    async deleteItem(dispatch, payload) {
      console.log('store is being asked to delete ' + payload._id)
      await idb.deleteData(payload._id)
    },
    async deleteOrder(payload) {
      console.log('store is being asked to delete ' + payload.id_order)
      await idb.deleteOrder(payload.id_order)
    },
    async removeAll(context) {
      await idb.removeAll()
      return context.state.items = []
    },
    async removeOrders(context) {
      await idb.removeOrders()
      return context.state.orders = []
    },

    /* get */

    async getItem(context, cat) {
      let result = await idb.read(cat)
      console.log(result)

    },
    async getItems(context) {
      context.state.items = []
      let items = await idb.getItems()
      items.forEach(c => {
        context.state.items.push(c)
      })
    },
    async getOrders(context) {
      console.log('orders action')
      context.state.orders = []
      let orders = await idb.getOrders()
      //console.log(items)
      /*
      orders.forEach(c => {
        context.state.orders.push(c)
      })
      */
      context.state.orders = orders
    },
    async getOrderDetail(context, order) {
      //console.log(order)
      let details = await idb.getOrderDetail(order)
      details.forEach(c => {
        context.state.details.push(c)
        console.log('try is ok')
      })
    },

    /* add */

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
