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
                    <th class="text-center" colspan="2">Action</th>                
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="i in orders" :key="i.uid">
                    <td class="text-center">{{i.name}}</td>
                    <td class="text-center">{{i.surname}}</td>
                    <td class="text-center">{{i.email}}</td>
                    <td class="text-center">${{i.order_amount}}</td>
                    <td class="text-center">{{i.date}}</td>
                    <td class="text-center">{{i.uid}}</td>
                    <td class="text-center" >
                      <v-dialog
                        v-model="dialog"
                        width="500"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            color="primary"
                            x-small
                            dark
                            v-bind="attrs"
                            v-on="on"
                            @click="getOrder(i)"
                          >Detail</v-btn>
                        </template>
                        <v-card>
                          <v-card-title class="text-h5 primary lighten-2">Order Details</v-card-title>
                          <v-card-text>
                          </v-card-text>
                          <v-divider></v-divider>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="primary"
                              text
                              @click="dialog = false"
                            >Close</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </td>
                    <td>
                      <v-btn
                        color="red"
                        x-small
                        dark
                        @click="deleteOrder(i)"
                      >Delete</v-btn>
                    </td>
                  </tr>              
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
          <v-col :cols="12" md="3" sm="12" style="background-color: lightgray">
            <p class="headline">Daily Order Summary</p>
            <p class="overline">List of Orders summary .</p>
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

export default { 
  name: 'Report', 
  data: function() {    
    return {
      dialog: false,
      breadcrums: [
        {
          text: 'Home',
          disabled: false,
          href: '/',
        },
        {
          text: 'Orders Summary',
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
    async getOrder(order) {
      let test =  this.$store.dispatch('getOrderDetail', order)
      console.log(test)
    },
    async deleteOrder(order){
      if (confirm('With this action you remove all entries for this order, you wish continue?')) {
        this.$store.dispatch('deleteOrder', x)
        this.$store.dispatch('getOrders')
      } else {
        // false
      }
    }
  }
}
</script>