import Vue from 'vue';
import App from './app.vue';

import context from './contextable';

new Vue({
  context,
  el: '#app',
  render: h => h(App)
});
