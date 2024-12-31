'use client';
import React, { useState } from 'react';
import './searchPage.css';
import { useRouter } from 'next/navigation'; // useRouter 추가
import useAuthStore from '../../../store/authStore';
import axios from 'axios';

function Page(props) {
  const LOCAL_API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL
  const API_URL = `${LOCAL_API_BASE_URL}/searchItems`;
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter(); // useRouter 훅 사용
  const { setKeyword } = useAuthStore();

  // 검색어 입력값 업데이트
  const handleChange = (event) => {
    setSearchQuery(event.target.value);
    setKeyword(event.target.value);
  };


 // 검색 처리 함수
const handleSearch = async () => {
  if (searchQuery.trim() === "") {
    alert("검색어를 입력해주세요!");
    return;
  }

  try {
    const response = await axios.get(API_URL, {
      params: {
        keyword: searchQuery,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    // 검색 결과가 없는 경우
    if (response.data.items && response.data.items.length === 0) {
      router.push(`/itemSearchResult?query=${encodeURIComponent(searchQuery)}&status=empty`);
    } else {
      // 검색 결과가 있는 경우
      router.push(`/itemSearchResult?query=${encodeURIComponent(searchQuery)}&status=success`);
    }
  } catch (error) {
    console.error("검색 중 에러:", error);
    // 오류 상태로 이동
    router.push(`/itemSearchResult?query=${encodeURIComponent(searchQuery)}&status=error`);
  }
};

  
  // 엔터 키 입력 시 데이터 제출
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch(); // API 요청 후 페이지 이동 처리
    }
  };
  
  // itemList 페이지로 이동하는 함수
  const goList = () => {
    router.push('/itemList'); // itemList 페이지로 이동
  };

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
            <div className='recnt_button_container'>
              <ul>
                <li>
                  <button className='recnt_button' onClick={goList}>테스트 &times;</button>
                </li>
              </ul>
            </div>
          </div>
          <div className="recentSearchContainer">
            <p>인기 검색어</p>
            <p style={{ fontSize: '14px', color: 'gray', marginTop: '5px' }}>
              2024.12.13 12:00:00 기준
            </p>
            <div className='search_rank_container'>
              <ul>
                <li>테스트</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
