import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
import Map from '@/components/Map';
import Photos from '@/components/Photos';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Map',
      component: Map,
    },
    {
      path: '/photos',
      name: 'Photos',
      component: Photos,
    },
  ],
});
