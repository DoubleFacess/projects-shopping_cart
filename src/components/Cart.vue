<template v-slot:activator="{ on, attrs }">
  <div>
    <v-container>
      <v-breadcrumbs class="pb-0" :items="breadcrums"></v-breadcrumbs>
          <v-row dense>
            <v-col cols="12" sm="8" class="pl-6 pt-6">
              <small>Shopping cart items list</small>
            </v-col>
            <!--
            <v-col cols="12" sm="4">
              <v-select class="pa-0" v-model="select" :items="options" style="margin-bottom: -20px;" outlined dense></v-select>
            </v-col>
            -->
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col :cols="12" md="9" sm="12" >
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-center">ITEM</th>
                      <th class="text-center">PRICE</th>
                      <th >QUANTITY</th>
                      <th class="text-center">TOTAL</th>
                      <th class="text-center">ID</th>
                      <th class="text-center">ACTION</th>                
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="i in my_obj" :key="my_obj[i]">
                      <td class="text-center">
                        <v-list-item
                        key="1"
                        @click="void(0)"
                      >
                        <v-list-item-avatar>
                          <v-img :src="require('../assets/imgs/1.jpg')"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title >{{i[0].name}}</v-list-item-title>
                          <v-list-item-subtitle>{{i[0].type}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item></td>
                      <td class="text-center">${{i[0].price}}</td>
                      <td class="text-center">
                        <v-text-field
                          id="yes"
                          class="pt-10"
                          label="Outlined"
                          style="width: 70px;"
                          single-line
                          outlined
                          :value="i[0].qty"
                          type="number"
                          v-on:click="greet(i[0])"
                        ></v-text-field>
                      </td>
                      <!--<td class="text-center">${{ _numberObjs(i) *  i[0].price }}</td>-->
                      <td class="text-center">$<span class="subtotal">{{ i[0].qty *  i[0].price }}</span></td>
                      <td class="text-center" >
                        <v-text-field 
                          :v-model="orderID"
                          :value="i[0].uid"
                          type="text"
                        ></v-text-field>
                      </td>
                      <td class="text-center" ><a @click="deleteItem(i[0])">X</a></td>
                      </tr>              
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
            <v-col :cols="12" md="3" sm="12" style="background-color: lightgray">
              <p class="headline">Order Summary</p>
              <p class="overline">Shipping and additional costs are calculated based on values you have entered.
              </p>
              <v-simple-table>
                <template v-slot:default>
                  <tbody>
                <tr>
                  <td>Order Subtotal</td>
                  <td class="text-right" style="width: 50px;" id="sub-total">${{ _totalAmount(cats, 'price')}}</td>
                </tr>
                <tr>
                  <td>Shipping Charges</td>
                  <td class="text-right" style="width: 50px;">$10.00</td>
                </tr>
                <tr>
                  <td>Tax</td>
                  <td class="text-right" style="width: 50px;">$5.00</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td class="text-right" style="width: 50px;" id="sub-total">${{ 15 + _totalAmount(cats, 'price')}}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <div class="text-center">
            <v-divider></v-divider>
            <v-dialog
              transition="dialog-bottom-transition"
              fullscreen
              hide-overlay
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                >Proceed</v-btn>
              </template>
              <template v-slot:default="dialog">
                <v-card>
                  <v-toolbar
                    color="primary"
                    dark
                  >Shipping Order Form</v-toolbar>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          label="Legal first name*"
                          required
                          v-model="name"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          label="Legal last name*"
                          v-model="surname"
                          hint="example of persistent helper text"
                          persistent-hint
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          label="Email*"
                          v-model="email"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        offset="5"
                        primary
                      >
                        <p>Your Order</p>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col :cols="12" md="9" sm="12" >
                        <v-simple-table>
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th class="text-center">ITEM</th>
                                <th class="text-center">PRICE</th>
                                <th class="text-center">QUANTITY</th>
                                <th class="text-center">TOTAL</th>              
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="i in my_obj" :key="my_obj[i]">
                                <td class="text-center">
                                  <v-list-item
                                  key="1"
                                  @click="void(0)"
                                >
                                  <v-list-item-content>
                                    <v-list-item-title >{{i[0].name}}</v-list-item-title>
                                    <v-list-item-subtitle>{{i[0].type}}</v-list-item-subtitle>
                                  </v-list-item-content>
                                </v-list-item></td>
                                <td class="text-center">${{i[0].price}}</td>
                                <td class="text-center">${{i[0].qty}}</td>
                                </td>
                                <!--<td class="text-center">${{ _numberObjs(i) *  i[0].price }}</td>-->
                                <td class="text-center">$<span class="subtotal">{{ i[0].qty *  i[0].price }}</span></td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-col>
                    </v-row>
                    <br>
                    <v-divider></v-divider>
                    <br><br>
                    <v-row>
                      <v-col :cols="2" md="2" sm="12" offset="8" class="primary">Order ID: </v-col>
                    </v-row>
                    <v-row>
                      <v-col :cols="2" md="2" sm="12" offset="8">Subtotal: ${{ _totalAmount(cats, 'price')}}</v-col>
                    </v-row>
                    <v-row>
                      <v-col :cols="2" md="2" sm="12" offset="8">Shipping Charges: $10.00</v-col>
                    </v-row>
                    <v-row>
                      <v-col :cols="2" md="2" sm="2" offset="8">Tax: $5.00</v-col>
                    </v-row>
                    <v-row>
                      <v-col :cols="2" md="2" sm="2" offset="8" class="primary">Total Order: ${{ 15 + _totalAmount(cats, 'price')}}</v-col>
                    </v-row>
                    <v-row>
                      <v-col offset="4">
                        <v-dialog
                          v-model="dialog2"
                          width="500"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              color="red lighten-2"
                              dark
                              v-bind="attrs"
                              v-on="on"
                              @click="process()"
                            >
                              Send Order
                            </v-btn>
                          </template>

                          <v-card>
                            <v-card-title class="text-h5 primary lighten-2">
                              Order Confirmation
                            </v-card-title>

                            <v-card-text><br>
                              Thanks <b>{{name}} {{surname}}</b>, a receipt of your order {{ orderID }} will be sent to your email <b>{{ email }}</b>
                            </v-card-text>

                            <v-divider></v-divider>

                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="primary"
                                text
                                @click="retHome"
                              >
                                Close
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </template>
            </v-dialog>
          </div>
           <div class="text-center">
            <v-btn class="red white--text mt-5" outlined @click="deleteAll()">DELETE </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>    
  </div>
</template>
<script>
import Cat from '@/components/Cat';
export default {  
  data: function() {    
    return {
      dialog: false,
      dialog2: false,
      name: '',
      orderID: [],
      surname: '',
      email: '',
      my_obj : null,
      number_items: null,
      breadcrums: [
        {
          text: 'Home',
          disabled: false,
          href: '/',
        },
        {
          text: 'Shopping',
          disabled: false,
          href: '/shop',
        },
        {
          text: 'Orders (need login)',
          disabled: false,
          href: '/report',
        },
        {
          text: 'T-Shirts',
          disabled: true,
          href: 'breadcrumbs_shirts',
        },
      ],
    }
  },
  created() {
    console.log('start')
    this.$store.dispatch('getItems')
  },
  mounted: function() {
    this.$root.$on('uid', (uid)=>{
      this.orderID = uid
    }) 
    this.$store.subscribeAction((action, state) => {
      if (action.type === 'deleteItem' || action.type === 'removeAll') {
        setTimeout(() => {
          this.$router.push('/')
        }, 2000)
      }   
    })
  },
  computed: {
    cats() {
      let my_obj = this.$store.state.items
      //console.log(my_obj.lenght)
      this._function(my_obj)
      return my_obj = this.my_obj
    },
    totalAmount(array, column) {
      this._totalAmount(array, column)
    }
  },  
  methods: {
    async process() {
      let start_obj = this.my_obj
      for(let i in start_obj) {
        //let item_price = my_obj[i].price * my_obj[i].qty
        //'item_price': item_price
        let obj = {
          'id_order': this.my_obj[i][0].uid,
          'id_prod': this.my_obj[i][0].id,
          'qty': this.my_obj[i][0].qty,
          'unit_price': this.my_obj[i][0].price,
        }
        this.$root.$emit('uid', this.my_obj[i][0].uid)
        await this.$store.dispatch('saveOrderDetails', obj)
      }
    },
    retHome: function() {
      let my_date = new Date().toDateString()
      let amount = this._totalAmount(this.cats, 'price') / 2
      this.$store.dispatch('saveOrder', {
        'uid': this.orderID,
        'name': this.name,
        'surname': this.surname,
        'email': this.email,
        'date': my_date,
        'order_amount': amount
      })
      this.$store.dispatch('removeAll')
      this.$router.push('/')
    },
    greet: function (x) {
      console.log(event)
      console.log(event.target)
      if (event) {
        //alert(event.target.value)
        if(event.target.value == 0) {
          if (confirm('With this action you delete the item, you wish continue?')) {
            this.$store.dispatch('deleteItem', x)
            this.$store.dispatch('getItems')
          } else {
            // false
          }
        }
        x.qty = new Number(event.target.value)
        this.$root.$emit('update', x)
      }
    },
    deleteItem: function(i) {
      if (confirm('With this action you delete the item/items in the store, you wish continue?')) {
        this.$store.dispatch('deleteItem', i)
        this.$store.dispatch('getItems')
      } else {
        // false
      }
    },
    deleteAll: function() {
      if (confirm('With this action you delete all items in the store, you wish continue?')) {
        this.$store.dispatch('removeAll')
        this.$route.push('/')
      } else {
            // false
      }
    },
    _function: function(obj) {
      let test = obj.reduce(function (r, a) {
        r[a.id] = r[a.id] || []
        r[a.id].push(a)
        console.log('im alive')
        //this.greet()
        return r
      }, this.my_obj = Object.create(null))
      
    },   
    _numberObjs: function (obj) {
      let x = Object.keys(obj).length
      this.number_items = x
      return this.number_items
    },
    _totalAmount: function() {
      let test = document.getElementsByClassName('subtotal')
      let sum = 0
      var arrayLength = test.length
      for (var i = 0; i < test.length; i++) {
        sum +=  new Number(test[i].innerHTML)
      }
      //console.log(sum)
      return sum
    }
  }
}
</script>