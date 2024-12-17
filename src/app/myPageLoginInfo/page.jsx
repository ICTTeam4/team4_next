"use client";
import { usePathname } from 'next/navigation';
import MyPageSideNav from '../components/MyPageSideNav';
import './myPageLoginInfo.css';

function Page(props) {
    const pathname = usePathname();

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
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Page;