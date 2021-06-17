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
            <v-btn  v-on="on" icon>
                <v-badge
                    :content="notifications"
                    :value="notifications"
                    color="red"
                    overlap
                >
                    <span slot="badge">{{ notifications }}</span>
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
export default{
    name: 'bar',
    data: function() {    
        return {
            notifications: 2,
            new_items: 0,
            on: ''
        }
    },
    computed: {
        cats() {      
            return this.$store.state.items
        }
    },
    created: function() {
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
        my_sum: function() {
            return this.sum(this.cats, 'qty' )
        }
    }
}
</script>