import Link from 'next/link';
import React from 'react';
import './css/MyPageSideNav.css';

const MyPageSideNav = ({ currentPath }) => {

    const isActive = (href) => currentPath === href;
    console.log(currentPath)
    return (
        <div className='myPageSideNav'>
            <div className='container my lg'>
                <div className='snb_area'>
                    <Link href="/myPage" aria-current="page">
                        <h2 className='snb_main_title'>마이 페이지</h2>
                    </Link>
                    <nav className='snb'>
                        <div className='snb_list'>
                            <strong className='snb_title'>쇼핑 정보</strong>
                            <ul className='snb_menu'>
                                <li className='menu_item'>
                                    <Link href='/myPageBuy' className={`menu_link ${isActive('/myPageBuy') ? 'active' : ''}`}> 구매 내역 </Link>
                                </li>
                                <li className='menu_item'>
                                    <a href='#' className='menu_link'> 판매 내역 </a>
                                </li>
                                <li className='menu_item'>
                                    <a href='#' className='menu_link'> 관심 </a>
                                </li>
                            </ul>
                        </div>
                        <div className='snb_list'>
                            <strong className='snb_title'>내 정보</strong>
                            <ul className='snb_menu'>
                                <li className='menu_item'>
                                    <a href='#' className='menu_link'> 로그인 정보 </a>
                                </li>
                                <li className='menu_item'>
                                    <a href='#' className='menu_link'> 프로필 관리 </a>
                                </li>
                                <li className='menu_item'>
                                    <a href='#' className='menu_link'> 주소록 </a>
                                </li>
                                <li className='menu_item'>
                                    <a href='#' className='menu_link'> 판매 정산 계좌 </a>
                                </li>
                                <li className='menu_item'>
                                    <a href='#' className='menu_link'> 정산 내역 </a>
                                </li>
                                <li className='menu_item'>
                                    <a href='#' className='menu_link'> 거래 후기 </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default MyPageSideNav;