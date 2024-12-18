import React from 'react';
import Link from 'next/link';
import './headerNavi.css';
import useAuthStore from '../../../store/authStore';
const Page = () => {
  const {searchKeyword, resetKeyword, setKeyword } = useAuthStore();
  const navItems = [
    { name: '전체', path: '/' },
    { name: '아우터', path: `/outerList?query=${searchKeyword}`},
    { name: '상의', path: `/topList?query=${searchKeyword}` },
    { name: '하의', path: `/bottomList?query=${searchKeyword}`},
    { name: '신발', path: `/shoesList?query=${searchKeyword}` },
    { name: '가방', path: `/bagsList?query=${searchKeyword}` },
    { name: '패션잡화', path: `/accessoriesList?query=${searchKeyword}` },
  ];

  return (
    <div className='max_width_container'>
    <div className="header_navi">
      <div className="navi_inner">
        <ul className="navi_list">
          {navItems.map((item, index) => (
            <div className="list_container" key={index}>
              <li className="navi_item">
                <Link href={item.path} className="navi_link">
                  {item.name}
                </Link>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default Page;
