'use client';
import React, { useEffect, useState } from 'react';
import './accessoriesList.css';
import ItemCard from '../itemCard/page';
import FilterButtonsSection from '../filterButtonsSection/page';
import FilterSidebar from '../filterSidebar/page';
import MidCategoryBanner from "../midCategoryBanner/page";
import axios from 'axios';
import useAuthStore from '../../../store/authStore';
import { useSearchParams } from 'next/navigation';

function Page() {
  const searchParams = useSearchParams();
  const LOCAL_API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL;
  const API_URL = `${LOCAL_API_BASE_URL}/api/searchItems/accessoriesList`; // accessoriesList API 엔드포인트
  const { setKeyword } = useAuthStore(); // Zustand에서 검색 상태 관리
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = searchParams.get('query') || '';

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  const fetchSearchResults = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(API_URL, {
        params: {
          keyword: query,
          category: '패션잡화', // accessoriesList 고정 카테고리
        },
      });

      console.log("API 요청 파라미터:", { keyword: query, category: "패션잡화" });
      console.log("API 응답 데이터:", response.data);

      if (response.data.success) {
        const items = response.data.data || [];
        const processedItems = items.map((item) => ({
          ...item,
          fileList: Array.isArray(item.fileList) ? item.fileList : [], // 안전하게 fileList 처리
        }));
        setSearchResults(processedItems);
      } else {
        console.error("API 실패:", response.data.message);
        setError(response.data.message || "검색 결과가 없습니다.");
      }
    } catch (err) {
      console.error("검색 오류:", err.response?.status, err.response?.data || err.message);
      setError("검색 결과를 가져오는 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      setKeyword(query); // 검색어를 Zustand에 동기화
      fetchSearchResults();
    }
  }, [query]);

  return (
    <>
      <MidCategoryBanner category="accessoriesList" />
      <FilterSidebar isActive={isSidebarActive} toggleSidebar={toggleSidebar} />
      <FilterButtonsSection toggleSidebar={toggleSidebar} />
      <h3 style={{ textAlign: 'center', color: 'lightgray' }}>
        '패션잡화' 내 검색 결과 : "{query}"
      </h3>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-10px' }}>
        <div className="main_list_container">
          {loading && <p>로딩 중입니다...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!loading && searchResults.length > 0 ? (
            searchResults.map((data, index) => <ItemCard key={index} data={data} />)
          ) : (
            !loading &&
            !error && (
              <p style={{ textAlign: 'center', color: 'gray' }}>
                검색 결과가 없습니다.
              </p>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default Page;
