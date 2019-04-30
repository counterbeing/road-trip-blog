import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
import Blog from '@/components/Blog';
import Photos from '@/components/Photos';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [

    {
      path: '/photos',
      name: 'Photos',
      component: Photos,
    },
    {
      path: '/',
      name: 'Blog Index',
      component: Blog,
    },
    {
      path: '/:id',
      name: 'Story',
      component: Blog,
    },
  ],
});
