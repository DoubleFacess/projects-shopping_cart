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
                    <span slot="badge">{{ number_items }}</span>
                    <!--
                    <span slot="badge" v-if="myState.length > 0">{{ orders.lenght }}</span>
                    <span slot="badge" v-else>{{ init_orders }}</span>
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
                    <span slot="badge">{{ sum(this.cats, 'qty' )}}</span>
                    <v-icon>mdi-cart</v-icon>
                </v-badge>
            </v-btn>
        </v-app-bar>
    </v-content>
</template>

<script>
import { mapGetters } from 'vuex'
export default{
    name: 'bar',
    data: function() {    
        return {
            notifications: 2,
            init_orders: 0,
            number_items: 0,
            on: ''
        }
    },
    watch: {
        orders: function(){
            console.log(typeof this.myState)
            this._numberObjs(this.orders)
        }
    },
    computed: {
        cats() {      
            return this.$store.state.items
        },
        orders() {
            return this.$store.state.orders
        },
        ...mapGetters({
            myState: 'getOrders'
        })
    },
    mounted: function() {
        console.log(this.sum(this.cats, 'qty'))
        this.$store.subscribeAction((action, state) => {
            if (action.type === 'saveItem') {
                console.log('item changed')
                this.$store.dispatch('getItems')
            }
        })
        this.$store.subscribeAction((action, state) => {
            if (action.type === 'saveOrder') {
                console.log('orders changed')
                this.$store.dispatch('getOrders')
                let parsedobj = JSON.parse(JSON.stringify(this.orders))
                console.log(parsedobj)
                //console.log(this.orders)
            }
        })
    },

    methods: {
        sum: function(_array, key) {
            return _array.reduce((a, b) => a + (b[key] || 0), 0)
        },
        my_sum: function() {
            return this.sum(this.cats, 'qty')
        },
        _numberObjs: function (obj) {
            let x = Object.keys(obj).length
            this.number_items = x
            return this.number_items
        },
    }
}
</script>