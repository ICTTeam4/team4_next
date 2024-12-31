'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import './itemSearchResult.css';
import ItemCard from '../itemCard/page';
import FilterButtonsSection from '../filterButtonsSection/page';
import FilterSidebar from '../filterSidebar/page';
import axios from 'axios';
import useAuthStore from '../../../store/authStore';

function Page() {
  const searchParams = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {setKeyword} = useAuthStore(); // Zustand에서 검색어 가져오기

  const query = searchParams.get('query') || '';
  const status = searchParams.get('status') || '';

  useEffect(() => {
    if (query && status === 'success') {
      setKeyword(query); // 검색어를 Zustand에 동기화
      fetchSearchResults(query);
    }
  }, [query, status]);

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  const fetchSearchResults = async (query) => {
    setLoading(true);
    setError(null);

    try {
        const response = await axios.get(`http://localhost:8080/searchItems/itemSearchResult`, {
            params: { keyword: query }, // keyword가 컨트롤러와 일치
        });

        console.log("응답 데이터:", response.data);

        if (response.data.status === 'success') {
            setSearchResults(response.data.items || []);
        } else if (response.data.status === 'empty') {
            console.log('검색 결과 없음');
            setSearchResults([]);
        } else {
            console.error('알 수 없는 상태:', response.data);
            setError('서버에서 알 수 없는 응답이 반환되었습니다.');
        }
    } catch (err) {
        console.error("검색 오류:", err.response?.status, err.response?.data || err.message);
        setError('검색 결과를 가져오는 중 문제가 발생했습니다.');
    } finally {
        setLoading(false);
    }
};

  return (
    <div>
      <FilterSidebar isActive={isSidebarActive} toggleSidebar={toggleSidebar} />
      <FilterButtonsSection toggleSidebar={toggleSidebar} />
      <h3 style={{ textAlign: 'center', color: 'lightgray' }}>
        검색 결과 : "{query}"
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
    </div>
  );
}

export default Page;
