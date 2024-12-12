import React from 'react';
import Link from 'next/link';
import './headerNavi.css';

const Page = () => {
  const navItems = [
    { name: '전체', path: '/all' },
    { name: '아우터', path: '/outer' },
    { name: '상의', path: '/top' },
    { name: '하의', path: '/bottom' },
    { name: '신발', path: '/shoes' },
    { name: '가방', path: '/bags' },
    { name: '패션잡화', path: '/accessories' },
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
