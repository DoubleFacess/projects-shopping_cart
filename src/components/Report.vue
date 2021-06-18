<template v-slot:activator="{ on, attrs }">
  <div>
    <v-container>
        <v-breadcrumbs class="pb-0" :items="breadcrums"></v-breadcrumbs>
        <v-row dense>
            <v-col cols="12" sm="8" class="pl-6 pt-6">
                <small>Daily Orders Report</small>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
            <v-col :cols="12" md="9" sm="12" >
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-center">Cust. Name</th>
                      <th class="text-center">Cust. Surname</th>
                      <th class="text-center">Cust. Email</th>
                      <th class="text-center">Order Amount</th>
                      <th class="text-center">Order Date</th>
                      <th class="text-center">Order ID</th>
                      <th class="text-center">Action</th>                
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="i in orders" :key="i.uid">
                      <td class="text-center">{{i.name}}</td>
                      <td class="text-center">{{i.surname}}</td>
                      <td class="text-center">{{i.email}}</td>
                      <td class="text-center">{{i.order_amount}}</td>
                      <td class="text-center">{{i.date}}</td>
                      <td class="text-center">{{i.uid}}</td>
                      <td class="text-center" ><a @click="getOrder(i.uid)">X</a></td>
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
                            <td class="text-right" style="width: 50px;" id="sub-total"></td>
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
                            <td class="text-right" style="width: 50px;" id="sub-total"></td>
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

import idb from '@/api/idb'

export default { 
  name: 'Report', 
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
  computed: {
    orders() {
      return this.$store.state.orders
    }
  },
  mounted: function() {
    this.$store.dispatch('getOrders')
  },
  methods: {
    async getOrder(id_order) {
      let payload = {}
      payload.id_order = id_order
      await this.$store.dispatch('getOrderDetail', payload.id_order)
      //await idb.getOrderDetail(id_order)
    }
  }
}
</script>