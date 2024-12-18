"use client";
import { usePathname } from 'next/navigation';
import MyPageSideNav from '../components/MyPageSideNav';
import './myPageProfileInfo.css';
import { useState } from 'react';

function Page(props) {
    const pathname = usePathname();
    const [isActive, setIsActive] = useState(false);

    const toggleSwitch = () => {
        setIsActive(!isActive);
    };

    return (

        <div className='myPageProfileInfo'>
            <div className='container my lg'>
                <MyPageSideNav currentPath={pathname} />
                <div className='content_area my-page-content'>
                    <div className='my_profile'>
                        <div className='content_title border'>
                            <div className='main_title'>
                                <h3>프로필 관리</h3>
                            </div>
                        </div>
                        <div className='user_profile'>
                            <input type="file" hidden="#" />
                            <div className='profile_thumb'>
                                <img src="/images/JH_userImg.png" alt="사용자 이미지" className='thumb_img' />
                            </div>
                            <div className='profile_detail'>
                                <strong className='name'>사용자 이름</strong>
                                <div className='profile_btn_box'>
                                    <button type="button" className='btn outlinegrey small'> 이미지 변경 </button>
                                    <button type="button" className='btn outlinegrey small'> 삭제 </button>
                                </div>
                            </div>
                        </div>
                        <div className='profile_info'>
                            <div className='profile_group first'>
                                <h4 className='group_title'>프로필 정보</h4>
                                <div className='unit'>
                                    <h5 className='title'>프로필 이름</h5>
                                    <div className='unit_content'>
                                        <p className='desc desc_modify'>
                                            사용자 닉네임
                                        </p>
                                        <button type='button'
                                            className='btn btn_modify outlinegrey small'> 변경 </button>
                                    </div>
                                </div>
                                <div className='unit'>
                                    <h5 className='title'>이름</h5>
                                    <div className='unit_content'>
                                        <p className='desc desc_modify'>
                                            사용자 이름
                                        </p>
                                        <button type='button'
                                            className='btn btn_modify outlinegrey small'> 변경 </button>
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