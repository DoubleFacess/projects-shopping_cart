<template>
  <v-container>
    <Shop />
  </v-container>
</template>

<script>
import Shop from '@/components/Shop';

export default {
  components: {
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
