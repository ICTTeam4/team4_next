'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './css/HeaderMain.css';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import useAuthStore from '../../../store/authStore';

const HeaderMain = ({ searchQuery: initialSearchQuery = '' }) => {
  const {searchKeyword, setSearchKeyword, setKeyword} = useAuthStore();
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  return (
    <div className="header_main">
      <div className="main_inner">
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
        <div className="right">
          <nav id="pcGnbContainer" className="gnb">
            <ul id="pcGnbList" className="gnb_list">
              <li className="gnb_item">
                <Link href="/sale" className="gnb_link">
                  <img src="/images/HJ_saleImg.png" alt="판매 아이콘" width="30" height="30" />
                </Link>
              </li>
              <li className="gnb_item">
                <Link href="/chat" className="gnb_link">
                  <img src="/images/HJ_chatImg.png" alt="채팅 아이콘" width="30" height="30" />
                </Link>
              </li>
              <li className="gnb_item">
                <button className="btn_search header-search-button" onClick={handleSearchClick}>
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
              <li className="gnb_item">
                <Link href="/myPage" className="gnb_link">
                  <img src="/images/HJ_mypage_icon.png" alt="마이페이지 아이콘" width="24" height="24" />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;
