'use client';
import React, { useState, useEffect } from 'react';
import styles from './notifications.module.css';
import './notifications.css';

const Page = ({ isActive, toggleNoticeSidebar }) => {

  return (
    <div>
      {/* 레이어 배경 */}
      {isActive && <div onClick={toggleNoticeSidebar} className={styles.notiLayerBackground}></div>}

      {/* 필터 섹션 */}
      <div className={`${styles.shopNotiSections} ${isActive ? styles.active : ''}`}>
        <div className={styles.notiContent} style={{ paddingBottom: '5px' }}>
          <div className="noti_title_container">
            <a href="/">
              <img src="/images/HJ_close.png" className="noti_close_button" />
            </a>
            <div className="noti_title">
              <h2><p>알림</p></h2>
            </div>
          </div>
        </div>
        <div className="noti_filter_section">
          <div className="noti_section_top"></div>
          <hr style={{ border: '1px', height: '1px', backgroundColor: 'rgba(0,0,0,0.1)', margin: '0px' }} />
          <div>
            {/* 카테고리 버튼 */}
            <ul className="noti_big_category_container">
              <li className="noti_big_category">
                <button className='noti_button'>전체</button>
                <button className='noti_button'>거래</button>
                <button className='noti_button'>관심</button>
                <button className='noti_button'>판매</button>
              </li>
            </ul>
          </div>
          <div className={styles.filterContent}>
            <div className="noti_title_container" style={{ height: '20px' }}>
              <div className="noti_section_top">
                <p>지난 알림</p>
              </div>
            </div>
          </div>
          {/* 알림 카드 시작 */}
          <div className="noti_section">
            <div className="noti_section_top">
              <div className='noti_one_block'>
                <table>
                  <tbody>
                    <tr><th></th><th></th><th></th></tr>
                    <tr><td></td><td>제목이 들어갑니다</td><td></td></tr>
                    <tr>
                      <td><img src='/images/HJ_notice_img.png' /></td>
                      <td style={{ width: '180px' }}>내용이 들어갑니다</td>
                      <td style={{ width: '90px' }}><img src='/images/HJ_car1.jpg' /></td>
                    </tr>
                    <tr><td></td><td>2시간 전</td><td></td></tr>
                  </tbody>
                </table>
              </div>
              <hr style={{ border: '1px', height: '1px', backgroundColor: 'rgba(0,0,0,0.1)', margin: '0px' }} />
            </div>
          </div>
          {/* 알림 카드 끝 */}
        </div>
      </div>
    </div>
  );
};

export default Page;
