import axios from 'axios';

const state = {
  user: null,
  errors: null,
};

const mutations = {
  REGISTER(state, payload) {
    console.log('store/user : mutations/REGISTER : ', state, payload);
    state.user = payload;
    state.errors = null;
  },
  LOGIN(state, payload) {
    console.log('store/user : mutations/LOGIN : ', state, payload);
    state.user = payload;
    state.errors = null;
  },
  LOGIN_ERROR(state, payload) {
    console.log('store/user : mutations/LOGIN_ERROR : ', state, payload);
    state.errors = payload;
  },
  LOGOUT(state) {
    console.log('store/user : mutations/LOGOUT : ', state);
    state.user = null;
  },
  UPDATE(state, payload) {
    console.log('store/user : mutations/UPDATE : ', state, payload);
    state.user = payload;
    state.errors = null;
  },
  UPDATE_ERROR(state, payload) {
    console.log('store/user : mutations/UPDATE_ERROR : ', state, payload);
    state.errors = payload;
  },
};

const actions = {
  register(context, credential) {
    return new Promise((resolve, reject) => {
      console.log('store/user : actions/register : ', context, credential);

      const success = (data) => {
        console.log('store/user : actions/register : success() : ', data);
        context.commit('REGISTER', data.user);
        resolve(data.user);

        // router.push({ path: '/' });
        // dispatch({ type: actions.LOGIN, payload: data.user });
        // return history.push('/');
      };

      const fail = (err) => {
        console.log('store/user : actions/register : fail() :', err);
        if (err?.status) {
          console.log('status & errors', err.status, err.data);
          reject(err.data.errors);
        }
      };

      const url = `http://localhost:8080/api/users`;
      console.log('store/user : actions/register : url :', url);
      axios
        .post(url, { user: { ...credential } })
        .then((res) => success(res.data))
        .catch((err) => fail(err?.response || err?.request || err.message));
    });
  },
  login(context, credential) {
    return new Promise((resolve, reject) => {
      console.log('store/user : actions/login : ', context, credential);

      const success = (data) => {
        console.log('store/user : actions/login : success() : ', data);
        context.commit('LOGIN', data.user);
        resolve(data);
      };

      const fail = (err) => {
        console.log('store/user : actions/login : fail() : ', err);
        if (err?.status) {
          console.log('status & errors', err.status, err.data);
          context.commit('LOGIN_ERROR', err.data.errors);
          reject(err.data.errors);
        }
      };

      const url = `http://localhost:8080/api/users/login`;
      console.log('store/user : actions/login : url : ', url);
      axios
        .post(url, { user: { ...credential } })
        .then((res) => success(res.data))
        .catch((err) => fail(err?.response || err?.request || err.message));
    });
  },
  logout(context) {
    console.log('store/user : actions/logout() :');
    context.commit('LOGOUT');
  },
  update(context, user) {
    return new Promise((resolve, reject) => {
      console.log('store/user : actions/update : ', context, user);
      console.log('store/user : actions/update : ', this.state.user);

      const success = (data) => {
        console.log('store/user : actions/update : success() : ', data);
        context.commit('UPDATE', data.user);
        resolve(data);
      };

      const fail = (err) => {
        console.log('store/user : actions/update : fail() : ', err);
        if (err?.status) {
          console.log('status & errors', err.status, err.data);
          // context.commit('UPDATE_ERROR', err.data.errors);
          reject(err.data.errors);
        }
      };

      const url = `http://localhost:8080/api/user`;
      console.log('store/user : actions/update : url : ', url);
      const body = {
        user: {
          image: user.image,
          username: user.username,
          bio: user.bio,
          email: user.email,
          password: user.password,
        },
      };

      console.log('store/user : actions/update : ', context.state.user?.token);

      const header = {
        headers: {
          'content-type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Headers': 'authorization',
          authorization: `Token ${context.state.user?.token}`,
        },
      };

      axios
        .put(url, body, header)
        .then((res) => success(res.data))
        .catch((err) => fail(err?.response || err?.request || err.message));
    });
  },
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.user !== null;
  },
};

export default { state, mutations, actions, getters };

// export default {
//   namespaced: true,
//   state: {
//     user: null,
//     errors: null,
//   },
//   mutations: {

//   },
//   actions: {

//   },
// };
