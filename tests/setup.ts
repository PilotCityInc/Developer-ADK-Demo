import Vue from 'vue';
import Vuetify from 'vuetify';
import { ValidationObserver, ValidationProvider } from '@/validation';

Vue.use(Vuetify);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.config.productionTip = false;
