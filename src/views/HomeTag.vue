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
  name: 'tag',
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
    console.log('HomeTag : mounted :', this.$route.params.tag);
    this.getProfile(this.$route.params.tag);
  },
  watch: {
    $route(to) {
      console.log('HomeTag : watch/$route(to) : ', to.params);
      this.getProfile(to.params.tag);
    },
  },
  computed: {},
  methods: {
    getProfile(tag) {
      this.$store
        .dispatch('getTagArticles', tag)
        .then((data) => (this.articles = data))
        .catch((data) => (this.errors = data));
    },
  },
};
</script>

<style></style>
