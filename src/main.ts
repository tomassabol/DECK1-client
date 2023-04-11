import { createApp, h, provide } from "vue";
import { createPinia } from "pinia"; // https://pinia.vuejs.org/getting-started.html#installation
import router from "./router";
import "./index.scss";
import App from "./App.vue";

const app = createApp(App);
app.use(createPinia()).use(router).mount("#app");
