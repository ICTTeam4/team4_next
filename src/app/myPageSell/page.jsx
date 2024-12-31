"use client";
import { usePathname, useSearchParams } from 'next/navigation';
import MyPageSideNav from '../components/MyPageSideNav';
import './myPageSell.css';
import { useEffect, useState } from 'react';
import useAuthStore from "../../../store/authStore";
import axios from 'axios';

function Page(props) {
    const searchParams = useSearchParams();
    const initialTab = searchParams.get('tab') || '전체';
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState(initialTab);
    const { user, login } = useAuthStore();
    const LOCAL_API_BASE_URL = "http://localhost:8080";
    const [isLoading, setLoading] = useState(false);
    //1. 회원 정보 통합으로 가져오기

    useEffect(() => {
        if (user?.email) {
            setLoading(true);
            axios.get(`${LOCAL_API_BASE_URL}/members/userInfo`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                params: { email: user.email }
            }).then(response => {
                // 이곳에서 사용자 정보 업데이트 로직 처리
            }).catch(error => {
                console.error("회원 정보를 가져오는 중 오류 발생:", error);
            }).finally(() => {
                setLoading(false);
            });
        }
    }, [user?.email]);
    // 아이템 데이터
    const items = [
        {
            id: 1,
            price: '80,000원',
            title: '폴리테루 데저트 부츠 세이지',
            description: '김구매자/택배거래',
            item_img: '/images/JH_itemImg.png',
            order_date: '2024/04/25',
            status: '판매 완료',
            purchaseConfirmationDate: null,
        },
        {
            id: 2,
            price: '100,000원',
            title: '포터 탱커 백팩',
            description: '조구매자/직거래',
            item_img: '/images/JH_itemImg2.png',
            order_date: '2024/05/10',
            status: '판매 완료',
            purchaseConfirmationDate: '05.12',
        },
        // 추가 아이템...
    ];


    const filteredItems = activeTab === '전체'
        ? items
        : items.filter(item => item.status === activeTab);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    }



    // 모달 팝업창 ( 리뷰 쓰는 곳)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rating, setRating] = useState(0); // 별점 상태
    const [images, setImages] = useState([]); // 이미지 상태
    const [selectedImage, setSelectedImage] = useState(null);
    const [reviewText, setReviewText] = useState("");
    const [submitting, setSubmitting] = useState(false);
    // 모달 열기
    const openModal = () => {
        setIsModalOpen(true);
    };

    // 모달 닫기 (상태 초기화)
    const closeModal = () => {
        setIsModalOpen(false);  // 모달 닫기
        setRating(0);           // 별점 초기화
        setImages([]);          // 이미지 초기화
        setSelectedImage(null); // 선택된 이미지 초기화
    };

    // 별점 기능 추가
   
    const handleRating = (index) => setRating(index + 1);
    const handleReviewTextChange = (event) => setReviewText(event.target.value);

    // 이미지 업로드
    const handleImageUpload = (event) => {
        if (event.target.files.length > 0) {
            const fileArray = Array.from(event.target.files).map(file => {
                return URL.createObjectURL(file);
            });
            setImages(fileArray);
        }
    };

    // 이미지 상세 모달 열기
    const openImageModal = (image) => {
        setSelectedImage(image);
    };

    // 이미지 상세 모달 닫기
    const closeImageModal = () => {
        setSelectedImage(null);
    };

    // 이미지 삭제
    const deleteImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };
    const handleSubmitReview = async () => {
        if (!images.length) {
            alert('Please add at least one image.');
            return;
        }
        setSubmitting(true);
        const formData = new FormData();
        images.forEach(image => formData.append('images', image));
        formData.append('review', reviewText);
        formData.append('rating', rating);

        try {
            const response = await axios.post(`${LOCAL_API_BASE_URL}/HayoonReview/submit`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            if (response.data.success) {
                alert('Review successfully submitted.');
                setIsModalOpen(false);
            } else {
                alert('Failed to submit review.');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('An error occurred while submitting your review.');
        } finally {
            setSubmitting(false);
        }
    };

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

                        {/* 탭 메뉴 */}
                        <div className='purchase_list sell history'>
                            <div>
                                <div className='sell history'>
                                    <div className='purchase_list_tab sell divider detail_tab'>
                                        {['전체', '판매 중', '진행 중', '판매 완료'].map(tab => (
                                            <div
                                                key={tab}
                                                className={`tab_item ${activeTab === tab ? 'tab_on' : ''}`}
                                                onClick={() => handleTabClick(tab)}
                                            >
                                                <a href="#" className='tab_link' onClick={(e) => e.preventDefault()}>
                                                    <dl className='tab_box'>
                                                        <dt className='title'>{tab}</dt>
                                                        <dd className='count'>
                                                            {tab === '전체' ? items.length : items.filter(item => item.status === tab).length}
                                                        </dd>
                                                    </dl>
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 필터링된 아이템 목록 */}
                        <div className='purchase_list_display'>
                            {filteredItems.length > 0 ? (
                                filteredItems.map(item => (
                                    <div key={item.id} className='purchase_list_display_item' style={{ backgroundColor: "rgb(255, 255, 255)" }}>
                                        <a href="#">
                                            <div className='purchase_list_product'>
                                                <div className='list_item_img_wrap'>
                                                    <img
                                                        alt="product_img"
                                                        src={item.item_img}
                                                        className='list_item_img'
                                                        style={{ backgroundColor: "rgb(244, 244, 244)" }}
                                                    />
                                                </div>
                                                <div className='list_item_title_wrap'>
                                                    <p className='list_item_price'>{item.price}</p>
                                                    <p className='list_item_title'>{item.title}</p>
                                                    <p className='list_item_description'>
                                                        <span>{item.description}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                        <div className='list_item_status'>
                                            <div className='list_item_column column_secondary'>
                                                <p className='text-lookup secondary_title display_paragraph'
                                                    style={{ color: "rgba(34, 34, 34, 0.5)" }}>{item.order_date}</p>
                                            </div>
                                            <div className='list_item_column column_last'>
                                                {item.purchaseConfirmationDate ? (
                                                    <p className='after_purchase_confirmation'>{item.purchaseConfirmationDate} 구매 확정</p>
                                                ) : (
                                                    <p className='before_purchase_confirmation'>구매 확정 전</p>
                                                )}
                                                <p className='text-lookup last_title display_paragraph'
                                                    style={{ color: "rgb(34, 34, 34)" }}>{item.status}</p>
                                                {item.status === '판매 완료' && (
                                                    <button className="review-btn" onClick={openModal} style={{ textAlign: 'right' }}>후기 남기기</button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className='nothing_at_all'>해당 카테고리에 맞는 판매 내역이 없습니다.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* 모달 팝업 */}
            {isModalOpen && (
                <div className="review_modal-overlay">
                    <div className="big_review_modal-content">
                        <div className="review_modal-content">
                            <button className="close-btn" onClick={closeModal}>&times;</button>
                            <div style={{ padding: '20px' }}><h3>리뷰 작성</h3></div>
                            <div className="rating">
                                {Array(5)
                                    .fill(0)
                                    .map((_, index) => (
                                        <span
                                            key={index}
                                            onClick={() => handleRating(index)}
                                            style={{
                                                cursor: "pointer",
                                                fontSize: "2rem",
                                                color: index < rating ? "gold" : "lightgray",
                                            }}>★</span>
                                    ))}
                            </div>
                            <div style={{ paddingTop: '15px', paddingBottom: '20px' }}>
                                <textarea
                                    placeholder="판매자에게 전하고 싶은 후기를 남겨주세요."
                                    rows="5"
                                    value={reviewText}
                                    onChange={handleReviewTextChange}
                                ></textarea>
                            </div>
                            {/* 사진 추가 영역 */}
                            <div className="image-upload" >
                                <label htmlFor="fileInput" style={{ width: '80px', height: '31px', fontSize: '15px' }} >사진 추가</label>
                                <input

                                    type="file"
                                    id="fileInput"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                            </div>

                            {/* 사진 미리보기 */}
                            <div className="image-preview" style={{ textAlign: 'left' }}>
                                {images.map((image, index) => (
                                    <div key={index} className="image-container">
                                        <img
                                            src={image}
                                            alt={`uploaded-${index}`}
                                            onClick={() => openImageModal(image)}
                                        />
                                        <button className="delete-btn" onClick={() => deleteImage(index)}>&times;</button>
                                    </div>
                                ))}
                            </div>
                            {/* 모달 하단 버튼 */}
                            <div className="modal-actions">
                                <button className="cancel-btn" onClick={closeModal}>취 소</button>
                                <a style={{ width: '20px', color: 'white' }}>.         .        .</a>
                                <button className="submit-btn" onClick={handleSubmitReview} disabled={submitting}>
                                    {submitting ? '제출 중...' : '작성하기'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 상세 이미지 모달 */}
            {selectedImage && (
                <div className="image-modal-overlay" onClick={closeImageModal}>
                    <div className="image-modal-content">
                        <span className="image-modal-close" onClick={closeImageModal}> &times; </span>
                        <img src={selectedImage} alt="Detailed View" />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Page;
