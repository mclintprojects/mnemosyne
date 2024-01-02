import Vue from "vue";
import Game from "./Game.vue";
import "./assets/styles.css";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Game),
}).$mount("#app");
