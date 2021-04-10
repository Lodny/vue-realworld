import axios from 'axios';
import { getHeader } from '../common/util';

const state = {};

const mutations = {};
const actions = {
  getComments(context, slug) {
    console.log('store/comment : actions/getComments :', slug);

    return new Promise((resolve, reject) => {
      const success = data => {
        console.log('store/comment : actions : success() : ', data);
        resolve(data.comments);
      };

      const fail = err => {
        console.log('store/comment : actions : fail() :', err);
        if (err?.status) {
          console.log('status & errors', err.status, err.data);
          reject(err.data.errors);
        }
      };

      const url = `http://localhost:8080/api/articles/${slug}/comments`;
      axios
        .get(url, getHeader(context.rootState.user.user))
        .then(res => success(res.data))
        .catch(err => fail(err?.response || err?.request || err.message));
    });
  },
  addComment(context, { slug, body }) {
    console.log('store/comment : actions/addComment :', body);

    return new Promise((resolve, reject) => {
      const success = data => {
        console.log('store/comment : actions : success() : ', data);
        resolve(data.comment);
      };

      const fail = err => {
        console.log('store/comment : actions : fail() :', err);
        if (err?.status) {
          console.log('status & errors', err.status, err.data);
          reject(err.data.errors);
        }
      };

      const url = `http://localhost:8080/api/articles/${slug}/comments`;
      axios
        .post(url, { comment: { body } }, getHeader(context.rootState.user.user))
        .then(res => success(res.data))
        .catch(err => fail(err?.response || err?.request || err.message));
    });
  },
  deleteComment(context, { slug, id }) {
    console.log('store/comment : actions/deleteComment :', id);

    return new Promise((resolve, reject) => {
      const success = data => {
        console.log('store/comment : actions : success() : ', data);
        resolve();
      };

      const fail = err => {
        console.log('store/comment : actions : fail() :', err);
        if (err?.status) {
          console.log('status & errors', err.status, err.data);
          reject(err.data.errors);
        }
      };

      // ps://conduit.productionready.io/api/articles/conduit-wvd2k9/comments/91717
      const url = `http://localhost:8080/api/articles/${slug}/comments/${id}`;
      axios
        .delete(url, getHeader(context.rootState.user.user))
        .then(res => success(res.data))
        .catch(err => fail(err?.response || err?.request || err.message));
    });
  },
};
const getters = {};

export default { state, mutations, actions, getters };
