import Vue from "vue";
import Game from "./Game.vue";
import "./assets/styles.css";

import Toasted from "vue-toasted";

Vue.config.productionTip = false;

Vue.use(Toasted, { position: "top-center", duration: 2000 });

new Vue({
  render: (h) => h(Game),
}).$mount("#app");
