import axios from 'axios';
import { getHeader } from '../common/util';

const state = {};

const mutations = {
  // GET_GLOBAL() {},
};

const actions = {
  getProfile(context, username) {
    return new Promise((resolve, reject) => {
      console.log('store/profile : actions/getProfile() : ');

      const success = (data) => {
        console.log('store/profile : actions/getProfile() : success() : ', data);
        // context.commit('GET_GLOBAL', data.articles);
        resolve(data.profile);
      };

      const fail = (err) => {
        console.log('store/profile : actions/getProfile() : fail() :', err);
        if (err?.status) {
          console.log('status & errors', err.status, err.data);
          reject(err.data.errors);
        }
      };

      const url = `http://localhost:8080/api/profiles/${username}`;
      console.log('store/profile : actions/getProfile() : url :', url);
      axios
        .get(url, getHeader(context.rootState.user.user))
        .then((res) => success(res.data))
        .catch((err) => fail(err?.response || err?.request || err.message));
    });
  },
  follow(context, username) {
    console.log('store/profile : actions/follow() :', username, context.rootState.user.user);

    return new Promise((resolve, reject) => {
      const success = (data) => {
        console.log('store/profile : actions : success() : ', data);
        resolve(data.profile);
      };

      const fail = (err) => {
        console.log('store/profile : actions : fail() :', err);
        if (err?.status) {
          console.log('status & errors', err.status, err.data);
          reject(err.data.errors);
        }
      };

      const url = `http://localhost:8080/api/profiles/${username}/follow`;
      axios
        .post(url, null, getHeader(context.rootState.user.user))
        .then((res) => success(res.data))
        .catch((err) => fail(err?.response || err?.request || err.message));
    });
  },
};

const getters = {};

export default { state, mutations, actions, getters };
