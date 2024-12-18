"use client";
import { usePathname } from 'next/navigation';
import MyPageSideNav from '../components/MyPageSideNav';
import './myPageWishList.css';
import { useState } from 'react';

function Page(props) {
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState('전체');
    const [activeFilter, setActiveFilter] = useState('찜 한 상품');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    }

    const handleFilterClick = (filterName) => {
        setActiveFilter(filterName);
    };

    return (

        <div className='myPageWishList'>
            <div className='container my lg'>
                <MyPageSideNav currentPath={pathname} />
                <div className='content_area my-page-content'>
                    <div className='content_title border'>
                        <div className='title'>
                            <h3>관심</h3>
                        </div>
                    </div>
                    {/* 타이틀 끝 */}
                    <div className='saved-chips-container'>
                        <div className='filter_chip_group filter_group bubble'>
                            <label className='bubble'>
                                <input type="radio" className='input blind' value="찜 한 상품" />
                                <div>
                                    <button className={`filter_button line ${activeFilter === '찜 한 상품' ? 'active' : ''}`}
                                        onClick={() => handleFilterClick('찜 한 상품')}>
                                        <p className='text-group'>
                                            <span className='title'>찜 한 상품</span>
                                            <span className='num'></span>
                                        </p>
                                    </button>
                                </div>
                            </label>
                            <label className='bubble'>
                                <input type="radio" className='input blind' value="최근 본 상품" />
                                <div>
                                    <button className={`filter_button line ${activeFilter === '최근 본 상품' ? 'active' : ''}`}
                                        onClick={() => handleFilterClick('최근 본 상품')}>
                                        <p className='text-group'>
                                            <span className='title'>최근 본 상품</span>
                                            <span className='num'></span>
                                        </p>
                                    </button>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className='saved-product'>
                        <div>
                            <div>
                                <div>
                                    <div className='my_interest'>
                                        <div className='content-header'>
                                            <div className='total-rows'>전체 0</div>
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
                                                                    <span>판매자이름 / 10분 전</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <p className="text-lookup last_description display_paragraph action_named_action wish_delete">삭제</p>
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
                                                                    <span>판매자이름 / 5분 전</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <p className="text-lookup last_description display_paragraph action_named_action wish_delete">삭제</p>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
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