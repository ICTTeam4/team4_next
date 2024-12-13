'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './videoBanner.module.css';

const Page = () => {
  const videos = [
    '/videos/video1.mp4',
    '/videos/video2.mp4',
    '/videos/video3.mp4',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef(Array(videos.length).fill(null)); // 초기값을 null로 설정

  // 비디오 슬라이드 변경 함수
  const changeSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  // 슬라이드가 변경되었을 때 현재 비디오 자동 재생
  useEffect(() => {
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      currentVideo.play();
    }
  }, [currentIndex]);

  // 5초마다 자동 슬라이드 전환
  useEffect(() => {
    const interval = setInterval(changeSlide, 20000);
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 interval 해제
  }, []);

  // 페이징 버튼 클릭 시 동영상 인덱스 변경
  const handlePaginationClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className='video-container' style={{textAlign: "center"}}>
    <div className={styles.videoBanner}>
      {/* 비디오 슬라이드 */}
      <div className={styles.videoSlides} style={{backgroundColor:'#000000', height:'414px'}}>
        {videos.map((video, index) => (
          <div
            key={index}
            className={`${styles.videoSlide} ${
              index === currentIndex ? styles.active : ''
            }`}
          >
            {index === currentIndex && ( // 현재 활성 슬라이드만 렌더링
              <video
                ref={(el) => (videoRefs.current[index] = el)} // videoRef 배열에 저장
                className={styles.video} // 로컬 클래스 추가
                muted
                onEnded={changeSlide} // 비디오가 끝났을 때 다음으로 이동
              >
                <source src={video} type="video/mp4" />
                브라우저가 동영상을 지원하지 않습니다.
              </video>
            )}
          </div>
        ))}
      </div>

      {/* 페이징 버튼 */}
      <div className={styles.pagination}>
        {videos.map((_, index) => (
          <span
            key={index}
            className={`${styles.pageDot} ${
              index === currentIndex ? styles.activeDot : ''
            }`}
            onClick={() => handlePaginationClick(index)}
            aria-label={`동영상 ${index + 1}`}
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default Page;
