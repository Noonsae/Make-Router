// router.js

// Router
export default function createRouter(){

  // App의 경로 목록들을 담을 배열
  // routes : App의 경로 목록을 수집하는 레지스트리
  const routes = [];

  // router : 라우터를 구현한 객체로 기능들을 메서드로 추상화
  const router = {

    // 기능 1. App의 경로 목록을 저장

    // addRoute : routes 배열에 URL과 구성 요소들을 매핑하여 "저장"하기 위한 메서드
    addRoute(fragment, component){
      routes.push({fragment, component});
      return this;
    },

    // 기능 2. 현재 URL이 변경되면 페이지 콘텐츠를 해당 URL에 매핑된 구성 요소로 교체

    // URL 변경을 "청취"하는 메서드
    start() {
      // routes 배열에서 현재 브라우저 hash값과 동일한 해시값을 가진 구성 요소를 찾기
      const checkRoutes = () => {
        const currentRoute = routes.find(route => route.fragment === window.location.hash);

        // 페이지의 이동을 보여주기 위해 innerText을 변경하는 메서드
        currentRoute.component();
      }
      // 브라우저에서 hash값이 바뀔 때 발생하는 이벤트
      window.addEventListener('hashchange', checkRoutes);
      checkRoutes();
    }
  }
  return router;
}