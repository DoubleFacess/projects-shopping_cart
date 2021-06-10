<template>
  <v-container>
    <Shop />
    <v-row>
      <v-col :cat="cat" cols="4" v-for="(cat,idx) in cats" :key="idx">
        <Cat :cat="cat" @delete="deleteItem" @edit="editCat" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn @click="addCat">Add Cat</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Cat from '@/components/Cat';
import Shop from '@/components/Shop';

export default {
  components: {
    Cat,
    Shop
  },
  computed: {
    cats() {
      return this.$store.state.items;
    }
  },
  created() {
    this.$store.dispatch('getItems');
  },
  methods: {
    addCat() {
      this.$router.push({ name: 'edit' });
    },
    async deleteItem(cat) {
      console.log('delete', cat.id);
      await this.$store.dispatch('deleteItem', cat);
      this.$store.dispatch('getItems');
    },
    editCat(cat) {
      console.log('edit', cat.id);
      this.$router.push({ name: 'edit', params: {cat: cat} });
    }
  }
};
</script>
