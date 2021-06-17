<template>
  <v-app id="inspire">
    <v-content>
      <bar />
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import bar from './components/Bar.vue'
//uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

export default {
  name: 'App',
  components: {
    bar
  },
  data: () => ({
    on: '',
    foo: 0,
  }),
  computed: {
    cats() {      
      return this.$store.state.items
    }
  },
  created () {
    this.$vuetify.theme.dark = true
    this.$root.$on('save', (payload) => {
     this.save(payload)
    })
    this.$store.subscribeAction((action, state) => {
      if (action.type === 'saveItem') {
        this.$store.dispatch('getItems')
        return this.cats
      }   
    })
    this.$store.subscribeAction((action, state) => {
      if (action.type === 'getItems') {
        return this.cats
      }   
    })
    this.$root.$on('update', (payload) => {
      this.$store.dispatch('update', payload)
      this.$store.dispatch('getItems')
    })
  },
  methods: {
    _numberObjs: function (obj) {
      let x = Object.keys(obj).length
      this.number_items = x
      return this.number_items
    },    
    async save(item) {
      console.log('start')
      //this.$store.dispatch('getItems')
      const numberObjs =  this._numberObjs(this.cats)
      switch(numberObjs) {
        case 0:          
          console.log('items array empty')
          let uid = uuidv4()
          this.$root.$emit('uid', uid)
          await this.$store.dispatch('saveItem', {
            'uid': uid, 
            'id': item.id,
            'name': item.name,
            'price': item.price,
            'qty' : 1
          })
          this.$store.dispatch('getItems')
        break
        case 1:
          if(this.cats.some(x => x.id === item.id)) {
            console.log('item is already in the shopping cart')
            let uid = this.$store.state.items[0].uid            
            let _qty = this.cats[0].qty
            _qty = _qty + 1
            let myItem = {
              _id: this.cats[0]._id,
              id: item.id,
              name: item.name,
              price: item.price,
              uid: this.cats[0].uid,
              qty: _qty
            }
            this.$store.dispatch('update', myItem)
            this.$store.dispatch('getItems')
          } else {
            console.log('item is new')
            await this.$store.dispatch('saveItem', {
              id: item.id,
              name: item.name,
              price: item.price,
              uid: this.cats[0].uid,
              qty: 1
            })
            this.$store.dispatch('getItems')
          }
        break
        default:
          console.log('search this items in the cats array')
          if(this.cats.some(x => x.id === item.id)) {
            console.log('item is already in the shopping cart')
            let _uid = this.cats.filter(x => x.id === item.id).map(x => x.uid)
            let id_ = this.cats.filter(x => x.id === item.id).map(x => x._id)
            let _qty = new Number(this.cats.filter(x => x.id === item.id).map(x => x.qty))
            _qty = _qty + 1
            //console.log(_qty)
            let myItem = {
              _id: id_[0],
              id: item.id,
              name: item.name,
              price: item.price,
              uid: _uid[0],
              qty: _qty
            }
            this.$store.dispatch('update', myItem)
            this.$store.dispatch('getItems')
          } else {
            console.log('item is  new item')
            await this.$store.dispatch('saveItem', {
              id: item.id,
              name: item.name,
              price: item.price,
              uid: this.cats[0].uid,
              qty: 1
            })
            this.$store.dispatch('getItems')
          }
        break
      }      
    },
    async delete(item) {
      await this.$store.dispatch('deleteItem', item)
    }
  }  
}
</script>
