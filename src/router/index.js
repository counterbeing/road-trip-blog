import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
import Blog from '@/components/Blog';
import Photos from '@/components/Photos';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Blog',
      component: Blog,
    },
    {
      path: '/photos',
      name: 'Photos',
      component: Photos,
    },
  ],
});
