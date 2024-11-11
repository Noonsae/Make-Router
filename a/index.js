// index.js

// router를 SPA에 연결

import createRouter from "./router/router.js";

// SPA 구축
const container = document.querySelector("main");
const pages = {
  home: () => container.innerText = "home_page",
  sub: () => container.innerText = "sub_page",
}

const router = createRouter();

router.addRoute("#/", pages.home)
.addRoute("#/sub", pages.sub)
.start();