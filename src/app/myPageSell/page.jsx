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
    const { user } = useAuthStore();
    const LOCAL_API_BASE_URL = "http://localhost:8080/api";

    const [activeTab, setActiveTab] = useState(initialTab);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [purchases, setPurchases] = useState([]); // 구매 내역 데이터 상태
    const [showSideNav, setShowSideNav] = useState(true); // 사이드바 보이기 여부 상태
    useEffect(() => {
        // 특정 조건에 따라 사이드바를 숨기거나 표시
        if (pathname.includes("/myPageBuy") || pathname.includes("/myPageSell")) {
            setShowSideNav(true); // 구매 내역, 판매 내역 페이지에서는 숨기기
        } else {
            setShowSideNav(false); // 그 외 페이지에서는 표시
        }
    }, [pathname]);

    // // 판매 내역 데이터 상태
    // const [purchases, setPurchases] = useState([
    //     {
    //         idx: 1,
    //         trans_id: "aaa555",
    //         name: "상품이름(글제목등..임시값)",
    //         trans_price: "80,000원",
    //         is_zup: "",
    //         guest_id: "46",
    //         host_id: "9",
    //         pwr_id: "1",
    //         is_fixed: "1",
    //         trans_method: "택배거래",
    //         item_image: "/images/JH_itemImg.png",
    //         trans_date: "2025-01-02 00:00:00",
    //     },
    //     {
    //         idx: 2,
    //         trans_id: "bbb555",
    //         name: "상품이름(글제목등..임시값)",
    //         trans_price: "100,000원",
    //         is_zup: "",
    //         guest_id: "9",
    //         host_id: "46",
    //         pwr_id: "2",
    //         is_fixed: "0",
    //         trans_method: "직거래",
    //         item_image: "/images/JH_itemImg2.png",
    //         trans_date: "2025-01-02 12:00:00",
    //     },
    // ]);
    // DB에서 데이터 가져오기
    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                console.log(user?.member_id);
                const token = localStorage.getItem('token'); // 토큰 가져오기
                const response = await axios.get(`http://localhost:8080/api/transaction/HayoonSearchSell`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // 인증 헤더 추가
                    },
                    params: {
                        member_id: user?.member_id, // 사용자 ID 전달
                    },
                });

                if (response.status === 200) {
                    setPurchases(response.data); // 서버에서 가져온 데이터를 상태로 설정
                    console.log(response.data);
                } else {
                    console.error("데이터를 가져오는 데 실패했습니다.");
                }
            } catch (error) {
                console.error("데이터 가져오기 중 오류 발생:", error);
            }
        };

        if (user?.member_id) {
            fetchPurchases(); // 사용자 ID가 있을 때만 데이터 가져오기
        }
    }, [user]);

    const filteredItems = activeTab === '전체'
        ? purchases
        : purchases.filter(item => item.is_fixed === activeTab);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setRating(0);
        setReviewText("");
        setImages([]);
        setSelectedImage(null);
    };

    const handleRating = (index) => setRating(index + 1);
    const handleReviewTextChange = (event) => setReviewText(event.target.value);

    const handleImageUpload = (e) => {
        if (e.target.files.length > 0) {
            const files = Array.from(e.target.files);
            const previews = files.map(file => URL.createObjectURL(file));

            setPreviewImages(prevUrls => [...prevUrls, ...previews]);
            setImages(prevImages => [...prevImages, ...files]);
        }
    };

    const deleteImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
        setPreviewImages(previewImages.filter((_, i) => i !== index));
    };

    const handleSubmitReview = async () => {
        setSubmitting(true);
        const formData = new FormData();

        if (images.length > 0) {
            images.forEach(image => formData.append('images', image));
        }
        formData.append('content', reviewText);
        formData.append('rate', rating);
        formData.append('member_id', user.member_id);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${LOCAL_API_BASE_URL}/HayoonReview/submit`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (response.data.success) {
                alert('리뷰 등록에 성공했습니다.');
                closeModal();
            } else {
                alert('리뷰 등록에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('리뷰 등록 중 오류가 발생했습니다.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className='myPageSell'>
            <div className='container my lg'>
                {/* 사이드바 조건부 렌더링 */}
                {showSideNav && <MyPageSideNav currentPath={pathname} />}
                <div className='content_area my-page-content'>
                    <div className='my_purchase'>
                        <div className='content_title'>
                            <h3>판매 내역</h3>
                        </div>

                        <div className='purchase_list sell history'>
                            <div>
                                <div className='sell history'>
                                    <div className='purchase_list_tab sell divider detail_tab'>
                                        {['전체', '0', '1'].map(tab => (
                                            <div
                                                key={tab}
                                                className={`tab_item ${activeTab === tab ? 'tab_on' : ''}`}
                                                onClick={() => handleTabClick(tab)}
                                            >
                                                <a href="#" className='tab_link' onClick={(e) => e.preventDefault()}>
                                                    <dl className='tab_box'>
                                                        <dt className='title'>
                                                            {tab === '0' ? '진행 중' : tab === '1' ? '판매 완료' : '전체'}
                                                        </dt>
                                                        <dd className='count'>
                                                            {tab === '전체'
                                                                ? purchases.length
                                                                : purchases.filter(item => item.is_fixed === tab).length}
                                                        </dd>
                                                    </dl>
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='purchase_list_display'>
                            {filteredItems.length > 0 ? (
                                filteredItems
                                    .slice() // 원본 배열 보호
                                    .sort((a, b) => b.idx - a.idx) // idx를 기준으로 최신순 정렬
                                    .map(item => (
                                        <div key={item.idx} className='purchase_list_display_item'>
                                            <div className='purchase_list_product'>
                                                <div className='list_item_img_wrap'>
                                                    {item.file_name !== "0" ? (
                                                        <img
                                                            alt="product_img"
                                                            src={`http://localhost:8080/images/${item.file_name}`}
                                                            className='list_item_img'
                                                            style={{ backgroundColor: "rgb(244, 244, 244)" }}
                                                        />
                                                    ) : (
                                                        <p style={{ textAlign: "center", color: "gray" }}>이미지 없음</p>
                                                    )}
                                                </div>
                                                <div className='list_item_title_wrap'>
                                                    <p className='list_item_price'>{Number(item.trans_price).toLocaleString()} 원</p>
                                                    <p className='list_item_title'>{item.title}</p>
                                                    <p className='list_item_description'>{item.trans_method}</p>
                                                </div>
                                            </div>
                                            <div className='list_item_status'>
                                                <div className='list_item_column column_secondary'>
                                                    <p className='text-lookup secondary_title display_paragraph' style={{ color: "rgba(34, 34, 34, 0.5)" }}>
                                                        {new Date(item.trans_date).toLocaleString('ko-KR', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            second: '2-digit',
                                                            hour12: false // 24시간 형식 설정
                                                        })}
                                                    </p>
                                                </div>
                                                <div className='list_item_column column_last'>
                                                    <p className='text-lookup last_title display_paragraph' style={{ color: "rgb(34, 34, 34)" }}>
                                                        {item.is_fixed === '0' ? '진행 중' : '구매 완료'}
                                                    </p>
                                                    {item.is_fixed === '1' && (
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

            {isModalOpen && (
                <div className="review_modal-overlay">
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
                            {previewImages.map((image, index) => (
                                <div key={index} className="image-container">
                                    <img
                                        src={image} // previewImages에서 가져온 URL 사용
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
            )}
        </div>
    );
}

export default Page;
