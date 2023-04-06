import { createApp, h, provide } from "vue";
import { createPinia } from "pinia"; // https://pinia.vuejs.org/getting-started.html#installation
import router from "./router";
import "./index.scss";
import App from "./App.vue";
// graphql
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { DefaultApolloClient } from "@vue/apollo-composable";

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: "http://localhost:4000/graphql",
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

app.use(createPinia()).use(router).mount("#app");
// createApp(App).use(createPinia()).use(router).use(VueApollo).mount("#app");
