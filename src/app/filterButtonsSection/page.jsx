import React from 'react';
import './filterButtonsSection.css';


function Page({toggleSidebar}) {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className='filter_buttons_container'>
          <button className='filter-button' onClick={toggleSidebar}>카테고리</button>
          <button className='filter-button' onClick={toggleSidebar}>사이즈</button>
          <button className='filter-button' onClick={toggleSidebar}>가격대</button>
          <span style={{ margin: '0 20px 0px 20px', color: 'lightgray' }}>|</span>
          <button className='filter-button'>최신순</button>
          <button className='filter-button'>인기순</button>
          <button className='filter-button'>낮은 금액순</button>
          <button className='filter-button'>높은 금액순</button>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <label className="custom-checkbox" style={{ alignItems: 'center', pointerEvents: 'none' }} >
          <input type='checkbox' name='' style={{ pointerEvents: 'auto' }}/> 
          <span className='checkbox_span' style={{ pointerEvents: 'auto' }}>판매 완료 상품 포함</span>
        </label>
      </div>
    </>
  );
}

export default Page;