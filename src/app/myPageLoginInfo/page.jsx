"use client";
import { usePathname } from 'next/navigation';
import MyPageSideNav from '../components/MyPageSideNav';
import './myPageLoginInfo.css';
import { useState } from 'react';

function Page(props) {
    const pathname = usePathname();
    const [isActive, setIsActive] = useState(false);

    const toggleSwitch = () => {
        setIsActive(!isActive);
    };

    return (

        <div className='myPageLoginInfo'>
            <div className='container my lg'>
                <MyPageSideNav currentPath={pathname} />
                <div className='content_area my-page-content'>
                    <div className='my_profile'>
                        <div className='content_title border'>
                            <div className='main_title'>
                                <h3>로그인 정보</h3>
                            </div>
                        </div>
                        {/* 타이틀 끝 */}
                        <div className='profile_info'>
                            <div className='profile_group first'>
                                <h4 className='group_title'>내 계정</h4>
                                <div className='unit'>
                                    <h5 className='title'>이메일 주소</h5>
                                    <div className='unit_content'>
                                        <p className='desc email'>
                                            em*i*@naver.com
                                        </p>
                                        <button type='button'
                                            className='btn btn_modify outlinegrey small'> 변경 </button>
                                    </div>
                                </div>

                                <div className='unit'>
                                    <h5 className='title'>비밀번호</h5>
                                    <div className='unit_content'>
                                        <p className='desc password'>
                                            ●●●●●●●●●
                                        </p>
                                        <button type='button'
                                            className='btn btn_modify outlinegrey small'> 변경 </button>
                                    </div>
                                </div>

                            </div>
                            <div className='profile_group'>
                                <h4 className='group_title'>개인 정보</h4>
                                <div className='unit'>
                                    <h5 className='title'>휴대폰 번호</h5>
                                    <div className='unit_content'>
                                        <p className='desc'>
                                            010-1***-*678
                                        </p>
                                        <button type='button'
                                            className='btn btn_modify outlinegrey small'> 변경 </button>
                                    </div>
                                </div>
                            </div>
                            <div className='profile_group'>
                                <h4 className='group_title'>광고성 정보 수신</h4>
                                <div className='unit unit--toggle' style={{ paddingBottom: "8px" }}>
                                    <div className='unit_content'>
                                        <p className='desc my-profile__term-desc'>
                                            <span>개인 정보 수집 및 이용 동의</span>
                                            <button type="button" className="btn"> 내용보기 </button>
                                        </p>
                                        <div
                                            className={`base-switch ${isActive ? 'is-active' : ''}`}
                                            onClick={toggleSwitch}
                                            style={{'--75b83bce' : '#e4e4e4',
                                                    '--30d0adec' : '#fff',
                                                    '--6d656928' : '#222222'
                                            }}
                                        >
                                            <div className='circle'></div>
                                        </div>
                                    </div>
                                </div>
                                <div className='unit unit--toggle' style={{ paddingBottom: "8px" }}>
                                    <div className='unit_content'>
                                        <p className='desc my-profile__term-desc'>
                                            <span>이메일</span>
                                        </p>
                                        <div
                                            className={`base-switch ${isActive ? 'is-active' : ''}`}
                                            onClick={toggleSwitch}
                                            style={{'--75b83bce' : '#e4e4e4',
                                                    '--30d0adec' : '#fff',
                                                    '--6d656928' : '#222222'
                                            }}
                                        >
                                            <div className='circle'></div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <a href="#" className='btn_withdrawal'>회원 탈퇴</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Page;