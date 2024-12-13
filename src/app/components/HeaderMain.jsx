import React from 'react';
import Link from 'next/link';
import './css/HeaderMain.css';

const HeaderMain = () => {
  const imgStyle = {
    marginTop: '-1px',
    marginLeft: '8px',
  };
  const myPageImg = {
    marginTop: '-1px',
    marginLeft: '-6px',
  };
  return (
    <div className='max_width_container'>
    <div className="header_main">
      <div className="main_inner">


        {/* 중앙 영역 (현재 내용 없음) */}
        <div className="center"></div>

        {/* 오른쪽 영역 */}
        <div className="right">
          <div className="gnb_area">
            {/* 네비게이션 메뉴 */}
            <nav id="pcGnbContainer" className="gnb">
              <ul id="pcGnbList" className="gnb_list">
                <li className="gnb_item">
                  {/* 판매 아이콘 */}
                  <Link href="/saleDetail" className="gnb_link">
                    <img
                      src="/images/HJ_saleImg.png"
                      alt="판매 아이콘"
                      width="30"
                      height="30"
                      style={{ marginTop: '-3px' }}
                    />
                  </Link>
                </li>
                <li className="gnb_item">
                  {/* 채팅 아이콘 */}
                  <Link href="/chat" className="gnb_link">
                    <img
                      src="/images/HJ_chatImg.png"
                      alt="판매 아이콘"
                      width="28"
                      height="28"
                      style={imgStyle}
                    />
                  </Link>
                </li>

                {/* 검색 버튼 */}
                <li className="gnb_item">
                  <button className="btn_search header-search-button search-button-margin">
                    <svg
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.571 16.631a8.275 8.275 0 111.06-1.06l4.5 4.498-1.061 1.06-4.499-4.498zm1.478-6.357a6.775 6.775 0 11-13.55 0 6.775 6.775 0 0113.55 0z"
                        fill="#222"
                      ></path>
                    </svg>
                  </button>
                </li>

                {/* 장바구니 버튼 => 마이페이지로 변경*/}
                <li className="gnb_item">
                  {/* 채팅 아이콘 */}
                  <Link href="/chat" className="gnb_link">
                    <img
                      src="/images/HJ_mypage_icon.png"
                      alt="myPage 아이콘"
                      width="24"
                      height="24"
                      style={myPageImg}
                    />
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div >
    </div>
  );
};

export default HeaderMain;