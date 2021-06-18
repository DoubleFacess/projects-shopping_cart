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