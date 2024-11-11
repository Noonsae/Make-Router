// router.js

// :name, "song", 등 path parameters를 매칭하기 위한 정규표현식
const ROUTE_PARAMETER_REGEXP = /:(\w+)/g;
const URL_REGEXP = "([^\\/]+)";

// Router
export default function createRouter() {
  // App의 경로 목록들을 담을 배열
  // routes : App의 경로 목록을 수집하는 레지스트리
  const routes = [];

  // router : 라우터를 구현한 객체로 기능들을 메서드로 추상화
  const router = {
    // 기능 1. App의 경로 목록을 저장

    // addRoute : routes 배열에 URL과 구성 요소들을 매핑하여 "저장"하기 위한 메서드
    addRoute(fragment, component) {
      const params = [];
      const parsedFragment = fragment
        .replace(ROUTE_PARAMETER_REGEXP, (_, paramName) => {
          // path parameter 이름을 추출 후 배열에 추가 ["name, song"]
          params.push(paramName);

          // path parameter에 매치되는 문자를 URL_REGEXP로 치환
          return URL_REGEXP;

          // "/"의 텍스트로써 사용을 위해 모든 "/"앞에 이스케이프 문자 ("\")를 추가함.
        })
        .replace(/\//g, "\\/");

      routes.push({
        fragmentRegExp: new RegExp(`^${parsedFragment}$`),
        component,
        params,
      });

      return this;
    },

    // 기능 2. 현재 URL이 변경되면 페이지 콘텐츠를 해당 URL에 매핑된 구성 요소로 교체

    // URL 변경을 "청취"하는 메서드

    start() {
      const getUrlParams = (route, hash) => {
        const params = {};
        const matches = hash.match(route.fragmentRegExp);

        if (matches) {
          matches.shift(); // 배열의 첫번째 값에는 url 전체가 담겨있으므로 제거해준다.
          matches.forEach((paramValue, index) => {
            const paramName = route.params[index];
            params[paramName] = paramValue;
          });
        }
        // params = {name: 'IU', song: 'raindrop'}
        console.log([params]);

        return params;        
      };

      const checkRoutes = () => {
        const currentRoute = routes.find((route) =>
          route.fragmentRegExp.test(window.location.hash)
        );

        if (currentRoute.params.length) {
          // path parameters가 있는 url인 경우
          const urlParams = getUrlParams(currentRoute, window.location.hash);
          currentRoute.component(urlParams);
        } else {
          currentRoute.component();
        }
      };

      // 브라우저에서 hash값이 바뀔 때 발생하는 이벤트
      window.addEventListener("hashchange", checkRoutes);
      checkRoutes();
    },

    // 버튼이 클릭되면 브라우저의 URL의 #을 포함하는 뒷부분을 변경 및 이동
    navigate(fragment, replace = false) {
      if (replace) {
        const href = window.location.href.replace(
          window.location.hash,
          "#" + fragment
        );
        window.location.replace(href);
      } else {
        window.location.hash = fragment;
      }
    },
  };
  return router;
}
