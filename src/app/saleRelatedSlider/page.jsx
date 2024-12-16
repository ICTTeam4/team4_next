import React, { useState } from 'react';
import './saleRelatedSlider.css'
import Link from 'next/link';

function page(props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = [
    { id: 1, title: '갤럭시 S20+ BTS 에디션', price: '150,000원', image: '/images/David_img_girl.jpg' },
    { id: 2, title: '갤럭시 S20+ 256GB', price: '240,000원', image: '/images/David_img_girl.jpg' },
    { id: 3, title: '대량 도매가 갤럭시 S20', price: '150,000원', image: '/images/David_img_girl.jpg' },
    { id: 4, title: '갤럭시 S20 256 블루 판매', price: '230,000원', image: '/images/David_img_girl.jpg' },
    { id: 5, title: '갤럭시 S20 상태 좋은 중고', price: '250,000원', image: '/images/David_img_girl.jpg' },
    { id: 6, title: '갤럭시 S20 상태 좋은 중고', price: '250,000원', image: '/images/David_img_girl.jpg' }
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  return (
    <div className='carousel'>
      <div
        className='itemsContainer'
        style={{ transform: `translateX(-${currentIndex * 300}px)` }}
      >
        {items.map((item) => (
          <div key={item.id} className='item'>
                <Link href="/salepage">
            <img src={item.image} alt={item.title} className='image' />
            <div className='info'>
              <h3>{item.title}</h3>
              <p>{item.price}</p>
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