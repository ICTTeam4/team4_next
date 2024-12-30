'use client';
import React, { useEffect, useState } from 'react';
import './itemList.css';
import ItemCard from '../itemCard/page';
import FilterButtonsSection from '../filterButtonsSection/page';
import FilterSidebar from '../filterSidebar/page';
import VideoBanner from "../videoBanner/page";
import Notifications from "../notifications/page";
import axios from 'axios';

function Page(props) {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [sortOption, setSortOption] = useState('latest');
  const API_URL = `http://localhost:8080/api/salespost/itemlist`;
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  // const [isNotibarActive, setIsNotibarActive] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  }

  const getData = async () => {
    try {
      setLoading(true); // 로딩 상태 시작
      const response = await axios.get(API_URL); // axios를 활용한 API 호출
      console.log(response);
      const data = response.data.data;
      setList(data);
      console.log(data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };

  // 최초 한 번만 실행
  useEffect(() => {
    getData();
  }, [API_URL]);
  // 로딩 중 화면
  if (loading) {
    return <div style={{ textAlign: "center", padding: "20px" }}>Loading...</div>;
  }
  // // 에러 발생 시 화면
  // if (error) {
  //   return <div style={{ textAlign: "center", padding: "20px", color: "red" }}>Error: {error}</div>;
  // }

  // 정렬 로직
  const sortedList = [...list].sort((a, b) => {
    if (sortOption === 'latest') {
      return new Date(b.created_at) - new Date(a.created_at);
    }
    if (sortOption === 'popular') {
      return (b.view_count || 0) - (a.view_count || 0);
    }
    if (sortOption === 'lowPrice') {
      return (a.sell_price || 0) - (b.sell_price || 0);
    }
    if (sortOption === 'highPrice') {
      return (b.sell_price || 0) - (a.sell_price || 0);
    }
  });

  return (
    <>
      {/* <Notifications /> */}
      <VideoBanner />
      <FilterSidebar isActive={isSidebarActive} toggleSidebar={toggleSidebar} />
      <FilterButtonsSection setSortOption={setSortOption} />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-10px' }}>
        <div className='main_list_container'>
          {sortedList.length === 0 ?(
            <div style={{textAlign: "center"}}>등록된 게시물이 없습니다.</div>
          ) : (
             sortedList.map((item)=>(<ItemCard key={item.pwr_id} data={item}/>))
          )}
        </div>
      </div>
    </>
  );
}

export default Page;