import axios from 'axios';
import { getHeader } from '../common/util';

const state = {};

const mutations = {
  // GET_GLOBAL() {},
};

const actions = {
  getGlobalArticles(context) {
    console.log('store/article : actions/getGlobalArticles() : ', context);
    return getArticles(context, `http://localhost:8080/api/articles?limit=10&offset=0`);
  },
  getTagArticles(context, tag) {
    console.log('store/article : actions/getTagArticles() :', tag);
    return getArticles(context, `http://localhost:8080/api/articles?tag=${tag}&limit=10&offset=0`);
  },
  getMyArticles(context, author) {
    console.log('store/article : actions/getMyArticles() :', author);
    return getArticles(context, `http://localhost:8080/api/articles?author=${author}&limit=10&offset=0`);
  },
  getFavoritedArticles(context, favorited) {
    console.log('store/article : actions/getFavoritedArticles() :', favorited);
    return getArticles(context, `http://localhost:8080/api/articles?favorited=${favorited}&limit=10&offset=0`);
  },
  getMyFeedArticles(context) {
    console.log('store/article : actions/getMyFeedArticles() :');
    return getArticles(context, `http://localhost:8080/api/articles/feed?limit=10&offset=0`);
  },
  addArticle(context, article) {
    console.log('store/article : actions/addArticle() :', { article: { ...article } });

    return new Promise((resolve, reject) => {
      const success = (data) => {
        console.log('store/article : actions : success() : ', data);
        resolve(data.article);
      };

      const fail = (err) => {
        console.log('store/article : actions : fail() :', err);
        if (err?.status) {
          console.log('status & errors', err.status, err.data);
          reject(err.data.errors);
        }
      };

      const url = `http://localhost:8080/api/articles`;
      axios
        .post(url, { article: { ...article } }, getHeader(context.rootState.user.user))
        .then((res) => success(res.data))
        .catch((err) => fail(err?.response || err?.request || err.message));
    });
  },
  getArticle(context, slug) {
    console.log('store/article : actions/getArticle() :', slug);

    return new Promise((resolve, reject) => {
      const success = (data) => {
        console.log('store/article : actions : success() : ', data);
        resolve(data.article);
      };

      const fail = (err) => {
        console.log('store/article : actions : fail() :', err);
        if (err?.status) {
          console.log('status & errors', err.status, err.data);
          reject(err.data.errors);
        }
      };

      const url = `http://localhost:8080/api/articles/${slug}`;
      axios
        .get(url, getHeader(context.rootState.user.user))
        .then((res) => success(res.data))
        .catch((err) => fail(err?.response || err?.request || err.message));
    });
  },
  deleteArticle(context, slug) {
    console.log('store/article : actions/deleteArticle() :', slug);

    return new Promise((resolve, reject) => {
      const success = (data) => {
        console.log('store/article : actions : success() : ', data);
        resolve(data.article);
      };

      const fail = (err) => {
        console.log('store/article : actions : fail() :', err);
        if (err?.status) {
          console.log('status & errors', err.status, err.data);
          reject(err.data.errors);
        }
      };

      const url = `http://localhost:8080/api/articles/${slug}`;
      axios
        .delete(url, getHeader(context.rootState.user.user))
        .then((res) => success(res.data))
        .catch((err) => fail(err?.response || err?.request || err.message));
    });
  },
  favorite(context, slug) {
    console.log('store/article : actions/favorite() :', slug);

    return new Promise((resolve, reject) => {
      const success = (data) => {
        console.log('store/article : actions : success() : ', data);
        resolve(data.article);
      };

      const fail = (err) => {
        console.log('store/article : actions : fail() :', err);
        if (err?.status) {
          console.log('status & errors', err.status, err.data);
          reject(err.data.errors);
        }
      };

      // ps://conduit.productionready.io/api/articles/djscknjk-34raf2/favorite
      const url = `http://localhost:8080/api/articles/${slug}/favorite`;
      axios
        .post(url, null, getHeader(context.rootState.user.user))
        .then((res) => success(res.data))
        .catch((err) => fail(err?.response || err?.request || err.message));
    });
  },
};

const getters = {};

function getArticles(context, url) {
  // let url = '';
  // switch (which) {
  //   case 'tag':
  //     url = `http://localhost:8080/api/articles?tag=${param}&limit=10&offset=0`;
  //     break;
  //   case 'my':
  //     url = `http://localhost:8080/api/articles?author=${param}&limit=10&offset=0`;
  //     break;
  //   case 'favorited':
  //     url = `http://localhost:8080/api/articles?favorited=${param}&limit=10&offset=0`;
  //     break;
  //   case 'myfeed':
  //     url = `http://localhost:8080/api/articles/feed?limit=10&offset=0`;
  //     break;
  //   case 'global':
  //   default:
  //     url = `http://localhost:8080/api/articles?limit=10&offset=0`;
  //     break;
  // }

  console.log('store/article : actions : url: ', url);
  console.log('store/article : actions : user: ', context.rootState.user.user);

  return new Promise((resolve, reject) => {
    const success = (data) => {
      console.log('store/article : actions : success() : ', data);
      resolve(data.articles);
    };

    const fail = (err) => {
      console.log('store/article : actions : fail() :', err);
      if (err?.status) {
        console.log('status & errors', err.status, err.data);
        reject(err.data.errors);
      }
    };

    axios
      .get(url, getHeader(context.rootState.user.user))
      .then((res) => success(res.data))
      .catch((err) => fail(err?.response || err?.request || err.message));
  });
}

export default { state, mutations, actions, getters };
