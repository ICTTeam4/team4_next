"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './css/HeaderMain.css';
import Page from '../chat/page';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useAuthStore from '../../../store/authStore';

const HeaderMain = () => {
  // 휘주 수정본 구역 시작
  const {searchKeyword, setSearchKeyword, setKeyword} = useAuthStore();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // 휘주 수정본 구역 끝
  const [isChatOpen, setChatOpen] = useState(false); // 채팅 사이드바 상태 관리
  const [initialRoomId, setInitialRoomId] = useState(null); // 초기 room_id 상태
  const [initialhostId, setInitialHostId] = useState(null); // 초기 글쓴이 아이디, 관리자, 판매자 공통 로직

  useEffect(() => {
    // 이벤트 리스너 등록
    const handleOpenChat = (event) => {
      setInitialRoomId(event.detail.room_id); // room_id 설정
      setInitialHostId(event.detail.host_id); // room_id 설정    
      setChatOpen(true);
    };

    window.addEventListener('open-chat', handleOpenChat);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('open-chat', handleOpenChat);
    };
  }, []);

  const closeChat = () => {
    if (isChatOpen) {
      setChatOpen(false);
      setInitialRoomId(null); //roomid 초기화
      setInitialHostId(null); //hostid 초기화
    }
  };

  const toggleChat = () => {
    setChatOpen(true);
  };

  const imgStyle = {
    marginTop: '-1px',
    marginLeft: '8px',
  };
  const myPageImg = {
    marginTop: '-1px',
    marginLeft: '-6px',
  };

// 휘주 수정본 구역 시작
  useEffect(() => {
    const queryFromURL = searchParams.get('query') || '';

    if (queryFromURL) {
      setKeyword(queryFromURL); // URL에서 검색어를 가져와서 상태에 설정
      setShowSearchBar(true); // 쿼리가 있을 때 검색창을 보이도록 설정
    } else {
      setShowSearchBar(false); // 그 외 페이지에서는 검색창을 숨김
    }
  }, [pathname, searchParams]); // pathname과 searchParams가 변경될 때마다 실행

  const handleSearchClick = () => {
    router.push('/searchPage');
  };

  const handleChange = (e) => {
    // setSearchQuery(e.target.value);
    setKeyword(e.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (searchKeyword.trim() !== "") {
        router.push(`/itemSearchResult?query=${encodeURIComponent(searchKeyword)}`);

      } else {
        alert("검색어를 입력해주세요!");
      }
    }
  };
// 휘주 수정본 구역 끝
  return (
    <div className='max_width_container'>
      {/* 전체 화면을 덮는 오버레이 */}
      {isChatOpen && <div className="chatoverlay" onClick={closeChat}></div>}
      <div className="header_main">
        <div className="main_inner">
         {/* 휘주 수정본 구역 시작 */}
        {showSearchBar && (
          <div className="center">
            <input
              type="text"
              className="searchBar"
              value={searchKeyword}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="브랜드, 상품, 프로필, 태그 등"
            />
          </div>
        )}
        {/* 휘주 수정본 구역 끝 */}
          <div className="right">
            <div className="gnb_area">
              {/* 네비게이션 메뉴 */}
              <nav id="pcGnbContainer" className="gnb">
                <ul id="pcGnbList" className="gnb_list">
                  <li className="gnb_item">
                    {/* 판매 아이콘 */}
                    <Link href="/registrationpage" className="gnb_link">
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
                  {/* 검색 버튼 */}
                  <li className="gnb_item">
                <button className="btn_search" onClick={handleSearchClick}>
                  <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
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

                    <Link href="/myPage" className="gnb_link" scroll={true}>
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
        </div >
        {/* 채팅 사이드바 */}
          <div className={`chat_sidebar ${isChatOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
            <Page isOpen={isChatOpen} closeChat={closeChat} initialRoomId={initialRoomId} initialhostId={initialhostId} />
          </div>
      </div>
    </div>
  );
};
export default HeaderMain;
