'use client';
import React, { useState } from 'react';
import './searchPage.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // useRouter 추가
import useAuthStore from '../../../store/authStore';

function Page(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter(); // useRouter 훅 사용
  const {searchKeyword ,setKeyword} = useAuthStore();

  // 검색어 입력값 업데이트
  const handleChange = (event) => {
    setSearchQuery(event.target.value);
    setKeyword(event.target.value);
  };

  // 엔터 키 입력 시 데이터 제출
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const val = event.target.value;
      setKeyword(val);
      // setSearchKeyword(val);
      // Enter 키를 누르면 데이터를 제출하거나 페이지를 이동
      console.log("Search Query:", searchQuery);
      
      // 검색어가 비어 있지 않으면 itemList 페이지로 이동
      if (searchQuery.trim() !== "") {
        router.push(`/itemSearchResult?query=${encodeURIComponent(searchQuery)}`);
} else {
        alert("검색어를 입력해주세요!"); // 검색어가 없을 경우 경고
      }
    }
  };

  // itemList 페이지로 이동하는 함수
  const goList = () => {
    router.push('/itemList'); // itemList 페이지로 이동
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className='searchPageContainer'>
        <div className="top_inner">
          {/* 로고 */}
          <h1>
            <a href="/" className="logo">
              <img
                src='/images/HJ_SAINT_KREAM_logo.png'
                alt='메인로고'
                width='166px'
                height='27px'
              />
            </a>
          </h1>
          <ul className="top_list">
            <li className="top_item">
              <a href="/">
                <img src="/images/HJ_close.png" className="close_button" />
              </a>
            </li>
          </ul>
        </div>
        <div className='searchPage_searchBarContainer'>
          <input
            type="text"
            className="searchPage_searchBar"
            value={searchQuery}
            onChange={handleChange} // 검색어 업데이트
            onKeyDown={handleKeyDown} // 엔터 키 감지
            placeholder="브랜드, 상품, 프로필, 태그 등" // 입력 전 안내 문구
          />
          <div className="recentSearchContainer">
            <p>최근 검색어</p>
            {/* DB 다녀오면서 후처리 해야함 */}
            <div className='recnt_button_container'>
              <ul>
                <li>
                  <button className='recnt_button' onClick={goList}>테스트 &times;</button>
                </li>
                <li>
                  <button className='recnt_button' onClick={goList}>테스트 &times;</button>
                </li>
                <li>
                  <button className='recnt_button' onClick={goList}>테스트 &times;</button>
                </li>
                <li>
                  <button className='recnt_button' onClick={goList}>테스트 &times;</button>
                </li>
                <li>
                  <button className='recnt_button' onClick={goList}>테스트 &times;</button>
                </li>
                
              </ul>
            </div>
          </div>
          <div className="recentSearchContainer">
            <p >인기기 검색어</p><p style={{fontSize:'14px', color:'gray', marginTop:'5px'}}>2024.12.13 12:00:00 기준</p>
            {/* DB 다녀오면서 후처리 해야함 */}
            <div className='search_rank_container'>
              <ul>
                <li >
                  테스트
                </li>
                <li>
                 테스트
                </li>
                <li>
                 테스트
                </li>
                <li>
                  테스트
                </li>
                <li>
                  테스트
                </li>
                <li>
                  테스트
                </li>
                <li>
                 테스트
                </li>
                <li>
                 테스트
                </li>
                <li>
                  테스트
                </li>
                <li>
                  테스트
                </li>
                <li >
                  테스트
                </li>
                <li>
                 테스트
                </li>
                <li>
                 테스트
                </li>
                <li>
                  테스트
                </li>
                <li>
                  테스트
                </li>
                <li>
                  테스트
                </li>
                <li>
                 테스트
                </li>
                <li>
                 테스트
                </li>
                <li>
                  테스트
                </li>
                <li>
                  테스트
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
