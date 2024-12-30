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
  }, []);
  // 로딩 중 화면
  if (loading) {
    return <div style={{ textAlign: "center", padding: "20px" }}>Loading...</div>;
  }
  // // 에러 발생 시 화면
  // if (error) {
  //   return <div style={{ textAlign: "center", padding: "20px", color: "red" }}>Error: {error}</div>;
  // }

  return (
    <>
      {/* <Notifications /> */}
      <VideoBanner />
      <FilterSidebar isActive={isSidebarActive} toggleSidebar={toggleSidebar} />
      <FilterButtonsSection toggleSidebar={toggleSidebar} />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-10px' }}>
        <div className='main_list_container'>
          {
            list.length === 0 ? <div style={{textAlign: "center"}}>등록된 게시물이 없습니다.</div>
            : list.map((item)=>(<ItemCard data={item}/>))
          }
        </div>
      </div>
    </>
  );
}

export default Page;