<template>
  <div class="home-page">
    <div v-if="!isAuthenticated" class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="isAuthenticated" class="nav-item">
                <router-link :to="{ name: 'home-my-feed' }" class="nav-link" active-class="active">
                  Your Feed
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'home' }" exact class="nav-link" active-class="active">
                  Global Feed
                </router-link>
              </li>
              <li class="nav-item" v-if="selectedTag">
                <router-link
                  :to="{ name: 'home-tag', params: { tag: selectedTag } }"
                  class="nav-link"
                  active-class="active"
                >
                  <i class="ion-pound"></i> {{ selectedTag }}
                </router-link>
              </li>
            </ul>
          </div>
          <router-view></router-view>
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div v-if="tags" class="tag-list">
              <template v-for="(tag, index) in tags">
                <router-link :to="{ name: 'home-tag', params: { tag: tag } }" class="tag-pill tag-default" :key="index">
                  {{ tag }}
                </router-link>
              </template>
            </div>
            <div v-else class="tag-list">
              Loading Tags...
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'home',
  data() {
    return {
      tags: null,
      errors: null,
    };
  },
  mounted() {
    console.log('Home : mounted() : ');

    this.$store
      .dispatch('getTags')
      .then((data) => (this.tags = data))
      .catch((errors) => (this.errors = errors));
  },
  components: {},
  computed: {
    ...mapGetters(['isAuthenticated']),
    selectedTag() {
      console.log('> Home : computec/selectedTag : ', this.$route.params.tag);
      return this.$route.params.tag;
    },
  },
};
</script>

<style></style>
