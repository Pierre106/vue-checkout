import Vue from 'vue'
import App from './App.vue'
//bootstrap 4
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
//bootstrap vue
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue);
import VueSweetalert2 from 'vue-sweetalert2';

Vue.use(VueSweetalert2);

Vue.config.productionTip = false
    //filters in vue cli 3
Vue.filter('currency', function(value) {
    return `£${value}`;
});
new Vue({
    render: h => h(App),
}).$mount('#app')