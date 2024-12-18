"use client";
import { usePathname } from 'next/navigation';
import MyPageSideNav from '../components/MyPageSideNav';
import './myPageReviews.css';
import { useState } from 'react';

function Page(props) {
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState('전체');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    }

   // 모달 팝업창 ( 리뷰 쓰는 곳)
const [isModalOpen, setIsModalOpen] = useState(false);
const [rating, setRating] = useState(0); // 별점 상태
const [images, setImages] = useState([]); // 이미지 상태
const [selectedImage, setSelectedImage] = useState(null);

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
const handleRating = (index) => {
  setRating(index + 1); // 클릭된 별까지 색칠 됩니다다
};

// 이미지 업로드
const handleImageUpload = (event) => {
  const files = Array.from(event.target.files);
  const imageUrls = files.map((file) => URL.createObjectURL(file));
  setImages([...images, ...imageUrls]);
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
                        {/* 타이틀 끝 */}
                        <div className='purchase_list sell history'>
                            <div>
                                <div className='sell history'>
                                    <div className='purchase_list_tab sell divider detail_tab'>
                                        <div className={`tab_item ${activeTab === '전체' ? 'tab_on' : ''}`}
                                            onClick={() => handleTabClick('전체')}>
                                            <a href="#" className='tab_link'>
                                                <dl className='tab_box'>
                                                    <dd className='count'>4.9</dd>
                                                    <dt className='title'>상점 평점</dt>
                                                </dl>
                                            </a>
                                        </div>
                                        <div className={`tab_item ${activeTab === '판매 중' ? 'tab_on' : ''}`}
                                            onClick={() => handleTabClick('판매 중')}>
                                            <a href="#" className='tab_link'>
                                                <dl className='tab_box'>
                                                    <dd className='count'>0</dd>
                                                    <dt className='title'>판매자 후기</dt>
                                                </dl>
                                            </a>
                                        </div>
                                        <div className={`tab_item ${activeTab === '진행 중' ? 'tab_on' : ''}`}
                                            onClick={() => handleTabClick('진행 중')}>
                                            <a href="#" className='tab_link'>
                                                <dl className='tab_box'>
                                                    <dd className='count'>0</dd>
                                                    <dt className='title'>구매자 후기</dt>
                                                </dl>
                                            </a>
                                        </div>
                                        <div className={`tab_item ${activeTab === '판매 완료' ? 'tab_on' : ''}`}
                                            onClick={() => handleTabClick('판매 완료')}>
                                            <a href="#" className='tab_link'>
                                                <dl className='tab_box'>
                                                    <dd className='count'>0</dd>
                                                    <dt className='title'>내 후기</dt>
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
                                                    <img alt="product_img" src="/images/JH_myPageReviewImg.png" className='list_item_img' />
                                                </div>
                                                <div className='list_item_title_wrap'>
                                                    <p className='list_item_price'>4.9</p>
                                                    <p className='list_item_title'>물건 잘 받았습니다. 친절한 거래 감사드립니다!</p>
                                                </div>
                                            </div>
                                            <div className='list_item_status'>
                                                <div className='list_item_column column_last'>
                                                    <p className='before_purchase_confirmation'>판매자이름 / 2분 전</p>
                                                    <p className='text-lookup last_title display_paragraph'
                                                        style={{ color: "rgb(34, 34, 34)" }}>내 후기</p>
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
                                                    <img alt="product_img" src="/images/JH_myPageReviewImg.png" className='list_item_img' />
                                                </div>
                                                <div className='list_item_title_wrap'>
                                                    <p className='list_item_price'>4.9</p>
                                                    <p className='list_item_title'>깔끔하고 친절한 거래 감사드립니다! 다음에 또 거래해요!</p>
                                                </div>
                                            </div>
                                            <div className='list_item_status'>
                                                <div className='list_item_column column_last'>
                                                    <p className='after_purchase_confirmation'>구매자이름 / 2분 전</p>
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
                         {/* 모달 팝업 */}
                        {isModalOpen && (
                            <div className="review_modal-overlay">
                                <div className="review_modal-content">
                                    <button className="close-btn" onClick={closeModal}>&times;</button>
                                    <h3>리뷰 작성</h3>
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
                        <textarea placeholder="판매자에게 전하고 싶은 후기를 남겨주세요." rows="5"></textarea>
                        {/* 사진 추가 영역 */}
                        <div className="image-upload" style={{textAlign:'left'}}>
                            <label htmlFor="fileInput" style={{textAlign:'left'}}>사진 추가</label>
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
                            <button className="cancel-btn" onClick={closeModal}>취소</button>
                            <button className="submit-btn">작성하기</button>
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
