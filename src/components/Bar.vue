<template>
    <v-content>
        <v-app-bar
        app
        color="primary"
        dark
        >
            <v-toolbar-title class="headline text-uppercase">
                <span>SHOPPING</span>
                <span class="font-weight-light">DB</span>
            </v-toolbar-title>      
            <v-spacer />
            <v-btn icon>
                <v-icon>mdi-account-circle</v-icon></router-link>
            </v-btn>
            <v-btn  
                v-on="on" 
                icon
                href="/report"
            >
                <v-badge
                    :content="notifications"
                    :value="notifications"
                    color="red"
                    overlap
                >
                    <span slot="badge">{{ my_orders }}</span>
                    <!--
                    <span slot="badge" v-if="myState.length > 0">{{ orders.lenght }}</span>
                    <span slot="badge" v-else>{{ nr_orders }}</span>
                    -->
                    <v-icon>mdi-bell</v-icon>
                </v-badge>
            </v-btn>
            <v-btn  
                v-on="on" 
                icon
                href="/cart"
            >
                <v-badge
                    :content="notifications"
                    :value="notifications"
                    color="red"
                    overlap
                >
                    <span slot="badge">{{ my_sum('qty')}}</span>
                    <v-icon>mdi-cart</v-icon>
                </v-badge>
            </v-btn>
        </v-app-bar>
    </v-content>
</template>

<script>
import { mapGetters } from 'vuex'

import funcs from '../assets/js/functions.js'
export default{
    name: 'bar',
    data: function() {    
        return {
            notifications: 2,
            number_items: 0,
            on: ''
        }
    },
    props: ['my_orders'],
    computed: {
        cats() {      
            return this.$store.state.items
        },
        orders() {
            return this.$store.state.orders
        },
        get_orders() {
            return funcs._numberObjs(this.orders)
        }
    },
    mounted: function() {
        console.log(this.sum(this.cats, 'qty'))
        this.$store.subscribeAction((action, state) => {
            if (action.type === 'saveItem') {
                console.log('item changed')
                this.$store.dispatch('getItems')
            }
        })
    },
    methods: {
        sum: function(_array, key) {
            return _array.reduce((a, b) => a + (b[key] || 0), 0)
        },
        my_sum: function(field) {
            return this.sum(this.cats, field)
        }
    }
}
</script>