<template v-slot:activator="{ on, attrs }">
  <div>
    <v-container>
        <v-breadcrumbs class="pb-0" :items="breadcrums"></v-breadcrumbs>
        <v-row dense>
            <v-col cols="12" sm="8" class="pl-6 pt-6">
                <small>Daily Orders Report</small>
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
        breadcrums: [
            {
            text: 'Home',
            disabled: false,
            href: '/',
            },
            {
            text: 'Clothing',
            disabled: false,
            href: 'breadcrumbs_clothing',
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
    this.$store.dispatch('getOrders')
  },
  mounted: function() {
     
  },
  computed: {
    
  },  
  methods: {
    
  }
}
</script>