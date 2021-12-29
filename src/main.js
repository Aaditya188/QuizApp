import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./registerServiceWorker";

/** Customize **/
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

Vue.config.productionTip = false;

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount("#app");
