import Link from 'next/link';
import React from 'react';
import './css/HeaderTop.css';
import useAuthStore from '../../../store/authStore';

function HeaderTop({toggleSidebar}) {
  const {resetKeyword} = useAuthStore();
  return (
    
    <div className="max_width_container">
    <div className="header_top">
      <div className="top_inner">
        {/* 로고 */}
        <h1>
          <Link href="/" aria-label="홈" className="logo" onClick={resetKeyword}>
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
            <Link href="/notice" className="top_link">
              고객센터
            </Link>
          </li>
          
          <li className="top_item">
            <Link href="/saved" className="top_link">
              관심
            </Link>
          </li>
          <li className="top_item">
            <Link href="/notifications" className="top_link" onClick={toggleSidebar}>
              알림
            </Link>
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