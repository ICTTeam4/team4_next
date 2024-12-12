import { useState, useEffect } from 'react';
import styles from '../filterSidebar.module.css';
import './filterPrice.css';
import { Range } from 'react-range';

const FilterPrice = ({ resetFilter, isActive, toggleSidebar }) => {
  const categories = ['10만원 이하', '20만원 이하', '50만원 이하', '100만원 이하', '200만원 이하', '300만원 이상'];

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false); // 카테고리 숨김 상태
  const [priceRange, setPriceRange] = useState([0, 500]); // 가격 범위 (두 개의 값으로 변경)

  useEffect(() => {
    if (resetFilter) {
      setSelectedCategories([]); // 초기화 시 선택된 카테고리 해제
      setPriceRange([0, 500]); // 초기화 시 가격 범위 리셋
    }
  }, [resetFilter]);

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

  // 가격대 슬라이더 값 변경 핸들러
  const handlePriceRangeChange = (values) => {
    setPriceRange(values);
  };

  return (
    <div>
      <div className={styles.filterContent}></div>
      <div className="filter_section">
        <div className="section_top">
          <p style={{ marginLeft: '0px' }}>가격대</p>
          <a onClick={toggleCollapse}>
            <img
              src={isCollapsed ? '/images/HJ_minus.png' : '/images/HJ_plus.png'}
              className={isCollapsed ? 'minus_button' : 'plus_button'}
              alt={isCollapsed ? '접기' : '펼치기'}
            />
          </a>
        </div>
        <div
          className={`category-list ${isCollapsed ? 'collapsed' : ''}`}
          style={{
            overflow: 'hidden',
            transition: 'height 0.5s ease, opacity 0.5s ease',
            height: isCollapsed ? '0' : 'auto',
            opacity: isCollapsed ? '0' : '1',
          }}
        >
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

          <div className="price-range-slider">
           
            <div className="range-container">
              <Range
                values={priceRange}
                step={1}
                min={0}
                max={500}
                onChange={handlePriceRangeChange}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: '6px',
                      width: '100%',
                      background: '#000',
                      borderRadius:'20px'
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props, isDragged }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: '20px',
                      width: '20px',
                      borderRadius: '50%',
                      background: isDragged ? '#fff' : '#fff',
                      border: '2px solid black', // 테두리 추가
                    }}
                  />
                )}
              />
            </div>
            <div className="price-range-display">
              <label>최소가격 {priceRange[0]}만원</label>
              <label>최대가격 {priceRange[1]}만원</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPrice;
