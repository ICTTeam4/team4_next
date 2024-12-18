"use client";
import Link from 'next/link';
import './mypage.css';
import MyPageSideNav from '../components/MyPageSideNav';
import { usePathname } from 'next/navigation';

function Page(props) {
    
    const pathname = usePathname();

    return (
        <div className='myPage'>
            <div className='container my lg'>
            <MyPageSideNav currentPath={pathname} />
                <div className='content_area my-page-content'>
                    <div className='v_portal' style={{ display: "none" }}></div>
                    <div className='my_home'>
                        <div>
                            <div className='user_membership'>
                                <div className='user_detail'>
                                    <div className='user_thumb'>
                                        <img src="/images/JH_userImg.png" alt="user_img" className='thumb_img' />
                                    </div>
                                    <div className='user_info'>
                                        <div className='info_box'>
                                            <strong className='name'>홍길동</strong>
                                            <p className='email'>abcd1234@naver.com</p>
                                        </div>
                                        <div className='info-buttons'>
                                            <a href="#" className='btn btn outlinegrey small' type="button">
                                                프로필 관리
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ height: "40px" }}></div>
                            <div>
                                <div className='my_home_title'>
                                    <h3 className='title'> 구매 내역 </h3>
                                </div>
                                <div className='recent_purchase'>
                                    <div className='purchase_list_tab'>
                                        <div className='tab_item total'>
                                            <a href="#" className='tab_link'>
                                                <dl className='tab_box'>
                                                    <dt className='title'>전체</dt>
                                                    <dd className='count'>0</dd>
                                                </dl>
                                            </a>
                                        </div>
                                        <div className='tab_item tab_on'>
                                            <a href="#" className='tab_link'>
                                                <dl className='tab_box'>
                                                    <dt className='title'>진행 중</dt>
                                                    <dd className='count'>0</dd>
                                                </dl>
                                            </a>
                                        </div>
                                        <div className='tab_item'>
                                            <a href="#" className='tab_link'>
                                                <dl className='tab_box'>
                                                    <dt className='title'>구매 완료</dt>
                                                    <dd className='count'>0</dd>
                                                </dl>
                                            </a>
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
                                                            <span>판매자이름 / 택배거래</span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className='list_item_status'>
                                                    <div className='list_item_column column_secondary'>
                                                        <p className='text-lookup secondary_title display_paragraph'
                                                            style={{ color: "rgba(34, 34, 34, 0.5" }}>YY/MM/DD</p>
                                                    </div>
                                                    <div className='list_item_column column_last'>
                                                        <p className='text-lookup last_title display_paragraph' style={{ color: "rgb(34, 34, 34)" }}>진행 중</p>
                                                        <p className='text-lookup last_description display_paragraph action_named_action' style={{ color: "red" }}>구매 확정</p>
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
                                                            <span>판매자이름 / 택배거래</span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className='list_item_status'>
                                                    <div className='list_item_column column_secondary'>
                                                        <p className='text-lookup secondary_title display_paragraph'
                                                            style={{ color: "rgba(34, 34, 34, 0.5" }}>YY/MM/DD</p>
                                                    </div>
                                                    <div className='list_item_column column_last'>
                                                        <p className='text-lookup last_title display_paragraph'
                                                            style={{ color: "rgb(34, 34, 34)" }}>구매 완료</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 구매내역 끝 */}
                            <div style={{ height: "60px" }}></div>
                            <div>
                                <div className='my_home_title'>
                                    <h3 className='title'> 판매 내역 </h3>
                                </div>
                                <div className='recent_purchase'>
                                    <div className='purchase_list_tab sell'>
                                        <div className='tab_item total'>
                                            <a href="#" className='tab_link'>
                                                <dl className='tab_box'>
                                                    <dt className='title'>전체</dt>
                                                    <dd className='count'>0</dd>
                                                </dl>
                                            </a>
                                        </div>
                                        <div className='tab_item tab_on'>
                                            <a href="#" className='tab_link'>
                                                <dl className='tab_box'>
                                                    <dt className='title'>판매 중</dt>
                                                    <dd className='count'>0</dd>
                                                </dl>
                                            </a>
                                        </div>
                                        <div className='tab_item'>
                                            <a href="#" className='tab_link'>
                                                <dl className='tab_box'>
                                                    <dt className='title'>진행 중</dt>
                                                    <dd className='count'>0</dd>
                                                </dl>
                                            </a>
                                        </div>
                                        <div className='tab_item tab_on'>
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
                            {/* 판매 여부 끝 */}
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
                                                        <p className='text-lookup last_title display_paragraph' style={{ color: "rgb(34, 34, 34)" }}>진행 중</p>
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
                                                            <span style={{ color: "red", textDecoration: "underline" }}>UP 하기</span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className='list_item_status'>
                                                    <div className='list_item_column column_secondary'>
                                                        <p className='text-lookup secondary_title display_paragraph'
                                                            style={{ color: "rgba(34, 34, 34, 0.5" }}>YY/MM/DD</p>
                                                    </div>
                                                    <div className='list_item_column column_last'>
                                                        <p className='text-lookup last_title display_paragraph'
                                                            style={{ color: "rgb(34, 34, 34)" }}>판매 중</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 판매내역 끝 */}
                            <div style={{ height: "60px" }}></div>
                            <div>
                                <div className='my_home_title'>
                                    <h3 className='title'> 관심 상품 </h3>
                                </div>
                                <div className='interest_product'>
                                    <div className='product_list'>
                                        <div className='product_item'>
                                            <a href="#" className='item_inner'>
                                                <div className='thumb_box'>
                                                    <div className='product' style={{ backgroundColor: "rgb(244, 244, 244)" }}>
                                                        <picture className='picture product_img'>
                                                            <source type="image/webp" srcSet='/images/JH_itemImg2.png' />
                                                            <source srcSet='/images/JH_itemImg2.png' />
                                                            <img alt="Nike Air Max" src="/images/JH_itemImg2.png" loading='lazy' className='image full_width' />
                                                        </picture>
                                                        <span aria-label='관심상품' role='button' className='btn_wish'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className='icon sprite-icons ico-wish-on'>
                                                                <use href="/JH_wishIco.svg#i_ico-wish-on" />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className='info_box'>
                                                    <div className='brand'>
                                                        <p className='brand-text'>
                                                            <span className='brand-name'>상품 이름</span>
                                                        </p>
                                                    </div>
                                                    <div className='price'>
                                                        <div className='amount lg'>
                                                            <em className='text-lookup num bold display_paragraph line_break_by_truncating_tail' 
                                                            style={{color: "rgb(34, 34, 34)"}}>80,000원</em>
                                                        </div>
                                                        <div className='desc'>
                                                            <p className='text-lookup display_paragraph line_break_by_truncating_tail' style={{color: "rgb(167, 167, 167)"}}>10분 전</p>
                                                        </div>
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
        </div>
    );
}

export default Page;