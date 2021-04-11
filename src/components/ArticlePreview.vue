<template>
  <div class="article-preview">
    <template v-if="article">
      <div class="article-meta">
        <router-link exact :to="{ name: 'profile', params: { username: article.author.username } }">
          <img :src="article.author.image" />
          <!-- alt={article.title} /> -->
        </router-link>
        <div class="info">
          <router-link :to="{ name: 'profile', params: { username: article.author.username } }" class="author">
            {{ article.author.username }}
          </router-link>
          <span class="date">
            {{ new Date(article.createdAt).toDateString() }}
            <!-- {{ article.createdAt | date }} -->
          </span>
        </div>
        <button
          class="btn btn-sm pull-xs-right"
          :class="[favorited ? 'btn-primary' : 'btn-outline-primary']"
          @click="favorite(article.slug)"
        >
          <i class="ion-heart"></i> {{ favoritesCount }}
        </button>
      </div>
      <router-link :to="{ name: 'article', params: { slug: article.slug } }" class="preview-link">
        <h1>{{ article.title }}</h1>
        <p>{{ article.description }}</p>
        <span>Read more...</span>
        <ul class="tag-list">
          <li v-for="tag in article.tagList" class="tag-default tag-pill tag-outline ng-binding ng-scope" :key="tag">
            {{ tag }}
          </li>
        </ul>
      </router-link>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      favorited: false,
      favoritesCount: 0,
      errors: null,
    };
  },
  mounted() {
    this.favorited = this.article.favorited;
    this.favoritesCount = this.article.favoritesCount;
    // console.log('ArticlePreview : mounted() :', this.article);
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  methods: {
    favorite(slug) {
      console.log('ArticlePreview : methods/favorite() :', slug);

      if (!this.isAuthenticated) this.$router.push({ name: 'login' });

      this.$store
        .dispatch('favorite', slug)
        .then((data) => {
          this.favorited = data?.favorited;
          this.favoritesCount = data?.favoritesCount;
        })
        .catch((data) => (this.errors = data));
    },
  },
};
</script>

<style></style>
