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

    /* new */

    async clearTable(context, payload) {
      await idb.clearTable(payload.table)
      if(payload.table === 'cats') {
        console.log('control for state context change')
        return context.state.items = []
      } else if (payload.table === 'orders') {
        return context.state.orders = []
      }      
    },
    async myDeleteItem(dispatch, payload) {
      let id, table
      if(payload.id) {
        id = payload.id
        table = 'cats'
      } else if(payload.uid) {
        id = payload.uid
        table = 'orders'
      }
      console.log('store is being asked to delete ' + id)
      await idb.myDeleteItem(table, id)
    },

    //clearTable

    /* delete */

    async deleteItem(dispatch, payload) {
      console.log('store is being asked to delete ' + payload._id)
      await idb.deleteData(payload._id)
    },
    async deleteOrder(context, order) {
      //console.log('store is being asked to delete ' + order.uid)
      await idb.deleteOrder(order)
    },
    
    

    /* get */

    async getItem(context, cat) {
      let result = await idb.read(cat)
      console.log(result)

    },
    async emptyStoreDetails(context) {
      context.state.details = []
    },
    async getItems(context) {
      context.state.items = []
      let items = await idb.getItems()
      items.forEach(c => {
        context.state.items.push(c)
      })
    },
    async getOrders(context) {
      //console.log('orders action')
      context.state.orders = []
      let orders = await idb.getOrders()      
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
