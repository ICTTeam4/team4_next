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
  }, [searchParams]);

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
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
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
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
