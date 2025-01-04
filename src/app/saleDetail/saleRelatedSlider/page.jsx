"use client";
import React, { useEffect, useState } from 'react';
import './saleRelatedSlider.css'
import Link from 'next/link';
import axios from 'axios';

function page(props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [list, setList] = useState([]);

    // 3. 하단에 판매 리스트 출력 서버
    useEffect(() => {
      console.log(">>> useEffect 실행됨");
    const getListData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/salespost/getsaledetail`); // axios를 활용한 API 호출
        console.log(response);
        const data = response.data.data;
        setList(data); // 원본 데이터 저장
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    getListData();
  
    }, []);

  // const items = [
  //   { id: 1, title: '갤럭시 S20+ BTS 에디션', price: '150,000원', image: '/images/David_img_girl.jpg' },
  //   { id: 2, title: '갤럭시 S20+ 256GB', price: '240,000원', image: '/images/David_img_girl.jpg' },
  //   { id: 3, title: '대량 도매가 갤럭시 S20', price: '150,000원', image: '/images/David_img_girl.jpg' },
  //   { id: 4, title: '갤럭시 S20 256 블루 판매', price: '230,000원', image: '/images/David_img_girl.jpg' },
  //   { id: 5, title: '갤럭시 S20 상태 좋은 중고', price: '250,000원', image: '/images/David_img_girl.jpg' },
  //   { id: 6, title: '갤럭시 S20 상태 좋은 중고', price: '250,000원', image: '/images/David_img_girl.jpg' }
  // ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % list.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + list.length) % list.length);
  };

  return (
    <div className='carousel'>
      <div
        className='itemsContainer'
        style={{ transform: `translateX(-${currentIndex * 228}px)` }}
      >
        {list.map((item) => (
          <div key={item.pwr_id} className='item'>
                <Link href="/saleDetail">
            <img src={`http://localhost:8080/images/${item.fileList[0]?.fileName}`} alt={item.title} className='image' />
            <div className='info'>
              <h3>{item.title}</h3>
              <p>{item.sell_price}</p>
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