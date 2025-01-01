'use client';
import React, { useEffect, useState } from 'react';
import './itemList.css';
import ItemCard from '../itemCard/page';
import FilterButtonsSection from '../filterButtonsSection/page';
import FilterSidebar from '../filterSidebar/page';
import VideoBanner from "../videoBanner/page";
import axios from 'axios';

function Page(props) {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]); // 전체 데이터
  const [priceRange, setPriceRange] = useState(null); // 전체 데이터
  const [filteredList, setFilteredList] = useState([]); // 필터링된 데이터
  const [selectedCategories, setSelectedCategories] = useState(null); // 선택된 카테고리
  const [selectedSmallCategories, setSelectedSmallCategories] = useState(null); // 선택된 카테고리
  const API_URL = `http://localhost:8080/api/salespost/itemlist`;
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  const getData = async () => {
    try {
      setLoading(true); // 로딩 상태 시작
      const response = await axios.get(API_URL); // axios를 활용한 API 호출
      console.log(response);
      const data = response.data.data;
      setList(data); // 원본 데이터 저장
      setFilteredList(data); // 초기 필터링 데이터 설정
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };

  const getCategoriesFromFilter = (categories) => {
    setSelectedCategories(categories); // 선택된 카테고리 업데이트
  };
  const getSmallCategoriesFromFilter = (categories) => {
    setSelectedSmallCategories(categories); // 선택된 카테고리 업데이트
  };

  // 데이터 로드 (최초 실행)
  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //  console.log("최상위 pricerange" + priceRange);
  // }, [priceRange]);

  // 선택된 카테고리에 따라 필터링
  useEffect(() => {
    if (selectedCategories) {
      var filteredVOs = list.filter((vo) =>
        selectedCategories.includes(vo.sup_category)
      );
      setFilteredList(filteredVOs); // 필터링된 데이터 업데이트

      if (selectedSmallCategories) {
        filteredVOs = filteredVOs.filter((vo) =>
          selectedSmallCategories.includes(vo.sub_category)
        );
        setFilteredList(filteredVOs); // 필터링된 데이터 업데이트
      }

    } else {
      setFilteredList(list); // 선택된 카테고리가 없으면 전체 데이터
    }
    if (priceRange) {
      var filteredVOs = filteredList.filter((vo) => (vo.sell_price >= priceRange[0]) && (vo.sell_price <= priceRange[1])
        
      );
      setFilteredList(filteredVOs); 
    }
  }, [selectedCategories, list,priceRange]);

  // 로딩 중 화면
  if (loading) {
    return <div style={{ textAlign: "center", padding: "20px" }}>Loading...</div>;
  }

  return (
    <>
      <VideoBanner />
      <FilterSidebar
        isActive={isSidebarActive}
        toggleSidebar={toggleSidebar}
        getSelectedCategories={getCategoriesFromFilter}
        getSelectedSmallCategories={getSmallCategoriesFromFilter}
        getPriceRange={setPriceRange}
      />
      <FilterButtonsSection toggleSidebar={toggleSidebar} />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-10px' }}>
        <div className='main_list_container'>
          {filteredList.length === 0 ? (
            <div style={{ textAlign: "center" }}>등록된 게시물이 없습니다.</div>
          ) : (
            filteredList.map((item) => <ItemCard key={item.id} data={item} />)
          )}
        </div>
      </div>
    </>
  );
}

export default Page;
