"use client"
import { Button, Checkbox, FormControlLabel, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import Terms from './Terms';
import MarketingPolicy from './MarketingPolicy';
import PrivacyPolicy from './PrivacyPolicy';
import { useRouter } from 'next/navigation';
import './register.css'; // Import the CSS file

const RegisterPage = () => {
  const router = useRouter();
  const LOCAL_API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL;
  const API_URL = `${LOCAL_API_BASE_URL}/members/register`;
  const [openModal, setOpenModal] = useState(false); // Modal state
  const [openMarketingPolicy, setOpenMarketingPolicy] = useState(false);
  const [openPrivacyPolicy, setOpenPrivacyPolicy] = useState(false);
  const [authCode, setAuthCode] = useState(""); // 인증번호 입력값
  const [isPhoneVerified, setIsPhoneVerified] = useState(false); // 인증 완료 여부
  const [agreements, setAgreements] = useState({
    all: false,
    age: false,
    terms: false,
    privacy: false,
    optionalPrivacy: false,
    optionalMarketing: false
  });
  const initUser = {
    nickname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  };
  const [user, setUser] = useState(initUser);
  const isRegisterDisabled = !user.nickname || !user.email || !user.phone || !user.password || user.password !== user.confirmPassword || !agreements.age || !agreements.terms || !agreements.privacy;
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
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
    setUser(prev => ({ ...prev, phone: value }));
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
        all: false
      }));
    }
  };




  return (
    <div className="register-container">
      <Paper elevation={0} className="register-paper">
        <Typography variant="h5" component="h1" className="register-title">
          회원가입
        </Typography>
        <form className="register-form">
          <label className="register-label">닉네임</label>
          <div className="input-group">
            <TextField
              variant="standard"
              name='nickname'
              value={user.nickname}
              onChange={handleChange}
              type="text"
              placeholder="닉네임을 입력하세요"
              className="text-field"
              sx={{
                "& .MuiInputBase-root": {
                  backgroundColor: "#ffffff", // 원하는 바탕색 설정
                },
                "& .Mui-focused .MuiInputBase-root": {
                  backgroundColor: "#f0f0f0", // 포커스 시 바탕색 설정
                },
              }}
            />
            <Button
              type="button"
              variant="outlined"
              className="action-button"
            >
              중복 확인
            </Button>
          </div>

          <label className="register-label">이메일 주소</label>
          <div className="input-group">
            <TextField
              variant="standard"
              name='email'
              value={user.email}
              onChange={handleChange}
              type="email"
              placeholder="예) ict@ict.com"
              className="text-field"
            />
            <Button
              type="button"
              variant="outlined"
              className="action-button"
            >
              중복 확인
            </Button>
          </div>

          <label className="register-label">휴대전화 번호</label>
          <div className="input-group">
            <TextField
              variant="standard"
              name="tel_no"
              value={user.tel_no}
              onChange={handlePhoneChange}
              type="tel"
              disabled={!isNicknameChecked || !isEmailChecked}
              placeholder="010-1234-5678"
              className="text-field-phone"
            />
            <Button
              type="button"
              variant="outlined"
              className="action-button tell_btn"
            >
              휴대폰 인증
            </Button>
          </div>
          <div className="input-group">
            <TextField
              variant="standard"
              name='authCode'
              value={authCode}
              onChange={handlePhoneChange}
              type="text"
              placeholder="인증 번호를 입력하세요"
              disabled={!user.tel_no}
              className="text-field-phone"
            />
            <Button
              type="button"
              variant="outlined"
              className="action-button tell_btn"
              onClick={handleVerifyPhoneAuth}
              disabled={!user.tel_no || isPhoneVerified}
            >
              인증번호 확인
            </Button>
          </div>

          <label className="register-label">비밀번호</label>
          <TextField
            variant="standard"
            name='password'
            value={user.password}
            onChange={handleChange}
            type="password"
            placeholder="비밀번호를 입력하세요"
            className="password-field"
          />

          <label className="register-label">비밀번호 확인</label>
          <TextField
            variant="standard"
            name='confirmPassword'
            value={user.confirmPassword}
            onChange={handleChange}
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            className="confirm-password-field"
          />
          {user.password !== user.confirmPassword && user.confirmPassword && (
            <Typography className="password-error">
              비밀번호를 확인해주세요.
            </Typography>
          )}

          <div className="agreements-section">
            <FormControlLabel
              control={
                <Checkbox
                  name="all"
                  checked={agreements.all}
                  onChange={handleAgreementChange}
                  className="agreement-checkbox"
                />
              }
              label={<span className="agreements-label">모두 동의합니다</span>}
            />
            <div>
              <Typography variant="caption" className="agreements-caption">
                선택 동의항목 포함
              </Typography>
            </div>

            <div className="agreements-options">
              <FormControlLabel
                control={
                  <Checkbox
                    name="age"
                    checked={agreements.age}
                    onChange={handleAgreementChange}
                    className="agreement-checkbox"
                  />
                }
                label={<span className="agreement-label">[필수] 만 14세 이상입니다</span>}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="terms"
                    checked={agreements.terms}
                    onChange={handleAgreementChange}
                    className="agreement-checkbox"
                  />
                }
                label={
                  <span className="agreement-label">
                    [필수] 이용약관 동의
                    <Button
                      onClick={() => setOpenModal(true)}
                      className="policy-button"
                    >
                      내용 보기
                    </Button>
                  </span>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="privacy"
                    checked={agreements.privacy}
                    onChange={handleAgreementChange}
                    className="agreement-checkbox"
                  />
                }
                label={
                  <span className="agreement-label">
                    [필수] 개인정보 수집 및 이용 동의
                    <Button
                      onClick={() => setOpenPrivacyPolicy(true)}
                      className="policy-button"
                    >
                      내용 보기
                    </Button>
                  </span>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="optionalMarketing"
                    checked={agreements.optionalMarketing}
                    onChange={handleAgreementChange}
                    className="agreement-checkbox"
                  />
                }
                label={
                  <span className="agreement-label">
                    [선택] 광고성 정보 수신 동의
                    <Button
                      onClick={() => setOpenMarketingPolicy(true)}
                      className="policy-button"
                    >
                      펼치기
                    </Button>
                  </span>
                }
              />
            </div>
          </div>


          <Button
            fullWidth
            variant='contained'
            disabled={isRegisterDisabled}
            className={`register-button ${isRegisterDisabled ? 'disabled' : ''}`}
          >
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
