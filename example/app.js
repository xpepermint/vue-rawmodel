import Vue from 'vue';
import App from './app.vue';
import * as models from './models';

new Vue({
  models,
  el: '#app',
  render: h => h(App)
});
