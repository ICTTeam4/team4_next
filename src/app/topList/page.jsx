'use client';
import React, { useEffect, useState } from 'react';
import './topList.css';
import ItemCard from '../itemCard/page';
import FilterButtonsSection from '../filterButtonsSection/page';
import FilterSidebar from '../filterSidebar/page';
import MidCategoryBanner from "../midCategoryBanner/page";
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

function Page(props) {
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const searchParams = useSearchParams();

  const query = searchParams.get('query') || ''; // 검색어 가져오기
  const category = "Top"; // 현재 페이지의 카테고리 지정

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  // 서버에서 검색 결과 가져오기
  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true); // 로딩 시작
      setError(null); // 기존 에러 초기화
      try {
        const response = await axios.get(`/topList`, {
          params: {
            keyword: query,
          },
        });

        if (response.data.status === 'success') {
          setSearchResults(response.data.items || []); // 검색 결과 저장
        } else if (response.data.status === 'empty') {
          setSearchResults([]); // 검색 결과 없음
        } else {
          throw new Error(response.data.message || '알 수 없는 오류 발생');
        }
      } catch (err) {
        setError(err.message); // 에러 메시지 저장
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    if (query) {
      fetchSearchResults();
    } else {
      setSearchResults([]); // 검색어가 없을 경우 결과 초기화
    }
  }, [query]);

  return (
    <>
      <MidCategoryBanner category="topList" />
      <FilterSidebar isActive={isSidebarActive} toggleSidebar={toggleSidebar} />
      <FilterButtonsSection toggleSidebar={toggleSidebar} />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-10px' }}>
        <div className="main_list_container">
          {/* 로딩 상태 */}
          {loading && <p>로딩 중입니다...</p>}
          {/* 에러 상태 */}
          {error && <p style={{ color: 'red' }}>에러 발생: {error}</p>}
          {/* 검색 결과 표시 */}
          {!loading && !error && searchResults.length > 0 ? (
            searchResults.map((item, index) => (
              <ItemCard key={index} item={item} />
            ))
          ) : (
            !loading &&
            !error && <p>검색 결과가 없습니다. 다른 키워드를 입력해보세요.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Page;
