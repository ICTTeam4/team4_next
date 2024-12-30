"use client"
import { Button, Checkbox, FormControlLabel, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import Terms from './Terms';
import MarketingPolicy from './MarketingPolicy';
import PrivacyPolicy from './PrivacyPolicy';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const router = useRouter();
  const LOCAL_API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL;
  const API_URL = `${LOCAL_API_BASE_URL}/members/register`;


  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);


  const [authCode, setAuthCode] = useState(""); // 인증번호 입력값
  const [isPhoneVerified, setIsPhoneVerified] = useState(false); // 인증 완료 여부


  const initUser = {
    nickname : "",
    name: "",
    email: "",
    tel_no: "",
    password: "",
    confirmPassword: ""
  };

  const [user, setUser] = useState(initUser);
  const [agreements, setAgreements] = useState({
    all: false,
    age: false,
    terms: false,
    privacy: false,
    optionalPrivacy: false,
    optionalMarketing: false
  });

  // const isRegisterDisabled = !user.name || !user.email || !user.tel_no || !user.password || user.password !== user.confirmPassword || !agreements.age || !agreements.terms || !agreements.privacy;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
    if (name === 'nickname') {
      setIsNicknameChecked(false); // 닉네임 수정 시 중복 확인 상태 초기화
    }
    if (name === 'email') {
      setIsEmailChecked(false); // 이메일 수정 시 중복 확인 상태 초기화
    }
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 3) {
      value = value;
    } else if (value.length <= 7) {
      value = value.slice(0, 3) + "-" + value.slice(3);
    } else {
      value = value.slice(0, 3) + "-" + value.slice(3, 7) + "-" + value.slice(7, 11);
    }
    setUser(prev => ({ ...prev, tel_no: value }));
  };


  const handleVerifyPhoneAuth = async () => {
    if (!authCode) {
      alert("인증번호를 입력하세요.");
      return;
    }
  
    try {
      const response = await axios.post(`${LOCAL_API_BASE_URL}/members/verify-phone-auth`, null, {
        params: { phone: user.tel_no, code: authCode },
      });
      alert(response.data.message);
      setIsPhoneVerified(true); // 인증 성공
    } catch (error) {
      console.error("인증번호 검증 오류:", error);
      alert("인증번호 검증에 실패했습니다. 다시 시도해주세요.");
      setIsPhoneVerified(false); // 인증 실패
    }
  };
  

  const handleAgreementChange = (e) => {
    const { name, checked } = e.target;
    if (name === "all") {
      setAgreements({
        all: checked,
        age: checked,
        terms: checked,
        privacy: checked,
        optionalPrivacy: checked,
        optionalMarketing: checked
      });
    } else {
      setAgreements(prev => ({
        ...prev,
        [name]: checked,
        all: prev.age && prev.terms && prev.privacy && checked // 모두 동의 업데이트
      }));
    }
  };

  const handleCheckNickname = async () => {
    try {
      const response = await axios.get(`${LOCAL_API_BASE_URL}/members/check-nickname`, {
        params: { nickname: user.nickname }
      });
      if (response.data) {
        alert("사용 가능한 닉네임입니다.");
        setIsNicknameChecked(true); // 닉네임 중복 확인 성공
      } else {
        alert("이미 사용 중인 닉네임입니다.");
        setIsNicknameChecked(false);
      }
    } catch (error) {
      console.error("닉네임 중복 확인 오류:", error);
      alert("닉네임 확인 중 문제가 발생했습니다.");
      setIsNicknameChecked(false);
    }
  };


const handleCheckEmail = async () => {
  try {
    const response = await axios.get(`${LOCAL_API_BASE_URL}/members/check-email`, {
      params: { email: user.email }
    });
    if (response.data) {
      alert("사용 가능한 이메일입니다.");
      setIsEmailChecked(true); // 이메일 중복 확인 성공
    } else {
      alert("이미 사용 중인 이메일입니다.");
      setIsEmailChecked(false);
    }
  } catch (error) {
    console.error("이메일 중복 확인 오류:", error);
    alert("이메일 확인 중 문제가 발생했습니다.");
    setIsEmailChecked(false);
  }
};

const handleSendPhoneAuth = async () => {
  if (!user.tel_no) {
    alert("휴대전화 번호를 입력하세요.");
    return;
  }

  try {
    const response = await axios.post(`${LOCAL_API_BASE_URL}/members/send-phone-auth`, null, {
      params: { phone: user.tel_no },
    });
    alert(response.data.message); // 성공 메시지 표시
  } catch (error) {
    console.error("휴대폰 인증 요청 오류:", error);
    alert("휴대폰 인증 요청에 실패했습니다. 다시 시도해주세요.");
  }
};



const goServer = async () => {
  console.log("회원가입 데이터:", user); // 요청 데이터 확인

  try {
    const response = await axios.post(API_URL, user, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    console.log("서버 응답 알려줘!!!!:", response.data); // 서버 응답 데이터 확인

    // 응답 메시지 확인
    if (response.data.message === "회원가입 성공") {
      alert(response.data.message); // 성공 메시지 표시
      router.push("/login"); // 로그인 페이지로 이동
    } else {
      alert(response.data.message); // 실패 메시지 표시
    }
  } catch (error) {
    console.error("회원가입 요청 중 오류:", error.response?.data || error.message);
    alert("회원가입 요청에 실패했습니다. 다시 시도해주세요.");
  }
};



  const [openModal, setOpenModal] = useState(false);
  const [openMarketingPolicy, setOpenMarketingPolicy] = useState(false);
  const [openPrivacyPolicy, setOpenPrivacyPolicy] = useState(false);

  return (
    <div style={{ backgroundColor: '#f7f7f7', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Paper elevation={0} style={{ width: '480px', padding: '40px', borderRadius: '10px', marginTop: '10px', marginBottom:'10px' }}>
        <Typography variant="h5" component="h1" style={{ marginBottom: '30px', marginTop:'0px', textAlign: 'left', fontWeight: 'bold' }}>
          회원가입
        </Typography>
        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
          <label style={{ marginBottom: '5px', fontSize: '14px', color: '#333', fontWeight: 'bold', textAlign: 'left' }}>닉네임</label>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <TextField variant="standard"
              name='nickname'
              value={user.nickname}
              onChange={handleChange}
              type="text"
              placeholder="닉네임을 입력하세요"
              style={{
                flex: 1,
                padding: '10px',
                backgroundColor: 'transparent'
              }}
            />
            <Button
              type="button"
              variant="outlined"
              style={{ marginLeft: '10px', padding: '4px 10px', backgroundColor: '#f5f5f5', color: '#333', border: '1px solid #ddd' }}
              onClick={handleCheckNickname}
            >
              중복 확인
            </Button>
          </div>

          <label style={{ marginBottom: '5px', fontSize: '14px', color: '#333', fontWeight: 'bold', textAlign: 'left' }}>이메일 주소</label>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <TextField variant="standard"
              name='email'
              value={user.email}
              onChange={handleChange}
              type="email"
              placeholder="예) ict@ict.com"
              style={{
                flex: 1,
                padding: '10px',
                outline: 'none',
                backgroundColor: 'transparent'
              }}
            />
            <Button
              type="button"
              variant="outlined"
              style={{ marginLeft: '10px', padding: '4px 10px', backgroundColor: '#f5f5f5', color: '#333', border: '1px solid #ddd' }}
              onClick={handleCheckEmail}
            >
              중복 확인
            </Button>
          </div>

          <label style={{ marginBottom: '5px', fontSize: '14px', color: '#333', fontWeight: 'bold', textAlign: 'left' }}>휴대전화 번호</label>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
          <TextField
                variant="standard"
                name="tel_no"
                value={user.tel_no}
                onChange={handlePhoneChange}
                type="tel"
                disabled={!isNicknameChecked || !isEmailChecked}
                placeholder="010-1234-5678"
                style={{
                  flex: 1,
                  padding: '10px',
                  outline: 'none',
                  backgroundColor: 'transparent',
                }}
              />
             <Button
                  type="button"
                  variant="outlined"
                  style={{
                    marginLeft: '10px',
                    padding: '4px 10px',
                    backgroundColor: '#f5f5f5',
                    color: '#333',
                    border: '1px solid #ddd',
                  }}
                  onClick={handleSendPhoneAuth}
                >
                  휴대폰 인증 요청
                </Button>
              </div>

               {/* 인증번호 입력 및 검증 */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                  <TextField
                    variant="standard"
                    name="authCode"
                    value={authCode}
                    onChange={(e) => setAuthCode(e.target.value)}
                    type="text"
                    placeholder="인증번호 입력"
                    disabled={!user.tel_no}
                    style={{
                      flex: 1,
                      padding: '10px',
                      outline: 'none',
                      backgroundColor: 'transparent',
                    }}
                  />
                  <Button
                    type="button"
                    variant="outlined"
                    style={{
                      marginLeft: '10px',
                      padding: '4px 10px',
                      backgroundColor: '#f5f5f5',
                      color: '#333',
                      border: '1px solid #ddd',
                    }}
                    onClick={handleVerifyPhoneAuth}
                    disabled={!user.tel_no || isPhoneVerified}
                  >
                    인증번호 확인
                  </Button>
                </div>     




          <label style={{ marginBottom: '5px', fontSize: '14px', color: '#333', fontWeight: 'bold', textAlign: 'left' }}>비밀번호</label>
          <TextField variant="standard"
            name='password'
            value={user.password}
            onChange={handleChange}
            type="password"
            placeholder="비밀번호를 입력하세요"
            disabled={!isNicknameChecked || !isEmailChecked}
            style={{
              padding: '10px',
              marginBottom: '15px',
              outline: 'none',
              backgroundColor: 'transparent'
            }}
          />

          <label style={{ marginBottom: '5px', fontSize: '14px', color: '#333', fontWeight: 'bold', textAlign: 'left' }}>비밀번호 확인</label>
          <TextField variant="standard"
            name='confirmPassword'
            value={user.confirmPassword}
            onChange={handleChange}
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            disabled={!isNicknameChecked || !isEmailChecked}
            style={{
              padding: '10px',
              marginBottom: '10px',
              outline: 'none',
              backgroundColor: 'transparent'
            }}
          />
          {user.password !== user.confirmPassword && user.confirmPassword && (
            <Typography style={{ color: 'red', fontSize: '12px', marginBottom: '15px' }}>
              비밀번호를 확인해주세요.
            </Typography>
          )}

          <div style={{ width: '100%', marginTop: '15px', marginBottom: '20px', textAlign: 'left' }}>
            <FormControlLabel
              control={
                <Checkbox
                  name="all"
                  checked={agreements.all}
                  onChange={handleAgreementChange}
                  sx={{ padding: '0 10px', color: 'black', '&.Mui-checked': { color: 'black' } }}
                />
              }
              label={<span style={{ fontWeight: 'bold', color: 'black' }}>모두 동의합니다</span>}
              sx={{ color: '#333' }}
            />
            <div>
              <Typography variant="caption" sx={{ color: 'black', marginLeft: '35px', marginBottom: '10px' }}>
                선택 동의항목 포함
              </Typography>
            </div>

            <div style={{ marginLeft: '35px' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="age"
                    checked={agreements.age}
                    onChange={handleAgreementChange}
                    sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
                  />
                }
                label={<span style={{ color: 'black' }}>[필수] 만 14세 이상입니다</span>}
                sx={{ display: 'block', marginBottom: '5px', color: 'black' }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="terms"
                    checked={agreements.terms}
                    onChange={handleAgreementChange}
                    sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
                  />
                }
                label={
                  <span style={{ color: 'black' }}>
                    [필수] 이용약관 동의
                    <Button
                      onClick={() => setOpenModal(true)}
                      sx={{ fontSize: '12px', color: 'black', textDecoration: 'underline' }}
                    >
                      내용 보기
                    </Button>
                  </span>
                }
                sx={{ display: 'block', marginBottom: '5px', color: 'black' }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="privacy"
                    checked={agreements.privacy}
                    onChange={handleAgreementChange}
                    sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
                  />
                }
                label={
                  <span style={{ color: 'black' }}>
                    [필수] 개인정보 수집 및 이용 동의
                    <Button
                      onClick={() => setOpenPrivacyPolicy(true)}
                      sx={{ fontSize: '12px', color: 'black', textDecoration: 'underline' }}
                    >
                      내용 보기
                    </Button>
                  </span>
                }
                sx={{ display: 'block', marginBottom: '5px', color: 'black' }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="optionalMarketing"
                    checked={agreements.optionalMarketing}
                    onChange={handleAgreementChange}
                    sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
                  />
                }
                label={
                  <span style={{ color: 'black' }}>
                    [선택] 광고성 정보 수신 동의
                    <Button
                      onClick={() => setOpenMarketingPolicy(true)}
                      sx={{ fontSize: '12px', color: 'black', textDecoration: 'underline' }}
                    >
                      펼치기
                    </Button>
                  </span>
                }
                sx={{ display: 'block', marginBottom: '5px', color: 'black' }}
              />
            </div>
          </div>


          <Button
            fullWidth
            variant='contained'
            // disabled={isRegisterDisabled}
            disabled={
              !agreements.age || // 만 14세 이상 동의 여부
              !agreements.terms || // 이용약관 동의 여부
              !agreements.privacy || // 개인정보 수집 동의 여부
              !isNicknameChecked || // 닉네임 중복 확인이 완료되지 않았을 때 비활성화
              !isEmailChecked || // 이메일 중복 확인이 완료되지 않았을 때 비활성화
              !isPhoneVerified || // 휴대폰 인증 여부
              !user.password ||
              user.password !== user.confirmPassword
            }
            style={{
              // backgroundColor: isRegisterDisabled ? 'lightgray' : '#333',
              color: 'white',
              padding: '10px',
              borderRadius: '5px',
              fontWeight: 'bold'
            }} onClick={goServer}>
            가입하기
          </Button>
          <Terms open={openModal} onClose={() => setOpenModal(false)} />
          <MarketingPolicy open={openMarketingPolicy} onClose={() => setOpenMarketingPolicy(false)} />
          <PrivacyPolicy open={openPrivacyPolicy} onClose={() => setOpenPrivacyPolicy(false)} />
        </form>
      </Paper>
    </div>
  );
};

export default RegisterPage;