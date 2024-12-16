"use client"
import React, { useState } from 'react';
import './css/HeaderMain.css';
import Page from '../chat/page'; // 채팅 페이지 컴포넌트 import

const HeaderMain = () => {
  const [isChatOpen, setChatOpen] = useState(false); // 채팅 사이드바 상태 관리

  const toggleChat = (e) => {
    e.stopPropagation(); // 이벤트 전파 방지
    setChatOpen(!isChatOpen);
  };

  const closeChat = () => {
    if (isChatOpen) {
      setChatOpen(false);
    }
  };

  const imgStyle = {
    marginTop: '-1px',
    marginLeft: '8px',
  };

  const myPageImg = {
    marginTop: '-1px',
    marginLeft: '-6px',
  };

  return (
    <div className="max_width_container">
      {/* 전체 화면을 덮는 오버레이 */}
      {isChatOpen && <div className="overlay" onClick={closeChat}></div>}

      <div className="header_main">
        <div className="main_inner">
          {/* 중앙 영역 */}
          <div className="center"></div>

          {/* 오른쪽 영역 */}
          <div className="right">
            <div className="gnb_area">
              <nav id="pcGnbContainer" className="gnb">
                <ul id="pcGnbList" className="gnb_list">
                  <li className="gnb_item">
                    <img
                      src="/images/HJ_saleImg.png"
                      alt="판매 아이콘"
                      width="30"
                      height="30"
                      style={{ marginTop: '-3px' }}
                    />
                  </li>
                  <li className="gnb_item">
                    <button className="gnb_link" onClick={toggleChat}>
                      <img
                        src="/images/HJ_chatImg.png"
                        alt="채팅 아이콘"
                        width="28"
                        height="28"
                        style={imgStyle}
                      />
                    </button>
                  </li>
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
                  <li className="gnb_item">
                    <img
                      src="/images/HJ_mypage_icon.png"
                      alt="myPage 아이콘"
                      width="24"
                      height="24"
                      style={myPageImg}
                    />
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* 채팅 사이드바 */}
      {isChatOpen && (
  <div className={`chat_sidebar ${isChatOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
    <Page isOpen={isChatOpen} setChatOpen={setChatOpen}  />
  </div>
)}
    </div>
  );
};

export default HeaderMain;
