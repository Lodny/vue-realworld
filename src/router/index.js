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
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/Settings'),
    },
    // Handle child routes with a default, by giving the name to the
    // child.
    // SO: https://github.com/vuejs/vue-router/issues/777
    {
      path: '/@:username',
      // name: '/@:username',
      component: () => import('@/views/Profile'),
      children: [
        {
          path: '',
          name: 'profile',
          component: () => import('@/views/ProfileMyArticle'),
        },
        {
          path: 'favorites',
          name: 'profile-favorite',
          component: () => import('@/views/ProfileFavoritedArticle'),
        },
      ],
    },
    {
      path: '/articles/:slug',
      name: 'article',
      props: true,
      component: () => import('@/views/Article'),
    },
    {
      path: '/editor/:slug?',
      name: 'article-edit',
      props: true,
      component: () => import('@/views/ArticleEdit'),
    },
  ],
});
