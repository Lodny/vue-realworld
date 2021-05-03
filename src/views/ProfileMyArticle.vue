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
    console.log('ProfileMyArticle : mounted() : ', this.$route.params);
    this.getMyArticles();
  },
  watch: {
    $route(to) {
      console.log('ProfileMyArticle : watch/$route(to) : ', to.params);
      this.getMyArticles();
    },
  },
  methods: {
    getMyArticles() {
      this.$store
        .dispatch('getMyArticles', this.$route.params.username)
        .then((data) => (this.articles = data))
        .catch((data) => (this.errors = data));
    },
  },
};
</script>

<style></style>
