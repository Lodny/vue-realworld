<template>
  <div v-if="article" class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <div class="article-meta">
          <router-link :to="{ name: 'profile', params: { username: article.author.username } }">
            <img :src="article.author.image" />
          </router-link>
          <div class="info">
            <router-link :to="{ name: 'profile', params: { username: article.author.username } }" class="author">
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ new Date(article.createdAt).toDateString() }}</span>
          </div>

          <span v-if="isAuthenticated && currentUser.username === article.author.username" class="ng-scope">
            <router-link
              :to="{ name: 'article-edit', params: { slug: article.slug } }"
              class="btn btn-outline-secondary btn-sm"
            >
              <i class="ion-edit">Edit Article</i>
            </router-link>
            {{ ' ' }}
            <button class="btn btn-outline-danger btn-sm" @click="deleteArticle(article.slug)">
              <i class="ion-trash-a"> Delete Article </i>
            </button>
          </span>
          <span v-else class="ng-scope ng-hide">
            <button
              class="btn btn-sm"
              :class="[article.author.following ? 'btn-secondary' : 'btn-outline-secondary']"
              @click="follow(article.author.username)"
            >
              <i :class="followString">
                {{ ` ${article.author.following ? 'Unf' : 'F'}ollow ${article.author.username}` }}
              </i>
            </button>
            {{ ' ' }}
            <button
              class="btn btn-sm"
              :class="[article.favorited ? 'btn-primary' : 'btn-outline-primary']"
              @click="favorite(article.slug)"
            >
              <i class="ion-heart">{{ ` ${article.favorited ? 'Unf' : 'F'}avorite Article` }}</i>
              <span class="counter">({{ article.favoritesCount }})</span>
            </button>
          </span>
        </div>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <!-- <ReactMarkdown>{article.body}</ReactMarkdown> -->
          {{ article.body }}
        </div>
      </div>
      <ul class="tag-list">
        <li v-for="tag in article.tagList" class="tag-default tag-pill tag-outline ng-binding ng-scope" :key="tag">
          {{ tag }}
        </li>
      </ul>

      <hr />

      <div class="article-actions">
        <div class="article-meta">
          <router-link :to="{ name: 'profile', params: { username: article.author.username } }">
            <img :src="article.author.image" />
          </router-link>

          <div class="info">
            <router-link :to="{ name: 'profile', params: { username: article.author.username } }" class="author">
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ new Date(article.createdAt).toDateString() }}</span>
          </div>

          <span v-if="isAuthenticated && currentUser.username === article.author.username" class="ng-scope">
            <router-link
              :to="{ name: 'article-edit', params: { slug: article.slug } }"
              class="btn btn-outline-secondary btn-sm"
            >
              <i class="ion-edit">Edit Article</i>
            </router-link>
            {{ ' ' }}
            <button class="btn btn-outline-danger btn-sm" @click="deleteArticle(article.slug)">
              <i class="ion-trash-a"> Delete Article </i>
            </button>
          </span>

          <span v-else class="ng-scope ng-hide">
            <button
              class="btn btn-sm"
              :class="[article.author.following ? 'btn-secondary' : 'btn-outline-secondary']"
              @click="follow(article.author.username)"
            >
              <i :class="followString">
                {{ ` ${article.author.following ? 'Unf' : 'F'}ollow ${article.author.username}` }}
              </i>
            </button>
            {{ ' ' }}
            <button
              class="btn btn-sm"
              :class="[article.favorited ? 'btn-primary' : 'btn-outline-primary']"
              @click="favorite(article.slug)"
            >
              <i class="ion-heart">{{ ` ${article.favorited ? 'Unf' : 'F'}avorite Article` }}</i>
              <span class="counter">({{ article.favoritesCount }})</span>
            </button>
          </span>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <p v-if="!isAuthenticated">
            <router-link :to="{ name: 'login' }">Sign in</router-link> or
            <router-link :to="{ name: 'register' }">Sign up</router-link> to add comments on this article.
          </p>
          <Comment :slug="article.slug" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Comment from '../components/Comment';

export default {
  components: {
    Comment,
  },
  data() {
    return {
      article: null,
      errors: null,
    };
  },
  mounted() {
    console.log('Article : mounted() :', this.$route.params);

    this.$store
      .dispatch('getArticle', this.$route.params.slug)
      .then((data) => (this.article = data))
      .catch((data) => (this.errors = data));
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'currentUser']),
    followString() {
      return `ion-${this.article.author.following ? 'minus' : 'plus'}-round`;
    },
  },
  methods: {
    follow(username) {
      console.log('Article : methods/follow() :', username);
      if (!this.isAuthenticated) this.$router.push({ name: 'login' });

      this.$store
        .dispatch('follow', username)
        .then((data) => (this.article.author = data))
        .catch((data) => (this.errors = data));
    },
    favorite(slug) {
      console.log('Article : methods/favorite() :', slug);
      if (!this.isAuthenticated) this.$router.push({ name: 'login' });

      this.$store
        .dispatch('favorite', slug)
        .then((data) => (this.article = data))
        .catch((data) => (this.errors = data));
    },
    deleteArticle(slug) {
      console.log('Article : methods/deleteArticle() :');

      this.$store
        .dispatch('deleteArticle', slug)
        .then(() => this.$router.push({ name: 'home' }))
        .catch((data) => (this.errors = data));
    },
  },
};
</script>

<style></style>
