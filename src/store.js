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
      if(payload._id) {
        id = payload._id
        table = 'cats'
      } else if(payload.uid) {
        id = payload.uid
        table = 'orders'
      }
      console.log('store is being asked to delete ' + id)
      await idb.myDeleteItem(table, id)
    },


    /* get */
    
    async emptyStoreDetails(context) {
      context.state.details = []
    },
    async getItems(context) {
      context.state.items = []
      let items = await idb.myGetItems('cats')
      items.forEach(c => {
        context.state.items.push(c)
      })
    },
    async getOrders(context) {
      //console.log('orders action')
      context.state.orders = []
      let orders = await idb.myGetItems('orders')      
      context.state.orders = orders
    },
    async getOrderDetail(context, order) {
      //console.log(order)
      let details = await idb.getOrderDetail(order)
      details.forEach(c => {
        context.state.details.push(c)
      })
    },

    /* add */

    async saveItem(context, cat) {
      await idb.mySaveItem('cats', cat)
    }, 
    async saveOrderDetails(context, order) {
      //console.log('new action')
      await idb.mySaveItem('orders_details', order)
    },
    async saveOrder(context, order) {
      await idb.mySaveItem('orders', order)
    }, 
    
    async update(context, payload) {
      await idb.update(payload)
      context.state.items = []
      //this.$store.dispatch('getItems')
    }
  }
})
