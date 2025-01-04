"use client";
import Link from 'next/link';
import './mypage.css';
import MyPageSideNav from '../components/MyPageSideNav';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import useAuthStore from '../../../store/authStore';
import axios from 'axios';

function Page(props) {
    const pathname = usePathname();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState();

    const { user } = useAuthStore();

    const member_id = user.member_id;

    const handleModalOpen = () => {
        setIsModalOpen(true); // 모달 열기
    };

    const handleModalClose = () => {
        setIsModalOpen(false); // 모달 닫기
    };

    const getBuyData = async () => {
        try {
            setLoading(true); // 로딩 상태 시작
            const response = await axios.get(`http://localhost:8080/api/transaction/getbuydata?member_id=${member_id}`); // axios를 활용한 API 호출
            console.log(response);
            const data = response.data.data;
            setList(data);
            console.log(data);
            setList(data); // 원본 데이터 저장
        } catch (err) {
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false); // 로딩 상태 종료
        }
    };

    // 데이터 로드 (최초 실행)
    useEffect(() => {
        getBuyData();
    }, []);

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
                                            {/* DB상 nickname이지만, 소셜로그인은  현재 security거친 zustand상의 'nickname'은 user.name임, 구분필요함 (25.01.02 하윤) */}
                                            <strong className='name'>{user?.nickname ?? user?.name ?? "닉네임 없음"}</strong>
                                            <p className='email'>{user?.email ?? "이메일 없음"}</p>
                                        </div>
                                        <div className='info-buttons'>
                                            <Link href="/myPageProfileInfo" className='btn btn outlinegrey small' type="button">
                                                프로필 관리
                                            </Link>
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
                                            <Link href="/myPageBuy?tab=전체" className='tab_link'>
                                                <dl className='tab_box'>
                                                    <dt className='title'>전체</dt>
                                                    <dd className='count'>0</dd>
                                                </dl>
                                            </Link>
                                        </div>
                                        <div className='tab_item tab_on'>
                                            <Link href="/myPageBuy?tab=진행 중" className='tab_link'>
                                                <dl className='tab_box'>
                                                    <dt className='title'>진행 중</dt>
                                                    <dd className='count'>0</dd>
                                                </dl>
                                            </Link>
                                        </div>
                                        <div className='tab_item'>
                                            <Link href="/myPageBuy?tab=구매 완료" className='tab_link'>
                                                <dl className='tab_box'>
                                                    <dt className='title'>구매 완료</dt>
                                                    <dd className='count'>0</dd>
                                                </dl>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {list.map((item) => (
                                    <div key={item.idx}>
                                        <div>
                                            <div>
                                                <div>
                                                    <div
                                                        className="purchase_list_display_item"
                                                        style={{ backgroundColor: "rgb(255, 255, 255)" }}
                                                    >
                                                        <a href="#">
                                                            <div className="purchase_list_product">
                                                                <div className="list_item_img_wrap">
                                                                    <img
                                                                        alt="product_img"
                                                                        src={
                                                                            item.salesPostVO?.fileList?.[0]?.fileName
                                                                                ? `http://localhost:8080/images/${item.salesPostVO.fileList[0].fileName}`
                                                                                : "/images/default_image.png"
                                                                        }
                                                                        className="list_item_img"
                                                                        style={{ backgroundColor: "rgb(244, 244, 244)" }}
                                                                    />
                                                                </div>
                                                                <div className="list_item_title_wrap">
                                                                    <p className="list_item_price">
                                                                        {Number(item.trans_price).toLocaleString()}원
                                                                    </p>
                                                                    <p className="list_item_title">
                                                                        {item.salesPostVO?.title || "상품 이름 없음"}
                                                                    </p>
                                                                    <p className="list_item_description">
                                                                        <span>
                                                                            {item.salesPostVO?.name || "판매자 이름 없음"} /{" "}
                                                                            {item.trans_method || "거래 방법 미정"}
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <div className="list_item_status">
                                                            <div className="list_item_column column_secondary">
                                                                <p
                                                                    className="text-lookup secondary_title display_paragraph"
                                                                    style={{ color: "rgba(34, 34, 34, 0.5)" }}
                                                                >
                                                                    {item.trans_date.split(" ")[0]}
                                                                </p>
                                                            </div>
                                                            <div className="list_item_column column_last">
                                                                <p
                                                                    className="text-lookup last_title display_paragraph"
                                                                    style={{ color: "rgb(34, 34, 34)" }}
                                                                >
                                                                    {item.salesPostVO?.status || "진행 상태 없음"}
                                                                </p>
                                                                {item.salesPostVO?.status !== "구매 완료" && (
                                                                    <p
                                                                        className="text-lookup last_description display_paragraph action_named_action"
                                                                        onClick={handleModalOpen}
                                                                        style={{ marginTop: "5px" }}
                                                                    >
                                                                        구매 확정
                                                                    </p>
                                                                )}
                                                                {isModalOpen && (
                                                                    <div className="layer lg">
                                                                        <div
                                                                            className="layer-background"
                                                                            onClick={handleModalClose}
                                                                        ></div>
                                                                        <div className="layer_container">
                                                                            <div className="layer_header">
                                                                                <h2 className="title">구매 확정</h2>
                                                                            </div>
                                                                            <div className="layer_content">
                                                                                <div className="size_list_area">
                                                                                    <h5>
                                                                                        Saint Kream에서는 구매확정을 하는 즉시, 확정 취소가
                                                                                        불가능해요.
                                                                                        <br />
                                                                                        <br />
                                                                                    </h5>
                                                                                    <p className="description_text">
                                                                                        확정 뒤 3일 후 상품 판매 대금이 판매자에게 정산되고 난 후에는
                                                                                        상품을 취소 및 반품 요청을 할 수 없어요.
                                                                                        <br />
                                                                                        <br />
                                                                                        <br />
                                                                                        혹시 판매자가 배송 전 구매확정을 요청했나요?
                                                                                        <br />
                                                                                        <br />
                                                                                        배송완료 이전에 판매자가 구매확정을 요청하는 거래는 사기 위험이
                                                                                        높아요.
                                                                                        <br />
                                                                                        이런 행위를 하는 판매자를 만났다면 1:1 문의를 통해 신고를
                                                                                        접수해 주세요.
                                                                                        <br />
                                                                                        <br />
                                                                                    </p>
                                                                                    <p className="Fraud_Prevention">
                                                                                        사기 피해 방지를 위해 반드시 상품을 수령한 후
                                                                                        <br />
                                                                                        상품 상태를 확인 후에 구매확정 해주세요.
                                                                                        <br />
                                                                                    </p>
                                                                                </div>
                                                                                <div className="layer_btn">
                                                                                    <p
                                                                                        className="btn solid medium"
                                                                                        onClick={handleModalClose}
                                                                                    >
                                                                                        확인
                                                                                    </p>
                                                                                    <p
                                                                                        className="btn solid_cancel medium"
                                                                                        onClick={handleModalClose}
                                                                                    >
                                                                                        취소
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
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
                                            <Link href="/myPageSell?tab=전체" className='tab_link'>
                                                <dl className='tab_box'>
                                                    <dt className='title'>전체</dt>
                                                    <dd className='count'>0</dd>
                                                </dl>
                                            </Link>
                                        </div>
                                        <div className='tab_item tab_on'>
                                            <Link href="/myPageSell?tab=판매 중" className='tab_link'>
                                                <dl className='tab_box'>
                                                    <dt className='title'>판매 중</dt>
                                                    <dd className='count'>0</dd>
                                                </dl>
                                            </Link>
                                        </div>
                                        <div className='tab_item'>
                                            <Link href="/myPageSell?tab=진행 중" className='tab_link'>
                                                <dl className='tab_box'>
                                                    <dt className='title'>진행 중</dt>
                                                    <dd className='count'>0</dd>
                                                </dl>
                                            </Link>
                                        </div>
                                        <div className='tab_item tab_on'>
                                            <Link href="/myPageSell?tab=판매 완료" className='tab_link'>
                                                <dl className='tab_box'>
                                                    <dt className='title'>판매 완료</dt>
                                                    <dd className='count'>0</dd>
                                                </dl>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 판매 여부 끝 */}
                            <div>
                                <div>
                                    <div>
                                        <div>
                                            <div className='purchase_list_display_item' style={{ backgroundColor: "rgb(255, 255, 255)" }}>
                                                <a href="#">
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
                                                </a>
                                                <div className='list_item_status'>
                                                    <div className='list_item_column column_secondary'>
                                                        <p className='text-lookup secondary_title display_paragraph'
                                                            style={{ color: "rgba(34, 34, 34, 0.5" }}>YY/MM/DD</p>
                                                    </div>
                                                    <div className='list_item_column column_last'>
                                                        <p className='text-lookup last_title display_paragraph' style={{ color: "rgb(34, 34, 34)" }}>진행 중</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <div className='purchase_list_display_item' style={{ backgroundColor: "rgb(255, 255, 255)" }}>
                                                <a href="#">
                                                    <div className='purchase_list_product'>
                                                        <div className='list_item_img_wrap'>
                                                            <img alt="product_img" src="/images/JH_itemImg2.png" className='list_item_img' style={{ backgroundColor: "rgb(244, 244, 244)" }} />
                                                        </div>
                                                        <div className='list_item_title_wrap'>
                                                            <p className='list_item_price'>80,000원</p>
                                                            <p className='list_item_title'>상품 이름</p>
                                                        </div>
                                                    </div>
                                                </a>
                                                <div className='list_item_status'>
                                                    <div className='list_item_column column_secondary'>
                                                        <p className='text-lookup secondary_title display_paragraph'
                                                            style={{ color: "rgba(34, 34, 34, 0.5" }}>YY/MM/DD</p>
                                                    </div>
                                                    <div className='list_item_column column_last'>
                                                        <p className='text-lookup last_title display_paragraph'
                                                            style={{ color: "rgb(34, 34, 34)" }}>판매 중</p>
                                                        <p className='list_item_description'>
                                                            <span className='post_up'>UP 하기</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
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
                                            <div className='item_inner'>
                                                <div className='thumb_box'>
                                                    <div className='product' style={{ backgroundColor: "rgb(244, 244, 244)" }}>
                                                        <Link href="/myPageWishList">
                                                            <picture className='picture product_img'>
                                                                <source type="image/webp" srcSet='/images/JH_itemImg2.png' />
                                                                <source srcSet='/images/JH_itemImg2.png' />
                                                                <img alt="Nike Air Max" src="/images/JH_itemImg2.png" loading='lazy' className='image full_width' />
                                                            </picture>
                                                        </Link>
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
                                                                style={{ color: "rgb(34, 34, 34)" }}>80,000원</em>
                                                        </div>
                                                        <div className='desc'>
                                                            <p className='text-lookup display_paragraph line_break_by_truncating_tail' style={{ color: "rgb(167, 167, 167)" }}>10분 전</p>
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
            </div>
        </div>
    );
}

export default Page;