'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import './itemSearchResult.css';
import ItemCard from '../itemCard/page';
import FilterButtonsSection from '../filterButtonsSection/page';
import FilterSidebar from '../filterSidebar/page';
import useAuthStore from '../../../store/authStore';

function Page() {
  const {searchKeyword, resetKeyword, setKeyword } = useAuthStore();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  useEffect(() => {
    const query = searchParams.get('query') || '';
    setSearchQuery(query);
    fetchSearchResults(query);  // 페이지가 렌더링될 때마다 검색 결과를 가져옴
  }, [searchParams]);

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

    // 검색 결과를 가져오는 함수
    const fetchSearchResults = async (query) => {
      if (query) {
        try {
          // 요청 URL을 로그에 찍어 확인
          console.log("요청 URL:", `/api/searchItems?keyword=${encodeURIComponent(query)}`);
          const response = await fetch(`/api/searchItems?keyword=${encodeURIComponent(query)}`);
          const data = await response.json();
          setSearchResults(data); // 서버에서 받은 검색 결과를 상태에 저장
        } catch (error) {
          console.error("검색 오류:", error);
        }
      }
    };

  return (
    <div>
        
      <FilterSidebar isActive={isSidebarActive} toggleSidebar={toggleSidebar} />
      <FilterButtonsSection toggleSidebar={toggleSidebar} />
          <h3 style={{ textAlign: 'center', color:'lightgray'}}>검색 결과 : {searchKeyword}</h3>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-10px' }}>
        <div className='main_list_container'>
          {/* 검색 결과가 없을 때와 있을 때 분기 처리 */}
          {searchQuery ? (
            <>
              {/* 
              여기에 검색 결과에 해당하는 <ItemCard query={searchQuery}/> 들이 나와야함
              */}
            </>
          ) : (
            <p style={{ textAlign: 'center' }}>검색어가 없습니다. 다시 입력해 주세요.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
