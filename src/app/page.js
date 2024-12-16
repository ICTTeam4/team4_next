
import ItemList from "./itemList/page";
import VideoBanner from "./videoBanner/page"

// page.js는 필수 이다. (생략 불가)
// 각 경로(/, /about, /content 등등) 마다 페이지를 렌더링 하려면 
// 해당 경로의 page.js 파일이 반드시 필요하다. 

// 자식 컴포넌트 
// 하지만 부모컴포넌트는 없어도 되고, 자식컴포넌트는 없으면 안된다.
export default function Home() {
  return (
    <>

      {/* 비디오 베너 (임시 위치입니다) */}
      <VideoBanner />

      <ItemList />
    </>
  );
}
