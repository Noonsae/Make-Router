// index.js

// router를 SPA에 연결

import createRouter from "./router/router.js";

// SPA 구축
const container = document.querySelector("main");
const pages = {
  home: () => (container.innerText = "home page"),
  melon: () => (container.innerText = "melon page"),
  board: (params) => (container.innerText = `${params.name} ${params.song}`),
};

const router = createRouter();

router
  .addRoute("#/", pages.home)
  .addRoute("#/melon", pages.melon)
  .addRoute("#/melon/:name/:song", pages.board)
  .start();

window.addEventListener("click", (e) => {
  if (e.target.matches("[data-navigate]")) {
    router.navigate(e.target.dataset.navigate);
  }
});
