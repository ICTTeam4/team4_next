"use client";
import { usePathname, useSearchParams } from 'next/navigation';
import MyPageSideNav from '../components/MyPageSideNav';
import './myPageBuy.css';
import { useEffect, useState } from 'react';
import useAuthStore from "../../../store/authStore";
import axios from 'axios';

function Page(props) {
    const searchParams = useSearchParams();
    const initialTab = searchParams.get('tab') || '전체';
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState(initialTab);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [modalType, setModalType] = useState(null);
    const { user } = useAuthStore();
    const LOCAL_API_BASE_URL = "http://localhost:8080";



    // 구매 내역 데이터 상태
    const [purchases, setPurchases] = useState([
        {
            id: 1,
            name: "상품 이름",
            price: "80,000원",
            description: "판매자이름/택배거래",
            item_image: "/images/JH_itemImg.png",
            order_date: "2023/12/01",
            status: "진행 중",
        },
        {
            id: 2,
            name: "상품 이름",
            price: "100,000원",
            description: "판매자이름/직거래",
            item_image: "/images/JH_itemImg2.png",
            order_date: "2023/11/25",
            status: "구매 완료",
        },
    ]);
    // 별점 기능 추가

    const handleRating = (index) => setRating(index + 1);
    const handleReviewTextChange = (event) => setReviewText(event.target.value);
    useEffect(() => {
        setActiveTab(initialTab);
    }, [initialTab]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    }

    // 모달 열기
    const handleModalOpen = (type, itemId = null) => {
        setModalType(type); // 모달 유형 설정
        if (itemId) {
            setSelectedItemId(itemId); // 선택된 아이템 ID 저장
        }
        setIsModalOpen(true); // 모달 열기
    };

    // 모달 닫기
    const handleModalClose = () => {
        setModalType(null); // 모달 유형 초기화
        setIsModalOpen(false); // 모달 닫기
    };

    const getFilteredPurchases = () => {
        if (activeTab === '전체') {
            return purchases;
        } else {
            return purchases.filter(purchase => purchase.status === activeTab);
        }
    };

    const filteredPurchases = getFilteredPurchases();

    const handleImageUpload = (e) => {
        if (e.target.files.length > 0) {
            const files = Array.from(e.target.files);
            const previews = files.map(file => URL.createObjectURL(file));
            setPreviewImages(prev => [...prev, ...previews]);
            setImages(prev => [...prev, ...files]);
        }
    };

    const deleteImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
        setPreviewImages(previewImages.filter((_, i) => i !== index));
    };

    // 리뷰 제출
    const handleSubmitReview = async (itemId) => {
        setSubmitting(true);
        const formData = new FormData();
        formData.append('member_id', user.member_id);
        formData.append('item_id', itemId);
        formData.append('content', reviewText);
        formData.append('rate', rating);
        images.forEach(image => formData.append('images', image));

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${LOCAL_API_BASE_URL}/HayoonReview/submit`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                alert('리뷰 등록에 성공했습니다.');
                setIsModalOpen(false);
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

        <div className='myPageBuy'>
            <div className='container my lg'>
                <MyPageSideNav currentPath={pathname} />
                <div className='content_area my-page-content'>
                    <div className='my_purchase'>
                        <div className='content_title'>
                            <div className='title'>
                                <h3>구매 내역</h3>
                            </div>
                        </div>
                        {/* 타이틀 끝 */}
                        <div className='purchase_list history'>
                            <div>
                                <div className='history'>
                                    <div className='purchase_list_tab divider detail_tab'>
                                        {/* '전체' 탭 */}
                                        <div className={`tab_item ${activeTab === '전체' ? 'tab_on' : ''}`}
                                            onClick={() => handleTabClick('전체')}>
                                            <a href="#" className='tab_link'>
                                                <dl className='tab_box'>
                                                    <dt className='title'>전체</dt>
                                                    <dd className='count'>{purchases.length}</dd>
                                                </dl>
                                            </a>
                                        </div>
                                        {/* '진행 중' 탭 */}
                                        <div className={`tab_item ${activeTab === '진행 중' ? 'tab_on' : ''}`}
                                            onClick={() => handleTabClick('진행 중')}>
                                            <a href="#" className='tab_link'>
                                                <dl className='tab_box'>
                                                    <dt className='title'>진행 중</dt>
                                                    <dd className='count'>{purchases.filter(p => p.status === '진행 중').length}</dd>
                                                </dl>
                                            </a>
                                        </div>
                                        <div className={`tab_item ${activeTab === '구매 완료' ? 'tab_on' : ''}`}
                                            onClick={() => handleTabClick('구매 완료')}>
                                            <a href="#" className='tab_link'>
                                                <dl className='tab_box'>
                                                    <dt className='title'>구매 완료</dt>
                                                    <dd className='count'>{purchases.filter(p => p.status === '구매 완료').length}</dd>
                                                </dl>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 구매 내역 리스트 */}
                        <div>
                            <div>
                                <div>
                                    {filteredPurchases.length > 0 ? (
                                        filteredPurchases.map(item => (
                                            <div key={item.id} className='purchase_list_display_item' style={{ backgroundColor: "rgb(255, 255, 255)" }}>
                                                <a href="#">
                                                    <div className='purchase_list_product'>
                                                        <div className='list_item_img_wrap'>
                                                            <img alt="product_img" src={item.item_image} className='list_item_img' style={{ backgroundColor: "rgb(244, 244, 244)" }} />
                                                        </div>
                                                        <div className='list_item_title_wrap'>
                                                            <p className='list_item_price'>{item.price}</p>
                                                            <p className='list_item_title'>{item.name}</p>
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
                                                        <p className='text-lookup last_title display_paragraph'
                                                            style={{ color: "rgb(34, 34, 34)" }}>{item.status}</p>
                                                        {/* '진행 중' 상태일 때만 '구매 확정' 버튼 표시 */}
                                                        {item.status === '진행 중' && (
                                                            <a
                                                                className='text-lookup last_description display_paragraph action_named_action confirm_purchase'
                                                                style={{ color: "red", cursor: "pointer" }}
                                                                onClick={() => handleModalOpen('confirm')} // 'confirm' 모달 열기
                                                            >
                                                                구매 확정
                                                            </a>
                                                        )}
                                                        {/* '구매 완료' 상태일 때만 '후기 남기기' 버튼 표시 */}
                                                        {item.status === '구매 완료' && (
                                                            <button
                                                                className="review-btn"
                                                                style={{ textAlign: 'right' }}
                                                                onClick={() => handleModalOpen('review', item.id)} // 'review' 모달 열기
                                                            >
                                                                후기 남기기
                                                            </button>
                                                        )}

                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className='nothing_at_all'>해당 카테고리에 해당하는 구매 내역이 없습니다.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* 모달 */}
                        {isModalOpen && (
                            <div className='layer lg'>
                                <div className='layer-background' onClick={handleModalClose}></div>
                                <div
                                    className={`layer_container ${modalType === "confirm" ? "confirm-modal" : "review-modal"
                                        }`}
                                >
                                    {modalType === 'confirm' && (
                                        <>
                                            <div className="layer_header">
                                                <h2 className="title">구매 확정</h2>
                                            </div>
                                            <div className='layer_content'>
                                                <div className='size_list_area'>
                                                    <h5>Saint Kream에서는 구매확정을 하는 즉시, 확정 취소가 불가능해요.<br /><br /></h5>
                                                    <p className="description_text">
                                                        확정 뒤 3일 후 상품 판매 대금이 판매자에게 정산되고 난 후에는 상품을 취소 및 반품 요청을 할 수 없어요.<br /><br />
                                                        혹시 판매자가 배송 전 구매확정을 요청했나요?<br /><br />
                                                        배송완료 이전에 판매자가 구매확정을 요청하는 거래는 사기 위험이 높아요.<br />
                                                        이런 행위를 하는 판매자를 만났다면 1:1 문의를 통해 신고를 접수해 주세요.<br /><br />
                                                    </p>
                                                    <p className='Fraud_Prevention'>사기 피해 방지를 위해 반드시 상품을 수령한 후<br /> 상품 상태를 확인 후에 구매확정 해주세요.<br /> </p>
                                                </div>
                                                <div className="layer_btn">
                                                    <button className="btn solid medium" onClick={handleModalClose}>확인</button>
                                                    <button className="btn solid_cancel medium" onClick={handleModalClose}>취소</button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {modalType === 'review' && (
                                        <>
                                            <div className="review_modal-content">
                                                <button className="close-btn" onClick={handleModalClose}>&times;</button>
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
                                                    <button className="cancel-btn" onClick={handleModalClose}>취 소</button>
                                                    <a style={{ width: '20px', color: 'white' }}>.         .        .</a>
                                                    <button className="submit-btn" onClick={handleSubmitReview} disabled={submitting}>
                                                        {submitting ? '제출 중...' : '작성하기'}
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}


                    </div>
                </div>
            </div>
        </div>

    );

}

export default Page;