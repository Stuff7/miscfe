import "@app/style/main.scss";
import { createApp } from "vue";
import App from "@app/App.vue";
import { setLocalNamespace } from "@lib/storage";

setLocalNamespace("TEST_APP");
createApp(App).mount("#app");
