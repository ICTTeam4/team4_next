"use client";
import { usePathname } from 'next/navigation';
import MyPageSideNav from '../components/MyPageSideNav';
import './myPageProfileInfo.css';
import { useState } from 'react';

function Page(props) {
    const pathname = usePathname();
    const [isEditing, setIsEditing] = useState(false); // 프로필 변경 상태 관리
    const [editingField, setEditingField] = useState(null); // 현재 수정 중인 필드
    const [profileName, setProfileName] = useState("사용자 닉네임"); // 프로필 이름
    const [userName, setUserName] = useState("사용자 이름"); // 사용자 이름
    const [tempProfileName, setTempProfileName] = useState(profileName); // 임시 프로필 이름
    const [tempUserName, setTempUserName] = useState(userName); // 임시 사용자 이름



    const handleEditClick = (field) => {
        setIsEditing(true);
        setEditingField(field); // 수정 중인 필드 설정
        if (field === "profileName") {
            setTempProfileName(profileName); // 현재 프로필 이름 값으로 초기화
        } else if (field === "userName") {
            setTempUserName(userName); // 현재 사용자 이름 값으로 초기화
        }
    };

    const handleCancelClick = () => {
        setIsEditing(false); // 수정 상태 종료
        setEditingField(null); // 수정 중인 필드 초기화
    };

    const handleSaveClick = () => {
        if (editingField === "profileName") {
            setProfileName(tempProfileName); // 프로필 이름 저장
        } else if (editingField === "userName") {
            setUserName(tempUserName); // 사용자 이름 저장
        }
        setIsEditing(false); // 수정 상태 종료
        setEditingField(null); // 수정 중인 필드 초기화
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
                                <strong className='name'>{profileName}</strong>
                                <div className='profile_btn_box'>
                                    <button type="button" className='btn outlinegrey small'> 이미지 변경 </button>
                                    <button type="button" className='btn outlinegrey small'> 삭제 </button>
                                </div>
                            </div>
                        </div>
                        <div className='profile_info'>
                            <div className='profile_group first'>
                                <h4 className='group_title'>프로필 정보</h4>
                                {isEditing && editingField === "profileName" ? (
                                    <div className="modify name">
                                        <div className="input_box">
                                            <h6 className="input_title">프로필 이름</h6>
                                            <div className="input_item">
                                                <input
                                                    type="text"
                                                    value={tempProfileName}
                                                    onChange={(e) => setTempProfileName(e.target.value)}
                                                    placeholder="나만의 프로필 이름"
                                                    autoComplete="off"
                                                    maxLength="25"
                                                    className="input_txt"
                                                />
                                            </div>
                                        </div>
                                        <div className="modify_btn_box">
                                            <button
                                                type="button"
                                                className="btn outlinegrey medium"
                                                onClick={handleCancelClick}
                                            >
                                                취소
                                            </button>
                                            <button
                                                type="button"
                                                className="btn solid medium"
                                                onClick={handleSaveClick}
                                            >
                                                저장
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='unit'>
                                        <h5 className='title'>프로필 이름</h5>
                                        <div className='unit_content'>
                                            <p className='desc desc_modify'>{profileName}</p>
                                            <button
                                                type='button'
                                                className='btn btn_modify outlinegrey small'
                                                onClick={() => handleEditClick("profileName")}
                                            >
                                                변경
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {isEditing && editingField === "userName" ? (
                                    <div className="modify name">
                                        <div className="input_box">
                                            <h6 className="input_title">사용자 이름</h6>
                                            <div className="input_item">
                                                <input
                                                    type="text"
                                                    value={tempUserName}
                                                    onChange={(e) => setTempUserName(e.target.value)}
                                                    placeholder="사용자 이름 입력"
                                                    autoComplete="off"
                                                    maxLength="25"
                                                    className="input_txt"
                                                />
                                            </div>
                                        </div>
                                        <div className="modify_btn_box">
                                            <button
                                                type="button"
                                                className="btn outlinegrey medium"
                                                onClick={handleCancelClick}
                                            >
                                                취소
                                            </button>
                                            <button
                                                type="button"
                                                className="btn solid medium"
                                                onClick={handleSaveClick}
                                            >
                                                저장
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='unit'>
                                        <h5 className='title'>이름</h5>
                                        <div className='unit_content'>
                                            <p className='desc desc_modify'>{userName}</p>
                                            <button
                                                type='button'
                                                className='btn btn_modify outlinegrey small'
                                                onClick={() => handleEditClick("userName")}
                                            >
                                                변경
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Page;