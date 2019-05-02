// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import router from '@/router';
import moment from 'moment';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import { Icon } from 'leaflet';
import Meta from 'vue-meta';
import VueLazyload from 'vue-lazyload';
import VueAnalytics from 'vue-analytics';
import 'leaflet/dist/leaflet.css';
import App from './App';
import store from './store';

Vue.use(VueAnalytics, {
  id: 'UA-19114773-13',
});

Vue.use(Meta);
Vue.use(VueLazyload);

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

// eslint-disable-next-line
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  // eslint-disable-next-line
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  // eslint-disable-next-line
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  // eslint-disable-next-line
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

Vue.config.productionTip = false;

Vue.filter('formatDate', value => moment(value).format('LL'));


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
});
