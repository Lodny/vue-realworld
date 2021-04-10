<template>
  <div v-if="user" class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <ul v-if="errors" class="error-messages">
            <li v-for="v in errors" :key="v">{{ v }}</li>
          </ul>
          <form @submit.prevent="updateSettings(user)">
            <fieldset>
              <fieldset class="form-group">
                <input class="form-control" type="text" v-model="user.image" placeholder="URL of profile picture" />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  v-model="user.username"
                  placeholder="Your username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  v-model="user.bio"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" v-model="user.email" placeholder="Email" />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  v-model="user.password"
                  placeholder="Password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
          <!-- Line break for logout button -->
          <hr />
          <button @click="logout" class="btn btn-outline-danger">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getErrorList } from '@/common/util';

export default {
  data() {
    return {
      user: null,
      errors: null,
    };
  },
  mounted() {
    console.log('Settings : mounted : ', this.currentUser);
    this.user = { ...this.currentUser };
  },
  computed: {
    ...mapGetters(['currentUser']),
    errorList() {
      console.log('Settings : computed/errorList : ');
      return getErrorList(this.errors);
    },
  },
  methods: {
    updateSettings(user) {
      console.log('Settings : methods/updateSettings() : ', user);
      this.$store
        .dispatch('update', user)
        .then(() => this.$router.push({ name: 'home' }))
        .catch((errors) => (this.errors = errors));
    },
    logout() {
      console.log('Settings : methods/logout() :');
      this.$store.dispatch('logout');
      this.$router.push({ name: 'home' });
    },
  },
};
</script>

<style></style>
