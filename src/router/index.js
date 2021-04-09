import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/views/Home'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomeGlobal'),
        },
        {
          path: 'my-feed',
          name: 'home-my-feed',
          component: () => import('@/views/HomeMyFeed'),
        },
        {
          path: 'tag/:tag',
          name: 'home-tag',
          component: () => import('@/views/HomeTag'),
        },
      ],
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/Login'),
    },
    {
      name: 'register',
      path: '/register',
      component: () => import('@/views/Register'),
    },
    // after login
    {
      path: '/editor/:slug?',
      name: 'article-edit',
      component: () => import('@/views/Editor'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/Settings'),
    },
    {
      path: '/@:username',
      // name: '/@:username',
      component: () => import('@/views/Profile'),
      children: [
        {
          path: '',
          name: 'profile',
          component: () => import('@/views/ProfileArticles'),
        },
        {
          path: 'favorites',
          name: 'profile-favorites',
          component: () => import('@/views/ProfileFavorites'),
        },
      ],
    },
  ],
});
