'use client';
import styles from './filterSidebar.module.css'; // CSS 파일을 따로 분리할 수 있음
import './filterSidebar.css';
import { useState } from 'react';
import FilterSidebarSecondSection from './filterSidebarSecondSection/page';
import FilterActionButtonContainer from './filterActionButtonContainer/page';
import FilterPrice from './filterPrice/page';


const Page = ({ isActive, toggleSidebar }) => {
  const categories = ['아우터', '상의', '하의', '신발', '가방', '패션 소품'];
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false); // 카테고리 숨김 상태

  // 카테고리 선택 핸들러
  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category) // 선택 해제
        : [...prev, category] // 선택 추가
    );
  };

  // 전체 선택 핸들러
  const selectAll = () => {
    setSelectedCategories(categories);
  };

  // 선택 해제 핸들러
  const clearSelection = () => {
    setSelectedCategories([]);
  };

  // 플러스/마이너스 버튼 토글 핸들러
  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  // 초기화 핸들러: 모든 선택 해제
  const resetFilter = () => {
    clearSelection(); // 선택된 카테고리 초기화
  };
  

  return (
    <div>
      {/* 레이어 배경 */}
      {isActive && <div onClick={toggleSidebar} className={styles.layerBackground}></div>}

      {/* 필터 섹션 */}
      <div className={`${styles.shopFilterSections} ${isActive ? styles.active : ''}`}>
        <div className={styles.filterContent}>
          <div className="title_container">
            <button className='exit_sidebar_btn' onClick={toggleSidebar}>
              <img src="/images/HJ_close.png" className="close_button" />
            </button>
            <div className="title">
              <h2><p>필터</p></h2>
            </div>
          </div>
        </div>
        <div className="filter_section">
          <div className="section_top">
            <p>카테고리</p>
            <a onClick={toggleCollapse}>
              <img
                src={isCollapsed ? '/images/HJ_minus.png' : '/images/HJ_plus.png'}
                className={isCollapsed ? 'minus_button' : 'plus_button'}
                alt={isCollapsed ? '접기' : '펼치기'}
              />
            </a>
          </div>
          {/* 카테고리 내용 (전체 선택 버튼과 카테고리 목록) */}
          <div
            className={`category-list ${isCollapsed ? 'collapsed' : ''}`}
            style={{
              overflow: 'hidden',
              transition: 'height 0.5s ease, opacity 0.5s ease',
              height: isCollapsed ? '0' : 'auto',  // 카테고리가 숨겨질 때 높이를 0으로 설정
              opacity: isCollapsed ? '0' : '1',    // 숨겨질 때 투명도 0
            }}
          >
            {/* 전체 선택 및 선택 해제 버튼 */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 16px' }}>
              <button
                onClick={() => {
                  if (selectedCategories.length === categories.length) {
                    clearSelection(); // 선택 해제
                  } else {
                    selectAll(); // 전체 선택
                  }
                }}
                className="category_button_sub"
              >
                {selectedCategories.length === categories.length ? '선택 해제' : '전체 선택'}
              </button>
            </div>
            {/* 카테고리 버튼 */}
            <ul className="big_category_container">
              {categories.map((category) => (
                <li className="big_category" key={category}>
                  <button
                    className={`category_button ${selectedCategories.includes(category) ? 'active' : ''}`}
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      <FilterSidebarSecondSection resetFilter={resetFilter}/>
      <FilterPrice resetFilter={resetFilter}/>
      <FilterActionButtonContainer resetFilter={resetFilter}/>
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
