'use client';
import React, { useEffect, useState } from 'react';
import './shoesList.css';
import ItemCard from '../itemCard/page';
import FilterButtonsSection from '../filterButtonsSection/page';
import FilterSidebar from '../filterSidebar/page';
import MidCategoryBanner from "../midCategoryBanner/page";
import axios from 'axios';
import useAuthStore from '../../../store/authStore';
import { useSearchParams } from 'next/navigation';

function Page(props) {
  const searchParams = useSearchParams();
  const LOCAL_API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL
  const API_URL = `${LOCAL_API_BASE_URL}/searchItems/shoesList`; // OuterList API 엔드포인트
  const { searchKeyword, category, searchBarActive } = useAuthStore(); // Zustand에서 검색 상태 가져오기
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
 

  const query = searchParams.get('query') || '';

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      // 현재 카테고리가 "shoesList"인지 확인
      if (!searchKeyword || category !== "신발") 

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(API_URL , {
          params: {
            keyword: searchKeyword,
            category: category, // shoesList 고정 카테고리
          },
        });
        console.log("주소 확인 :", API_URL);
        console.log("검색 결과:", response.data);
        setSearchResults(response.data.items || []);
      } catch (err) {
        console.error("검색 오류:", err.response || err.message);
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchKeyword, category]);


  return (
    <>
    <MidCategoryBanner category="shoesList"/>
    <FilterSidebar isActive={isSidebarActive} toggleSidebar={toggleSidebar}/>
    <FilterButtonsSection toggleSidebar={toggleSidebar}/>
    {searchBarActive == true && <h3 style={{ textAlign: 'center', color: 'lightgray' }}>
        '신발' 내 검색 결과 : "{query}"
      </h3>}
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