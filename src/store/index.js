import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
// import router from '../router';

// import home from "./home.module";
import user from './user';
import article from './article';
import profile from './profile';
import comment from './comment';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    // home,
    user,
    article,
    profile,
    comment,
  },
  state: {
    // tags: null,
    articles: null,
  },
  mutations: {
    // SET_TAGS(state, payload) {
    //   console.log('store : mutations/SET_TAGS : ', state, payload);
    //   state.tags = payload;
    // },
    SET_ARTICLES(state, payload) {
      console.log('store : mutations/SET_ARTICLES : ', state, payload);
      state.articles = payload;
    },
  },
  actions: {
    // getTags(context) {
    getTags() {
      console.log('store : actions/getTags : ');

      return new Promise((resolve, reject) => {
        const success = (data) => {
          console.log('store : actions/getTags : success() : ', data);
          // context.commit('SET_TAGS', data.tags);
          resolve(data.tags);
        };

        const fail = (err) => {
          console.log('store : actions/getTags : fail() : ', err);
          if (err?.status) {
            console.log('status & errors', err.status, err.data);
            // context.commit('UPDATE_ERROR', err.data.errors);
            reject(err.data.errors);
          }
        };

        const url = `http://localhost:8080/api/tags`;
        console.log('store : actions/getTags : url : ', url);

        axios
          .get(url)
          .then((res) => success(res.data))
          .catch((err) => fail(err?.response || err?.request || err.message));
      });
    },
  },
});
