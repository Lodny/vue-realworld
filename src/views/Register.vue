<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link class="nav-link" :to="{ name: 'login' }">
              Have an account?
            </router-link>
          </p>
          <ul v-if="errorList" class="error-messages">
            <li v-for="v in errorList" :key="v">{{ v }}</li>
            <!-- <li v-for="(v, k) in errors" :key="k">{{ k }} {{ v | error }}</li> -->
          </ul>
          <form @submit.prevent="onSubmit(username, email, password)">
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="text" v-model="username" placeholder="Username" />
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="text" v-model="email" placeholder="Email" />
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="password" v-model="password" placeholder="Password" />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getErrorList } from '@/common/util';

export default {
  name: 'register',
  data: function() {
    return {
      username: '',
      email: '',
      password: '',
      errors: null,
    };
  },
  methods: {
    onSubmit(username, email, password) {
      console.log('onSubmit() : ', username, email, password);
      this.$store
        .dispatch('register', { username, email, password })
        .then(() => this.$router.push({ name: 'home' }))
        .catch((errors) => (this.errors = errors));
    },
  },
  computed: {
    errorList() {
      console.log('Register : computed/errorList : ');
      return getErrorList(this.errors);
    },
  },
};
</script>

<style></style>
