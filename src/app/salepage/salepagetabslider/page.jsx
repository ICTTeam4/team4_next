"use client";
import React, { useEffect, useState } from 'react';
import './salepagetabslider.css'
import Link from 'next/link';
import axios from 'axios';

function page({ id, status }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [list, setList] = useState([]);

  // 판매 리스트 출력
  useEffect(() => {
    console.log(">>> useEffect 실행됨");
    const getListData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/salepage/gettabdata?id=${id}`); // API 호출
        const data = response.data.data;

        // 상태에 따라 데이터 필터링
        const filteredData = status !== "판매완료" && status !== "판매중"
          ? data // "전체"일 경우 모든 데이터를 표시
          : data.filter((item) => item.status === status);
        setList(filteredData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    getListData();
  }, [id, status]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % list.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + list.length) % list.length);
  };

  const calculateDaysAgo = (createdAt) => {
    const today = new Date();
    const createdDate = new Date(createdAt);
    const diffTime = today - createdDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "오늘";
    if (diffDays === 1) return "어제";
    return `${diffDays}일 전`;
  };

  return (
    <div className='carousel'>
      <div
        className='itemsContainer'
        style={{ transform: `translateX(-${currentIndex * 228}px)` }}
      >
        {list.map((item) => (
          <div key={item.pwr_id} className='item'>
            <Link href={{
              pathname: "/saleDetail",
              query: { id: item.pwr_id },
            }}>
              <img src={`http://localhost:8080/images/${item.fileList[0]?.fileName}`} alt={item.title} className='image' />
              <div className='info'>
                <h4>{item.title.length > 10 ? `${item.title.slice(0, 10)}...` : item.title}</h4>
                <p>{item.sell_price} 원</p>
                <p>{calculateDaysAgo(item.created_at)}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <button className='prevBtn' onClick={handlePrev}>
        &lt;
      </button>
      <button className='nextBtn' onClick={handleNext}>
        &gt;
      </button>
    </div>
  );
}

export default page;
