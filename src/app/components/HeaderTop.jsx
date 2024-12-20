import Link from 'next/link';
import React, { useState } from 'react';
import './css/HeaderTop.css';
import useAuthStore from '../../../store/authStore';

function HeaderTop(props) {
  const {resetKeyword, isNotibarActive, setIsNotibarActive} = useAuthStore();
  const toggleNotibar = () => {
    setIsNotibarActive(isNotibarActive);
  }
  
  return (
    
    <div className="max_width_container">
    <div className="header_top">
      <div className="top_inner">
        {/* 로고 */}
        <h1>
          <Link href="/" aria-label="홈" className="logo" scroll={true} onClick={resetKeyword}>
            <img
            src='/images/HJ_SAINT_KREAM_logo.png'
            alt='메인로고'
            width='166px'
            height='27px'
            />
          </Link>
        </h1>
        <ul className="top_list">
          <li className="top_item">
            <Link href="/support" className="top_link">
              고객센터
            </Link>
          </li>
          
          <li className="top_item">
            <Link href="/myPageWishList" className="top_link">
              관심
            </Link>
          </li>
          <li className="top_item">
            <button className="top_link go_noti_btn" onClick={toggleNotibar}>
              알림
            </button>
          </li>
          {/* isLoginChk 로 활성 비활성 설정해야함 */}
          <li className="top_item">
            <Link href="/login" className="top_link">
              로그인
            </Link>
          </li>
          <li className="top_item">
            <Link href="/logout" className="top_link">
              로그아웃
            </Link>
          </li>
          <div style={{width:'10px'}}></div>
        </ul>
      </div>
    </div>
    </div>
  );
}

export default HeaderTop;