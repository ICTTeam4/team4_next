"use client";
import { usePathname } from 'next/navigation';
import MyPageSideNav from '../components/MyPageSideNav';
import './myPageProfileInfo.css';
import { useEffect, useRef, useState } from 'react';
import useAuthStore from "../../../store/authStore";
import axios from 'axios';

function Page(props) {
    const pathname = usePathname();

    const API_BASE_URL = "http://localhost:8080"; // 백엔드 서버 URL
    const { user, login } = useAuthStore(); // Zustand에서 user 가져오기


    const [isEditing, setIsEditing] = useState(false); // 프로필 변경 상태 관리
    const [editingField, setEditingField] = useState(null); // 현재 수정 중인 필드
    const [profileName, setProfileName] = useState(user?.nickname || "사용자 닉네임"); // 프로필 이름
    const [userName, setUserName] = useState(user?.name || "사용자 이름"); // 사용자 이름
    const [tempProfileName, setTempProfileName] = useState(profileName); // 임시 프로필 이름
    const [tempUserName, setTempUserName] = useState(userName); // 임시 사용자 이름
    const [profileImage, setProfileImage] = useState(user?.profile_image ||"/images/JH_userImg.png"); // 초기 이미지 상태 추가

    const profileNameInputRef = useRef(null);
    const userNameInputRef = useRef(null);
    const fileInputRef = useRef(null); // 파일 입력 ref 추가

    const handleEditClick = (field) => {
        setIsEditing(true);
        setEditingField(field); // 수정 중인 필드 설정
        if (field === "profileName") {
            setTempProfileName(profileName); // 현재 프로필 이름 값으로 초기화
            setTimeout(() => profileNameInputRef.current?.focus(), 0);
        } else if (field === "userName") {
            setTempUserName(userName); // 현재 사용자 이름 값으로 초기화
            setTimeout(() => userNameInputRef.current?.focus(), 0);
        }
    };

    const handleCancelClick = () => {
        setIsEditing(false); // 수정 상태 종료
        setEditingField(null); // 수정 중인 필드 초기화
    };


    const handleSaveClick = async () => {
        if (editingField === "profileName") {
            try {
                const response = await axios.put(`${API_BASE_URL}/members/update-nickname`, {
                    email: user.email, // 사용자 이메일
                    newNickname: tempProfileName, // 새로운 닉네임
                });
            
                if (response.status === 200 && response.data.status === "success") {
                    setProfileName(tempProfileName); // 프로필 이름 업데이트
                    login({ ...user, nickname: tempProfileName }, user.token); // Zustand 상태 업데이트
                    alert("닉네임이 성공적으로 변경되었습니다.");
                } else {
                    alert("닉네임 변경 실패: " + response.data.message);
                }
            } catch (error) {
                console.error("닉네임 변경 중 오류:", error);
                alert("닉네임 변경 중 오류가 발생했습니다.");
            }
        }

        setIsEditing(false); // 수정 상태 종료
        setEditingField(null); // 수정 중인 필드 초기화
    };    

    // const handleSaveClick = () => {
    //     if (editingField === "profileName") {
    //         setProfileName(tempProfileName); // 프로필 이름 저장
    //     } else if (editingField === "userName") {
    //         setUserName(tempUserName); // 사용자 이름 저장
    //     }
    //     setIsEditing(false); // 수정 상태 종료
    //     setEditingField(null); // 수정 중인 필드 초기화
    // };

    // const uploadImageToServer = async (file) => {
    //     const formData = new FormData();
    //     formData.append('profileImage', file);

    //     try {
    //         const response = await fetch('/api/upload', { // 실제 API 엔드포인트로 변경해야 함함
    //             method: 'POST',
    //             body: formData,
    //         });
    //         const data = await response.json();
    //         if (response.ok){
    //             setProfileImage(data.imageUrl); // 서버에서 반환한 이미지 URL로 업데이트
    //         }else{
    //             console.error('이미지 업로드 실패: ', data.message);
    //         }
    //     } catch (error) {
    //         console.error('이미지 업로드 중 오류 발생: ', error);
    //     }
    // };

    // const handleImageChange = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    //         if(!validImageTypes.includes(file.type)){
    //             alert('지원되지 않는 파일 형식입니다. JPG, PNG, GIF 파일만 업로드할 수 있습니다.');
    //             return;
    //         }

    //         const maxSize = 5 * 1024 * 1024; // 5MB
    //         if(file.size > maxSize){
    //             alert("파일 크기가 너무 큽니다. 최대 5MB까지 업로드할 수 있습니다.");
    //             return;
    //         }
            
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setProfileImage(reader.result);
    //             // 여기서 서버로 이미지를 업로드할 수 있음
    //             // 예: uploadImageToServer(file);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    // const handleImageChangeClick = () => {
    //     if(fileInputRef.current){
    //         fileInputRef.current.click();
    //     }
    // };

    // 서버에서 최신 유저 정보를 가져오는 함수
    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/members/get-profile`, {
                params: { email: user?.email }, // user가 null인 경우를 방어
            });
    
            if (response.data.success) {
                console.log("프로필 정보:", response.data.user);
                login(response.data.user, user.token); // Zustand 상태 업데이트
                setProfileName(response.data.user.nickname);
                setProfileImage(response.data.user.profile_image);
            } else {
                console.error("프로필 정보를 가져오지 못했습니다.");
            }
        } catch (error) {
            console.error("프로필 정보 로드 중 오류:", error);
        }
    };
    

// 페이지 로드 시 최신 유저 정보 가져오기
useEffect(() => {
    if (user && user.email) {
        fetchUserData(); // 유저가 유효할 경우 데이터 가져오기
    } else {
        console.error("로그인이 필요합니다.");
    }
}, [user]);


const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!user || !user.email) {
        alert("로그인이 필요합니다.");
        return;
    }

    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validImageTypes.includes(file.type)) {
        alert("지원되지 않는 파일 형식입니다. JPG, PNG, GIF 파일만 업로드할 수 있습니다.");
        return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
        alert("파일 크기가 너무 큽니다. 최대 5MB까지 업로드할 수 있습니다.");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", user.email);

    try {
        const response = await axios.post(`${API_BASE_URL}/members/upload-profile-image`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (response.data.status === "success") {
            const imageUrl = response.data.imageUrl;
            setProfileImage(imageUrl); // 프로필 이미지 상태 업데이트
            login({ ...user, profile_image: imageUrl }, user.token); // Zustand 상태 업데이트
            alert("프로필 이미지가 성공적으로 변경되었습니다.");
        } else {
            alert("이미지 업로드 실패: " + response.data.message);
        }
    } catch (error) {
        console.error("이미지 업로드 중 오류:", error);
        alert("이미지 업로드 중 오류가 발생했습니다.");
    }
};


    
    

    // const handleImageDelete = () => {
    //     setProfileImage("/images/JH_userImg.png"); // 기본이미지로 되돌리기
    //     // 필요시 서버에서 이미지를 삭제하는 로직을 추가할 수 있습니다.
    // };

    const handleImageDelete = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/members/delete-profile-image`, {
                email: user.email,
            });
    
            if (response.data.status === "success") {
                const defaultImage = "/images/JH_userImg.png";
                setProfileImage(defaultImage);
                login({ ...user, profile_image: defaultImage }, user.token);
                alert("프로필 이미지가 기본값으로 초기화되었습니다.");
            } else {
                alert("이미지 삭제 실패: " + response.data.message);
            }
        } catch (error) {
            console.error("이미지 삭제 중 오류:", error);
            alert("이미지 삭제 중 오류가 발생했습니다.");
        }
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
                            <input 
                            type="file" 
                            ref={fileInputRef}
                            hidden
                            accept='image/*'
                            onChange={handleImageChange} 
                            />
                            <div className='profile_thumb'>
                            <img
                                    src={profileImage.startsWith("/uploads") ? `${API_BASE_URL}${profileImage}` : profileImage}
                                    alt="사용자 이미지"
                                    className="thumb_img"
                                />
                                </div>
                            <div className='profile_detail'>
                                <strong className='name'>{profileName}</strong>
                                <div className='profile_btn_box'>
                                    <button 
                                    type="button" 
                                    className='btn outlinegrey small'
                                    onClick={() => fileInputRef.current?.click()}
                                    > 이미지 변경 </button>
                                    <button 
                                    type="button" 
                                    className='btn outlinegrey small'
                                    onClick={handleImageDelete}
                                    > 삭제 </button>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    hidden
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
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
                                                    ref={profileNameInputRef}
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
                                {/* {isEditing && editingField === "userName" ? (
                                    <div className="modify name">
                                        <div className="input_box">
                                            <h6 className="input_title">이름</h6>
                                            <div className="input_item">
                                                <input
                                                    ref={userNameInputRef}
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
                                )}  */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Page;