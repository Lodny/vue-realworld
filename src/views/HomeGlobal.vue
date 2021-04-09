<template>
  <h1>Global Articles</h1>
</template>

<script>
export default {
  name: 'home',
  created() {
    console.log('HomeGlobal : created : ');
    this.$store.dispatch('getGlobal');
  },
  computed: {
    global() {
      console.log('HomeGlobal : computed/global : ', this.$store.articles.length);
      return this.$store.articles;
    },
  },
};
</script>

<style></style>
