<template>
  <div>
    <v-container>
      <div class="row">        
        <div
          class="col-md-12 col-sm-12 col-xs-12"
        >
          <v-breadcrumbs class="pb-0" :items="breadcrums"></v-breadcrumbs>
          <v-row dense>
            <v-col cols="12" sm="8" class="pl-6 pt-6">
              <small>Showing 1-12 of 12 item products</small>
            </v-col>
            <!--
            <v-col cols="12" sm="4">
              <v-select class="pa-0" v-model="select" :items="options" style="margin-bottom: -20px;" outlined dense></v-select>
            </v-col>
            -->
          </v-row>
          <v-divider></v-divider>
          <div class="row text-center">
            <div class="col-md-3 col-sm-6 col-xs-12" :key="item.id" v-for="item in products">
              <v-card
                class="mx-auto"
                color="grey lighten-4"
                max-width="600"
              >
                <v-img
                  class="white--text align-end"
                  :aspect-ratio="16/9"
                  height="200px"
                  :src="item.src"
                >
                  <v-card-title>{{item.type}} </v-card-title>
                </v-img>
                <v-card-text class="text--primary">
                  <div><a href="/itemduct" style="text-decoration: none">{{item.name}}</a></div>
                  <div style="color: black">${{item.price}}</div>
                  <div style="color: black">ID Prod: {{item.id}}</div>
                </v-card-text>
                <v-card-text class="text--primary">
                  <p>${{item.price}}</p>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn color="primary" @click="$emit('add', item)">Delete</v-btn>
                  <v-btn color="secondary" @click="save(item)">Add to Cart</v-btn>
                  <!--
                  <v-btn color="secondary" @click="my_method('edit', item)">Edit</v-btn>
                  -->
                </v-card-actions>                
              </v-card>              
            </div>
          </div>          
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
//uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

export default {  
  data: function () {
    return {      
      test: null,
      breadcrums: [
        {
          text: 'Home',
          disabled: false,
          href: '/',
        },
        {
          text: 'ShoppingCart',
          disabled: false,
          href: '/cart',
        },
        {
          text: 'Shopping ',
          disabled: true,
          href: 'breadcrumbs_shirts',
        },
      ],      
      products: [
        {
          id:1,
          name:'BLACK TEE',
          type:'Jackets',
          price:'18.00',
          src:require('../assets/imgs/1.jpg')
          
        },
        {
          id:2,
          name:'WHITE TEE',
          type:'Polo',
          price:'40.00',
          src:require('../assets/imgs/2.jpg')
        },
        {
          id:3,
          name:'Zara limited...',
          type:'Denim',
          price:'25.00',
          src:require('../assets/imgs/3.jpg')
        },
        {
          id:4,
          name:'SKULL TEE',
          type:'Jackets',
          price:'30.00',
          src:require('../assets/imgs/4.jpg')
        },
        {
          id:5,
          name:'MANGO WINTER',
          type:'Sweaters',
          price:'50.00',
          src:require('../assets/imgs/5.jpg')
        },
        {
          id:6,
          name:'SHIRT',
          type:'Denim',
          price:'34.00',
          src:require('../assets/imgs/6.jpg')
        },
        {
          id:7,
          name:'TRUCKER JACKET',
          type:'Jackets',
          price:'38.00',
          src:require('../assets/imgs/7.jpg')
        },
        {
          id:8,
          name:'COATS',
          type:'Jackets',
          price:'25.00',
          src:require('../assets/imgs/8.jpg')
        },
        {
          id:9,
          name:'MANGO WINTER',
          type:'Sweaters',
          price:'50.00',
          src:require('../assets/imgs/9.jpg')
          
        },
        {
          id:10,
          name:'SHIRT',
          type:'Denim',
          price:'34.00',
          src:require('../assets/imgs/10.jpg')
          
        },
        {
          id:11,
          name:'TRUCKER JACKET',
          type:'Jackets',
          price:'38.00',
          src:require('../assets/imgs/11.jpg')
          
        },
        {
          id:12,
          name:'COATS',
          type:'Jackets',
          price:'25.00',
          src:require('../assets/imgs/12.jpg')
          
        }
      ],
      temp: false
    }
  },
  computed: {
    cats() {      
      return this.$store.state.items
    },
    /*
    getItems() {
      return this.$store.getters.getItems
    }
    */
  },
  created() {
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
  },
  mounted: function() {
    //this.$store.dispatch('removeAll')    
  },
  methods: {
    save: function(item) {
      this.$root.$emit('save', item)
    }
  }
}
</script>
<style>
  .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .8;
    position: absolute;
    width: 100%;
  }
</style>
