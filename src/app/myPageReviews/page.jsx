"use client";
import { usePathname } from 'next/navigation';
import MyPageSideNav from '../components/MyPageSideNav';
import './myPageReviews.css';
import { useEffect, useMemo, useState } from 'react';
import useAuthStore from "../../../store/authStore";
import axios from 'axios';

function Page(props) {
    const { user, login } = useAuthStore();
    const pathname = usePathname();
    const LOCAL_API_BASE_URL = "http://localhost:8080/api";
    // 후기 데이터
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
    //1. 회원 정보 통합으로 가져오기
    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Saved Token:', token);
    }, []);
    // 탭 상태
    const [activeTab, setActiveTab] = useState('전체');
    // 탭 클릭 시 상태 업데이트
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    }
 // 서버에서 모든 리뷰 데이터를 한 번에 가져오는 함수
 const fetchReviews = async () => {
    console.log("fetchReviews 함수 호출됨");
    setIsLoading(true); // 로딩 시작
    try {
        if (!user?.member_id) {
            console.error("User ID is missing");
            setIsLoading(false); // 로딩 종료
            return;
        }

        const params = { member_id: user.member_id };

        const response = await axios.get(`${LOCAL_API_BASE_URL}/HayoonReview/list`, { params });

        if (response.data.success) {
            setReviews(response.data.data);
            console.log("데이터 확인:", response.data.data);
        } else {
            console.error("Failed to fetch reviews:", response.data.message);
        }
    } catch (error) {
        console.error("Error fetching reviews:", error);
    } finally {
        setIsLoading(false); // 로딩 종료
    }
};
    
 // user가 로드된 후 리뷰 데이터를 가져옴
 useEffect(() => {
    if (user?.member_id) {
        fetchReviews();
    }
}, [user]);
// 중복 데이터 제거 함수
const uniqueReviews = (reviews) => {
    const seen = new Set();
    return reviews.filter((review) => {
        if (seen.has(review.review_id)) {
            return false;
        }
        seen.add(review.review_id);
        return true;
    });
};
  // 탭별로 필터링된 리뷰 가져오기
  const filteredReviews = useMemo(() => {
    switch (activeTab) {
        case "전체":
            return uniqueReviews(reviews); // 중복 제거 후 모든 리뷰 표시
        case "판매자후기":
            return reviews.filter(
                (review) =>
                    review.type === "seller" && review.member_id !== Number(user?.member_id)
            );
        case "구매자후기":
            return reviews.filter(
                (review) =>
                    review.type === "buyer" && review.member_id !== Number(user?.member_id)
            );
        case "내후기":
            return reviews.filter(
                (review) =>
                    review.type === "mine" && review.member_id === Number(user?.member_id)
            );
        default:
            return [];
    }
}, [activeTab, reviews, user]);

useEffect(() => {
    console.log("멤버아이디확인", user?.member_id);
    console.log("전체 리뷰 데이터 확인:", reviews);
}, [activeTab]);


const buyerAverageRating = useMemo(() => {
    const buyerReviews = filteredReviews.filter((review) => review.type === "buyer");
    if (buyerReviews.length === 0) return 0;

    const sum = buyerReviews.reduce((acc, cur) => acc + cur.rate, 0);
    return (sum / buyerReviews.length).toFixed(1);
}, [reviews]);

const sellerAverageRating = useMemo(() => {
    const sellerReviews = filteredReviews.filter((review) => review.type === "seller");
    if (sellerReviews.length === 0) return 0;

    const sum = sellerReviews.reduce((acc, cur) => acc + cur.rate, 0);
    return (sum / sellerReviews.length).toFixed(1);
}, [reviews]);

const overallAverageRating = useMemo(() => {
    if (filteredReviews.length === 0) return 0;

    const sum = filteredReviews.reduce((acc, cur) => acc + cur.rate, 0);
    return (sum / filteredReviews.length).toFixed(1);
}, [reviews]);

const myReviewsAverageRating = useMemo(() => {
    const myReviews = filteredReviews.filter((review) => review.member_id === Number(user?.member_id));
    if (myReviews.length === 0) return 0;

    const sum = myReviews.reduce((acc, cur) => acc + cur.rate, 0);
    return (sum / myReviews.length).toFixed(1);
}, [reviews, user]);



// 중복 검사 없이 각 탭 조건에 따라 독립적으로 데이터 유지

      // 로딩 상태 표시
      if (isLoading) {
        return <p>로딩 중...</p>;
    }

// 별점 렌더링 함수 수정
const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <span
                key={i}
                className={`star ${i <= rating ? 'filled' : ''}`}
            >
                ★
            </span>
        );
    }
    return stars;
};


    return (
        <div className='myPageReviews'>
            <div className='container my lg'>
                <MyPageSideNav currentPath={pathname} />
                <div className='content_area my-page-content'>
                    <div className='my_purchase'>
                        <div className='content_title'>
                            <div className='title'>
                                <h3>거래 후기</h3>
                            </div>
                        </div>
                        {/* 탭 영역 */}
                        <div className='purchase_list sell history'>
                            <div>
                                <div className='sell history'>
                                    <div className='purchase_list_tab sell divider detail_tab'>
                                        {/* 전체(상점 평점) 탭 */}
                                        <div
                                            className={`tab_item ${activeTab === '전체' ? 'tab_on' : ''}`}
                                            onClick={() => handleTabClick('전체')}>
                                            <a href="#" className='tab_link'>
                                                <dl className='tab_box'>
                                                    <dd className='count'>{overallAverageRating}</dd>
                                                    <dt className='title'>전체</dt>
                                                </dl>
                                            </a>
                                        </div>

                                        {/* 판매자 후기 탭 */}
                                        <div
                                            className={`tab_item ${activeTab === '판매자후기' ? 'tab_on' : ''}`}
                                            onClick={() => handleTabClick('판매자후기')}>
                                            <a href="#" className='tab_link'>
                                                <dl className='tab_box'>
                                                    <dd className='count'>{sellerAverageRating}</dd>
                                                    <dt className='title'>판매자 후기</dt>
                                                </dl>
                                            </a>
                                        </div>

                                        {/* 구매자 후기 탭 */}
                                        <div
                                            className={`tab_item ${activeTab === '구매자후기' ? 'tab_on' : ''}`}
                                            onClick={() => handleTabClick('구매자후기')}>
                                            <a href="#" className='tab_link'>
                                                <dl className='tab_box'>
                                                    <dd className='count'>{buyerAverageRating}</dd>
                                                    <dt className='title'>구매자 후기</dt>
                                                </dl>
                                            </a>
                                        </div>

                                        {/* 내 후기 탭 */}
                                        <div
                                            className={`tab_item ${activeTab === '내후기' ? 'tab_on' : ''}`}
                                            onClick={() => handleTabClick('내후기')}>
                                            <a href="#" className='tab_link'>
                                                <dl className='tab_box'>
                                                    <dd className='count'>{myReviewsAverageRating}</dd>
                                                    <dt className='title'>내 후기</dt>
                                                </dl>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 후기 리스트 */}
                        <div>
                            {filteredReviews.map((item) => (
                                <a
                                    key={item.review_id}
                                    href="#"
                                    className="purchase_list_display_item"
                                    style={{ backgroundColor: "rgb(255, 255, 255)" }}
                                >
                                    <div className="purchase_list_product">
                                        <div className="list_item_img_wrap">
                                            {/* <img
                                                alt="product_img"
                                                src="/images/JH_myPageReviewImg.png"
                                                className="list_item_img"
                                            /> */}
                                              {renderStars(item.rate)}
                                        </div>
                                        <div className="list_item_title_wrap">
                                            <p className="list_item_price">{item.rate}</p>
                                            <div className="list_item_img_wrap">
                                        {item.file_url && (
                                            <img
                                            style={{width:'300px'}}
                                                src={`http://localhost:8080${item.file_url}`}  //이미 /가 있어서 슬래시 없어야함..........
                                                alt={item.file_name}
                                                className="review-image"
                                            />
                                        )}
                                    </div>
                                            <p className="list_item_title">{item.content}</p>
                                        </div>
                                    </div>
                                    <div className="list_item_status">
                                        <div className="list_item_column column_last">
                                            <p className="before_purchase_confirmation">
                                                {item.member_id} / {item.created_at}
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            ))}
                            {filteredReviews.length === 0 && (
                                <p className='nothing_at_all'>해당 카테고리에 후기가 없습니다.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;