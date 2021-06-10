import Vue from 'vue'
import Vuex from 'vuex'

import idb from '@/api/idb';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cats:[]
  },
  mutations: {

  },
  actions: {
    async deleteItem(context, cat) {
      console.log('store is being asked to delete '+ cat.id);
      await idb.deleteItem(cat); 
    },
    async getItems(context) {
      context.state.cats = [];
      let cats = await idb.getItems();
      cats.forEach(c => {
        context.state.cats.push(c);
      });
    },
    async saveItem(context, cat) {
      await idb.saveItem(cat);
    }
  }
})
