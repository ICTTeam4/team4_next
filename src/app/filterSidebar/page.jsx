'use client';
import styles from './filterSidebar.module.css'; // CSS 파일을 따로 분리할 수 있음
import './filterSidebar.css';
import { useState } from 'react';
import FilterSidebarSecondSection from './filterSidebarSecondSection/page';
import FilterActionButtonContainer from './filterActionButtonContainer/page';
import FilterPrice from './filterPrice/page';
// import { useRouter } from 'next/router';

const Page = ({ isActive, toggleSidebar, getSelectedCategories,getSelectedSmallCategories,getPriceRange }) => {
  // const router = useRouter();
  const categories = ['아우터', '상의', '하의', '신발', '가방', '패션 소품'];
  const categoryMapping = {
    '아우터': ['패딩', '코트', '바람막이', '자켓', '가디건', '블루종', '조끼', '아노락'],
    '상의': ['맨투맨', '셔츠/블라우스', '후드티', '니트', '피케', '긴팔', '반팔', '민소매 티셔츠', '원피스'],
    '하의': ['데님', '코튼', '슬랙스', '트레이닝', '숏'],
    '신발': ['운동화', '구두', '워커/부츠', '샌들', '슬리퍼', '하이힐'],
    '가방': ['백팩', '크로스백', '토트백', '캐리어', '클러치백'],
    '패션 소품': ['모자', '양말', '목도리', '안경', '시계', '주얼리', '벨트', '피어싱'],
  };

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0,500]);
  const [selectedSmallCategories, setSelectedSmallCategories] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false); // 카테고리 숨김 상태

  // 대분류 선택 핸들러
  const toggleCategory = (category) => {
    const isCategorySelected = selectedCategories.includes(category);
    const relatedSmallCategories = categoryMapping[category] || [];

    setSelectedCategories((prev) =>
      isCategorySelected
        ? prev.filter((item) => item !== category) // 선택 해제
        : [...prev, category] // 선택 추가
    );

    // 대분류 선택 시, 소분류가 자동으로 선택되지 않도록 수정
    setSelectedSmallCategories((prev) =>
      isCategorySelected
        ? prev.filter((item) => !relatedSmallCategories.includes(item)) // 관련 소분류 제거
        : prev
    );
  };

  // 소분류 선택 핸들러
  const toggleSmallCategory = (smallCategory) => {
    setSelectedSmallCategories((prev) =>
      prev.includes(smallCategory)
        ? prev.filter((item) => item !== smallCategory) // 선택 해제
        : [...prev, smallCategory] // 선택 추가
    );
  };
  // 지금 해결해야하는 문제: 카테고리 부모 자식 카테고리로 분류를 해야한다.
  // 일단 부모 카테고리로 선택을 하면 해당 카테고리가 선택이 되넝 분류가 되고 
  // 부모 카테고리중에 자식 카테고리를 선택하게 되면 해당하는 카테고리만 나오게 된다.
  // 해결 방법 : map 를 써서 클릭된 부모이면서 클릭된 자식이면 true를 리턴하여 해당하는 itemcard만 나오게 하면된다.
  //            하지만 부모만 있는경우 모두 리턴하기
  //            선택된 카테고리 들을 저장해둘 배열 을 생성한다. 예를 들어 나이키 양말이 있다.
  //            나이키 양말 둘다 일치해야만 true를 리턴한다. 하지만 예를 들어 아디다스만 입력을 했다고 하자
  //            그러면 아디다스만 있고 해당 선택된 small category가 null 이라면 항상 true로 해서(for one 같이 하나라도 있으면 true를 한다거나 아예 없으면 리턴하는 함수를 이용하자)
  //            아디다스와 관련된 모든 것을 가져오게 한다.
  //            상위만 선택한 경우와 하위도 선택한 경우를 따로 분리해서 map으로 불러내는 방법이 있다.
  //            일단 카테고리 선택한 것들을 

  // 전체 선택 핸들러
  const selectAll = () => {
    setSelectedCategories(categories);
    setSelectedSmallCategories(Object.values(categoryMapping).flat());
  };

  // 선택 해제 핸들러
  const clearSelection = () => {
    setSelectedCategories([]);
    setSelectedSmallCategories([]);
    setPriceRange([0,500]);
  };

  // 플러스/마이너스 버튼 토글 핸들러
  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  // 초기화 핸들러: 모든 선택 해제
  const resetFilter = () => {
    clearSelection();
  };


  const handleSubmit = () => {
    if(!((selectedCategories.length == 0 && selectedSmallCategories.length ==0)&&(priceRange[0] == 0 && priceRange[1]==500))){

      getSelectedCategories(selectedCategories);
      getSelectedSmallCategories(selectedSmallCategories);
      getPriceRange(priceRange);
      console.log(priceRange);
    } else {
      window.location.reload();
    }
    toggleSidebar();
  }
  return (
    <div>
      {/* 레이어 배경 */}
      {isActive && <div onClick={toggleSidebar} className={styles.layerBackground}></div>}

      {/* 필터 섹션 */}
      <div className={`${styles.shopFilterSections} ${isActive ? styles.active : ''}`}>
        <div className={styles.filterContent}>
          <div className="title_container">
            <button className="exit_sidebar_btn" onClick={toggleSidebar}>
              <img src="/images/HJ_close.png" className="close_button" />
            </button>
            <div className="title">
              <h2>
                <p>필터</p>
              </h2>
            </div>
          </div>
        </div>
        <div className="filter_section">
          <div className="section_top">
            <p>카테고리</p>
            <a onClick={toggleCollapse}>
              <img
                src={isCollapsed ? '/images/HJ_plus.png' : '/images/HJ_minus.png'}
                className={isCollapsed ? 'plus_button' : 'minus_button'}
                alt={isCollapsed ? '펼치기' : '접기'}
              />
            </a>
          </div>
          {/* 카테고리 내용 */}
          <div
            className={`category-list ${isCollapsed ? 'collapsed' : ''}`}
            style={{
              overflow: 'hidden',
              transition: 'height 0.5s ease, opacity 0.5s ease',
              height: isCollapsed ? '0' : 'auto',
              opacity: isCollapsed ? '0' : '1',
            }}
          >
            {/* 전체 선택 및 선택 해제 버튼 */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 16px' }}>
              <button
                onClick={() => {
                  if (selectedCategories.length === categories.length) {
                    clearSelection();
                  } else {
                    selectAll();
                  }
                }}
                className="category_button_sub"
              >
                {selectedCategories.length === categories.length ? '선택 해제' : '전체 선택'}
              </button>
            </div>
            {/* 대분류 버튼 */}
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
            {/* 소분류 버튼 */}
            <ul className="small_category_container">
              {categories.map((category) => {
                const smallCategories = categoryMapping[category] || [];
                return selectedCategories.includes(category)
                  ? smallCategories.map((smallCategory) => (
                      <li className="small_category" key={smallCategory}>
                        <button
                          className={`category_button ${selectedSmallCategories.includes(smallCategory) ? 'active' : ''}`}
                          onClick={() => toggleSmallCategory(smallCategory)}
                        >
                          {smallCategory}
                        </button>
                      </li>
                    ))
                  : null;
              })}
            </ul>
          </div>
        </div>
        {/* <FilterSidebarSecondSection resetFilter={resetFilter} /> */}
        {/* <FilterPrice resetFilter={resetFilter} priceRange={priceRange} setPriceRange={setPriceRange} />
        <FilterActionButtonContainer resetFilter={resetFilter} submitSelection={handleSubmit} /> */}
        <FilterPrice resetFilter={resetFilter} priceRange={priceRange} setPriceRange={setPriceRange} />
        <FilterActionButtonContainer resetFilter={resetFilter} submitSelection={handleSubmit} />
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
