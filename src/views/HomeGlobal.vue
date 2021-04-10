<template>
  <div>
    <template v-for="article in articles">
      <ArticlePreview :key="article.id" :article="article" />
    </template>
  </div>
</template>

<script>
import ArticlePreview from '../components/ArticlePreview';

export default {
  name: 'home',
  components: {
    ArticlePreview,
  },
  data() {
    return {
      articles: null,
      errors: null,
    };
  },
  mounted() {
    console.log('HomeGlobal : mounted : ');
    this.$store
      .dispatch('getGlobalArticles')
      .then((data) => (this.articles = data))
      .catch((error) => (this.errors = error));
  },
  computed: {},
};
</script>

<style></style>
