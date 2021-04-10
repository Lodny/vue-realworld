<template>
  <div v-if="profile" class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <!-- alt={profile.bio} -->
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>{{ profile.bio }}</p>

            <router-link
              v-if="isAuthenticated && currentUser.username === profile.username"
              :to="{ name: 'settings' }"
              class="btn btn-sm btn-outline-secondary action-btn"
            >
              <i class="ion-gear-a"></i> Edit Profile Settings
            </router-link>
            <button
              v-else
              class="btn btn-sm action-btn"
              :class="[profile.following ? 'btn-secondary' : 'btn-outline-secondary']"
              @click="follow(profile.username)"
            >
              <i :class="followString">
                {{ ' ' + (profile.following ? 'Unf' : 'F') + 'ollow ' + profile.username }}
              </i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                  exact
                  :to="{ name: 'profile', params: { username: profile.username } }"
                  class="nav-link"
                  active-class="active"
                >
                  My Articles
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  exact
                  :to="{ name: 'profile-favorite', params: { username: profile.username } }"
                  class="nav-link"
                  active-class="active"
                >
                  Favorited Articles
                </router-link>
              </li>
            </ul>
          </div>

          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      profile: null,
      errors: null,
    };
  },
  mounted() {
    console.log('Profile : mounted() : ', this.$route.params, this.isAuthenticated, this.currentUser);
    this.getProfile(this.$route.params.username);
  },
  watch: {
    $route(to) {
      console.log('Profile : watch/$route(to) : ', to.params);
      this.getProfile(to.params.username);
    },
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'currentUser']),
    followString() {
      return `ion-${this.profile.following ? 'minus' : 'plus'}-round`;
    },
  },
  methods: {
    follow(username) {
      console.log('Profile : methods/follow() :', username);
      if (!this.isAuthenticated) this.$router.push({ name: 'login' });

      this.$store
        .dispatch('follow', username)
        .then((data) => (this.profile = data))
        .catch((data) => (this.errors = data));
    },
    getProfile(username) {
      this.$store
        .dispatch('getProfile', username)
        .then((data) => (this.profile = data))
        .catch((data) => (this.errors = data));
    },
  },
};
</script>

<style></style>
