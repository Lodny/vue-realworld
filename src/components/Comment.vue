<template>
  <div>
    <form v-if="isAuthenticated" class="card comment-form">
      <div class="card-block">
        <textarea class="form-control" placeholder="Write a comment..." rows="3" v-model="body"></textarea>
      </div>
      <div class="card-footer">
        <img :src="currentUser.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary" type="button" @click="addComment(slug, body)">
          Post Comment
        </button>
      </div>
    </form>

    <div v-for="comment in comments" class="card" :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>

      <div class="card-footer">
        <router-link :to="{ name: 'profile', params: { username: comment.author.username } }" class="comment-author">
          <img :src="comment.author.image" class="comment-author-img" />
        </router-link>
        {{ ' ' }}
        <router-link :to="{ name: 'profile', params: { username: comment.author.username } }" class="comment-author">
          {{ comment.author.username }}
        </router-link>
        <span class="date-posted">{{ new Date(comment.createdAt).toDateString() }}</span>
        <span v-if="isAuthenticated && currentUser.username === comment.author.username" class="mod-options">
          <!-- <i class='ion-edit'></i> -->
          <i class="ion-trash-a" @click="deleteComment(slug, comment.id)"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      comments: [],
      body: '',
      errors: null,
    };
  },
  mounted() {
    console.log('Comment : mounted() :', this.slug);

    this.$store
      .dispatch('getComments', this.slug)
      .then(data => (this.comments = data))
      .catch(data => (this.errors = data));
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'currentUser']),
  },
  methods: {
    addComment(slug, body) {
      console.log('Comment : methods/addComment() :', body);
      this.$store
        .dispatch('addComment', { slug, body })
        .then(data => this.comments.push(data))
        .catch(data => (this.errors = data));
    },
    deleteComment(slug, id) {
      console.log('Comment : methods/deleteComment() :', id);
      this.$store
        .dispatch('deleteComment', { slug, id })
        .then(() => (this.comments = this.comments.filter(comment => comment.id !== id)))
        .catch(data => (this.errors = data));
    },
  },
};
</script>

<style></style>
