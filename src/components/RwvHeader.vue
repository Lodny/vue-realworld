<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" :to="{ name: 'home' }">
        conduit
      </router-link>
      <ul v-if="!isAuthenticated" class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link class="nav-link" active-class="active" exact :to="{ name: 'home' }">
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" active-class="active" exact :to="{ name: 'login' }">
            <i class="ion-compose"></i>Sign in
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" active-class="active" exact :to="{ name: 'register' }">
            <i class="ion-compose"></i>Sign up
          </router-link>
        </li>
      </ul>
      <ul v-else class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link class="nav-link" active-class="active" exact :to="{ name: 'home' }">
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" active-class="active" :to="{ name: 'article-edit' }">
            <i class="ion-compose"></i>&nbsp;New Article
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" active-class="active" exact :to="{ name: 'settings' }">
            <i class="ion-gear-a"></i>&nbsp;Settings
          </router-link>
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{
              name: 'profile',
              params: { username: currentUser.username },
            }"
          >
            {{ currentUser.username }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'RwvHeader',
  computed: {
    ...mapGetters(['isAuthenticated', 'currentUser']),

    // isAuthenticated() {
    //   console.log('> RwHeader : computed/isAuthenticated : ', this.$store.state.user);
    //   return this.$store.state.user;
    // },
    // currentUser() {
    //   console.log('> RwHeader : computed/currentUser : ', this.$store.state.user);
    //   return this.$store.state.user;
    // },
  },
};
</script>
