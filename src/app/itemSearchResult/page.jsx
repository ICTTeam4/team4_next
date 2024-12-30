'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import './itemSearchResult.css';
import ItemCard from '../itemCard/page';
import FilterButtonsSection from '../filterButtonsSection/page';
import FilterSidebar from '../filterSidebar/page';
import axios from 'axios';

function Page() {
  const searchParams = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = searchParams.get('query') || '';
  const status = searchParams.get('status') || '';

  useEffect(() => {
    if (status === 'success') {
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
      const response = await axios.get(`/searchItems`, {
        params: { keyword: query },
      });

      setSearchResults(response.data.items || []);
    } catch (err) {
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
        {status === 'empty' && ` 에 대한 검색결과가 존재하지 않습니다.`}
      </h3>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-10px' }}>
        <div className="main_list_container">
          {loading && <p>로딩 중입니다...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!loading && !error && searchResults.length > 0 ? (
            searchResults.map((data, index) => <ItemCard key={index} data={data} />)
          ) : (
            !loading && !error && <p>검색 결과가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
