
// layout.js 는 선택읻. (RootLayout 제외)
// layout 이 필요 없는 간단한 페이지에서는 생략 가능

import './globals.css';
import Footer from "./components/Footer";
import VideoBanner from "./videoBanner/page";
import Header from "./components/Header";

// 페이지 전체의 공통 구조를 렌더링 할 때 사용

// 부모컴포넌트
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* 헤더 */}
        <Header/>
        <hr/>
        
        
        {children}
        <hr/>
        {/* 형태를 위한 DIV 입니다. 건드리지 마세요 */}
        <div style={{display:'flex' , justifyContent:'center'}}>
        <div style={{maxWidth:'1280px', minWidth:'510px'}}>
        {/* 푸터 */}
        <Footer/>
        </div>
        </div>
        <hr/>
        <ul>

        </ul>
      </body>
    </html>
  );
}
