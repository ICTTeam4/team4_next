'use client';
import React, { useEffect, useState } from 'react';
import './itemList.css';
import ItemCard from '../itemCard/page';
import FilterButtonsSection from '../filterButtonsSection/page';
import FilterSidebar from '../filterSidebar/page';
import VideoBanner from "../videoBanner/page";
import axios from 'axios';
import useAuthStore from "../../../store/authStore";

function Page(props) {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]); // 전체 데이터
  const [sortOption, setSortOption] = useState('latest'); // 최신순
  const [filteredList, setFilteredList] = useState([]); // 필터링된 데이터
  const [priceRange, setPriceRange] = useState(null); // 전체 데이터
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
      console.log("최근 본 !!!!API 응답 데이터:", response.data); // API 응답 전체 확인
      console.log("최근 본 !!!! API 응답 리스트 데이터:", response.data.data); // list 데이터 확인
  
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


  //영빈 최근 본 상품 구현
  useEffect(() => {
    if (!user?.member_id) {
      console.log("로그인 정보가 로드되지 않았습니다. 기다리는 중...");
      return;
    }
  
    console.log("로그인된 사용자:", user); // user가 올바르게 설정되었는지 확인
  }, [user]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const response = await axios.get("http://localhost:8080/api/auth", {
            headers: { Authorization: `Bearer ${token}` },
          });
          useAuthStore.setState({ user: response.data }); // user 상태 업데이트
          console.log("사용자 정보 로드 성공:", response.data);
        } catch (error) {
          console.error("사용자 정보 로드 실패:", error);
        }
      }
    };
  
    fetchUserData();
  }, []);


  const handleProductClick = async (item) => {
    if (!user || !user.member_id) {
      console.error("로그인된 사용자가 없습니다. member_id가 null입니다.");
      alert("로그인이 필요합니다.");
      return;
    }
    try {
      console.log("상품 클릭 - 최근 본 상품 추가 요청:", item);
      console.log("상품 클릭 - 최근 본 상품 추가 요청:", item);
      console.log("현재 user 정보:", user); // user가 제대로 전달되는지 확인
      console.log("현재 member_id:", user?.member_id); // member_id 상태 확인

      // 로컬스토리지에서 기존 최근 본 상품 가져오기
      const existingRecentViews = JSON.parse(localStorage.getItem("recentViews")) || [];
  
      // 중복 제거 후 새로운 상품 추가
      const updatedRecentViews = [
        item,
        ...existingRecentViews.filter((v) => v.pwr_id !== item.pwr_id),
      ].slice(0, 10);
  
      // 로컬스토리지 업데이트
      localStorage.setItem("recentViews", JSON.stringify(updatedRecentViews));
  
      // 백엔드에 API 호출
      // if (user?.member_id) {
      //   const response = await axios.post("http://localhost:8080/api/recent-view", {
      //     memberId: user.member_id,
      //     pwrId: item.pwr_id,
      //   });
      const response = await axios.post("http://localhost:8080/api/recent-view", {
        member_id: user.member_id,
        pwr_id: item.pwr_id,
  
      });
      console.log("최근 본 상품 저장 성공:", response.data);
    } catch (error) {
      console.error("상품 클릭 - 최근 본 상품 저장 중 오류 발생:", error);
    }
  };

  // 끝끝

  // 데이터 로드 (최초 실행)
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    // 초기 값은 원본 데이터
    let filteredVOs = list;

    // 상위 카테고리 필터링
    if (selectedCategories && selectedCategories.length > 0) {
      filteredVOs = filteredVOs.filter((vo) =>
        selectedCategories.includes(vo.sup_category)
      );
    }

    // 하위 카테고리 필터링
    if (selectedSmallCategories && selectedSmallCategories.length > 0) {
      filteredVOs = filteredVOs.filter((vo) =>
        selectedSmallCategories.includes(vo.sub_category)
      );
    }

    // 가격 범위 필터링
    if (priceRange && priceRange.length === 2) {
      filteredVOs = filteredVOs.filter(
        (vo) =>
          vo.sell_price >= priceRange[0] * 10000 &&
          vo.sell_price <= priceRange[1] * 10000
      );
    }

    // 필터링된 결과를 상태로 설정
    setFilteredList(filteredVOs);

    // 디버깅 로그
    console.log("Filtered List:", filteredVOs);
  }, [selectedCategories, selectedSmallCategories, list, priceRange]);

  const [sortedList, setSortedList] = useState([]);

  useEffect(() => {
    const sorted = [...filteredList].sort((a, b) => {
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
    setSortedList(sorted);
    console.log("SortedList", sortedList);
  }, [filteredList, sortOption]);

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
      <FilterButtonsSection toggleSidebar={toggleSidebar} setSortOption={setSortOption} />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-10px' }}>
        <div className='main_list_container'>
          {sortedList.length === 0 ? (
            <div style={{ textAlign: "center" }}>등록된 게시물이 없습니다.</div>
          ) : (
          //   sortedList.map((item) => <ItemCard key={item.pwr_id} data={item} />)
          // )}
          sortedList.map((item) => (
            
            <div key={item.pwr_id} onClick={() => handleProductClick(item)}>
              <ItemCard data={item} />
            </div>
          ))
        )}
        </div>
      </div>
    </>
  );
}

export default Page;
