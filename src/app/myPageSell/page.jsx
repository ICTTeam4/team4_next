"use client";
import { usePathname } from 'next/navigation';
import MyPageSideNav from '../components/MyPageSideNav';
import './myPageSell.css';
import { useState } from 'react';

function Page(props) {
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState('전체');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    }

    return (

        <div className='myPageSell'>
            <div className='container my lg'>
                <MyPageSideNav currentPath={pathname} />
                <div className='content_area my-page-content'>
                    <div className='my_purchase'>
                        <div className='content_title'>
                            <div className='title'>
                                <h3>판매 내역</h3>
                            </div>
                        </div>
                        {/* 타이틀 끝 */}
                        <div className='purchase_list sell history'>
                            <div>
                                <div className='sell history'>
                                    <div className='purchase_list_tab sell divider detail_tab'>
                                    <div className={`tab_item ${activeTab === '전체' ? 'tab_on' : ''}`}
                                             onClick={()=> handleTabClick('전체')}>
                                            <a href="#" className='tab_link'>
                                                <dl className='tab_box'>
                                                    <dt className='title'>전체</dt>
                                                    <dd className='count'>0</dd>
                                                </dl>
                                            </a>
                                        </div>
                                        <div className={`tab_item ${activeTab === '판매 중' ? 'tab_on' : ''}`}
                                             onClick={()=> handleTabClick('판매 중')}>
                                            <a href="#" className='tab_link'>
                                                <dl className='tab_box'>
                                                    <dt className='title'>판매 중</dt>
                                                    <dd className='count'>0</dd>
                                                </dl>
                                            </a>
                                        </div>
                                        <div className={`tab_item ${activeTab === '진행 중' ? 'tab_on' : ''}`}
                                             onClick={()=> handleTabClick('진행 중')}>
                                            <a href="#" className='tab_link'>
                                                <dl className='tab_box'>
                                                    <dt className='title'>진행 중</dt>
                                                    <dd className='count'>0</dd>
                                                </dl>
                                            </a>
                                        </div>
                                        <div className={`tab_item ${activeTab === '판매 완료' ? 'tab_on' : ''}`}
                                             onClick={()=> handleTabClick('판매 완료')}>
                                            <a href="#" className='tab_link'>
                                                <dl className='tab_box'>
                                                    <dt className='title'>판매 완료</dt>
                                                    <dd className='count'>0</dd>
                                                </dl>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div>
                                    <div>
                                        <a href="#" className='purchase_list_display_item' style={{ backgroundColor: "rgb(255, 255, 255)" }}>
                                            <div className='purchase_list_product'>
                                                <div className='list_item_img_wrap'>
                                                    <img alt="product_img" src="/images/JH_itemImg.png" className='list_item_img' style={{ backgroundColor: "rgb(244, 244, 244)" }} />
                                                </div>
                                                <div className='list_item_title_wrap'>
                                                    <p className='list_item_price'>80,000원</p>
                                                    <p className='list_item_title'>상품 이름</p>
                                                    <p className='list_item_description'>
                                                        <span>구매자이름 / 택배거래</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='list_item_status'>
                                                <div className='list_item_column column_secondary'>
                                                    <p className='text-lookup secondary_title display_paragraph'
                                                        style={{ color: "rgba(34, 34, 34, 0.5" }}>YY/MM/DD</p>
                                                </div>
                                                <div className='list_item_column column_last'>
                                                    <p className='before_purchase_confirmation'>구매 확정 전</p>
                                                    <p className='text-lookup last_title display_paragraph'
                                                        style={{ color: "rgb(34, 34, 34)" }}>판매 완료</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <a href="#" className='purchase_list_display_item' style={{ backgroundColor: "rgb(255, 255, 255)" }}>
                                            <div className='purchase_list_product'>
                                                <div className='list_item_img_wrap'>
                                                    <img alt="product_img" src="/images/JH_itemImg2.png" className='list_item_img' style={{ backgroundColor: "rgb(244, 244, 244)" }} />
                                                </div>
                                                <div className='list_item_title_wrap'>
                                                    <p className='list_item_price'>80,000원</p>
                                                    <p className='list_item_title'>상품 이름</p>
                                                    <p className='list_item_description'>
                                                        <span>구매자이름 / 택배거래</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='list_item_status'>
                                                <div className='list_item_column column_secondary'>
                                                    <p className='text-lookup secondary_title display_paragraph'
                                                        style={{ color: "rgba(34, 34, 34, 0.5" }}>YY/MM/DD</p>
                                                </div>
                                                <div className='list_item_column column_last'>
                                                    <p className='after_purchase_confirmation'>MM.DD 구매 확정</p>
                                                    <p className='text-lookup last_title display_paragraph'
                                                        style={{ color: "rgb(34, 34, 34)" }}>판매 완료</p>
                                                    <p className='text-lookup last_description display_paragraph action_named_action'>후기 남기기</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Page;