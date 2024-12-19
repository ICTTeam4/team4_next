'use client';
import React, { useState } from 'react';
import styles from './notifications.module.css'
import './notifications.css';

const Page = ({ }) => {

  return (
    <div>
      {/* 레이어 배경 */}
      <div className={styles.layerBackground}></div>

      {/* 필터 섹션 */}
      <div className={styles.shopFilterSections}>
        <div className={styles.filterContent} style={{ paddingBottom: '5px' }}>
          <div className="title_container">
            <a href="/">
              <img src="/images/HJ_close.png" className="close_button" />
            </a>
            <div className="title">
              <h2><p>알림</p></h2>
            </div>
          </div>
        </div>
        <div className="filter_section">
          <div className="section_top">
            
          </div>
          {/* 카테고리 내용 (전체 선택 버튼과 카테고리 목록) */}
          <hr style={{ boder: '1px', height: '1px', backgroundColor: 'rgba(0,0,0,0.1)', margin: '0px' }} />
          <div>
            {/* 카테고리 버튼 */}
            <ul className="big_category_container">
              <li className="big_category">
                <button className='noti_button'>전체</button>
                <button className='noti_button'>거래</button>
                <button className='noti_button'>관심</button>
                <button className='noti_button'>판매</button>
              </li>
            </ul>
          </div>
          <div className={styles.filterContent}>
            <div className="title_container" style={{ height: '20px' }}>
              <div className="section_top">
                <p style={{ marginLeft: '-23px' }}>지난 알림</p>
              </div>
            </div>
          </div>
          <div className="noti_section">
            <div className="section_top">
              <div className='noti_one_block'>
                <table>
                  <tr><td></td><td>제목이 들어갑니다</td><td></td></tr>
                  <tr>
                    <td><img src='/images/HJ_notice_img.png' /></td>
                    <td style={{ width: '180px' }}>내용이 들어갑니다</td>
                    <td style={{ width: '90px' }}><img src='/images/HJ_car1.png' /></td>
                  </tr>
                  <tr></tr>
                  <tr></tr>
                  <tr><td></td><td>2시간 전</td><td></td></tr>
                </table>
              </div>
          <hr style={{ boder: '1px', height: '1px', backgroundColor: 'rgba(0,0,0,0.1)', margin: '0px' }} />
            </div>
          </div>
          <div className="noti_section">
            <div className="section_top">
              <div className='noti_one_block'>
                <table>
                  <tr><td></td><td>제목이 들어갑니다</td><td></td></tr>
                  <tr>
                    <td><img src='/images/HJ_notice_img.png'/></td>
                    <td style={{ width: '180px' }}>내용이 들어갑니다</td>
                    <td style={{ width: '90px' }}><img src='/images/HJ_car1.png' /></td>
                  </tr>
                  <tr></tr>
                  <tr></tr>
                  <tr><td></td><td>2시간 전</td><td></td></tr>
                </table>
              </div>
          <hr style={{ boder: '1px', height: '1px', backgroundColor: 'rgba(0,0,0,0.1)', margin: '0px' }} />
            </div>
          </div>
          <div className="noti_section">
            <div className="section_top">
              <div className='noti_one_block'>
                <table>
                  <tr><td></td><td>제목이 들어갑니다</td><td></td></tr>
                  <tr>
                    <td><img src='/images/HJ_notice_img.png' /></td>
                    <td style={{ width: '180px' }}>내용이 들어갑니다</td>
                    <td style={{ width: '90px' }}><img src='/images/HJ_car1.png' /></td>
                  </tr>
                  <tr></tr>
                  <tr></tr>
                  <tr><td></td><td>2시간 전</td><td></td></tr>
                </table>
              </div>
          <hr style={{ boder: '1px', height: '1px', backgroundColor: 'rgba(0,0,0,0.1)', margin: '0px' }} />
            </div>
          </div>
          <div className="noti_section">
            <div className="section_top">
              <div className='noti_one_block'>
                <table>
                  <tr><td></td><td>제목이 들어갑니다</td><td></td></tr>
                  <tr>
                    <td><img src='/images/HJ_notice_img.png' /></td>
                    <td style={{ width: '180px' }}>내용이 들어갑니다</td>
                    <td style={{ width: '90px' }}><img src='/images/HJ_car1.png' /></td>
                  </tr>
                  <tr></tr>
                  <tr></tr>
                  <tr><td></td><td>2시간 전</td><td></td></tr>
                </table>
              </div>
          <hr style={{ boder: '1px', height: '1px', backgroundColor: 'rgba(0,0,0,0.1)', margin: '0px' }} />
            </div>
          </div>
          <div className="noti_section">
            <div className="section_top">
              <div className='noti_one_block'>
                <table>
                  <tr><td></td><td>제목이 들어갑니다</td><td></td></tr>
                  <tr>
                    <td><img src='/images/HJ_notice_img.png' /></td>
                    <td style={{ width: '180px' }}>내용이 들어갑니다</td>
                    <td style={{ width: '90px' }}><img src='/images/HJ_car1.png' /></td>
                  </tr>
                  <tr></tr>
                  <tr></tr>
                  <tr><td></td><td>2시간 전</td><td></td></tr>
                </table>
              </div>
          <hr style={{ boder: '1px', height: '1px', backgroundColor: 'rgba(0,0,0,0.1)', margin: '0px' }} />
            </div>
          </div>
          <div className="noti_section">
            <div className="section_top">
              <div className='noti_one_block'>
                <table>
                  <tr><td></td><td>제목이 들어갑니다</td><td></td></tr>
                  <tr>
                    <td><img src='/images/HJ_notice_img.png' /></td>
                    <td style={{ width: '180px' }}>내용이 들어갑니다</td>
                    <td style={{ width: '90px' }}><img src='/images/HJ_car1.png' /></td>
                  </tr>
                  <tr></tr>
                  <tr></tr>
                  <tr><td></td><td>2시간 전</td><td></td></tr>
                </table>
              </div>
            </div>
        <hr style={{ boder: '1px', height: '1px', backgroundColor: 'rgba(0,0,0,0.1)'}} />
          </div>
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Page;