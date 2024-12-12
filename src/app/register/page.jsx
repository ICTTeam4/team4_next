"use client"
import { Button, Checkbox, FormControlLabel, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Terms from './Terms';
import MarketingPolicy from './MarketingPolicy';
import PrivacyPolicy from './PrivacyPolicy';

const RegisterPage = () => {

  const initUser = {
    nickname: "",
    email: "",
    phone: "",
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

  const isRegisterDisabled = !user.nickname || !user.email || !user.phone || !user.password || user.password !== user.confirmPassword || !agreements.age || !agreements.terms || !agreements.privacy;

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

  const [openModal, setOpenModal] = useState(false); // 모달 상태 관리
  const [openMarketingPolicy, setOpenMarketingPolicy] = useState(false);
  const [openPrivacyPolicy, setOpenPrivacyPolicy] = useState(false);


  return (
    <div style={{ backgroundColor: '#f7f7f7', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Paper elevation={0} style={{ width: '400px', padding: '40px', borderRadius: '10px', marginTop: '10px' }}>
        <Typography variant="h5" component="h1" style={{ marginBottom: '30px', textAlign: 'left', fontWeight: 'bold' }}>
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
              style={{ marginLeft: '10px', padding: '8px 15px', backgroundColor: '#f5f5f5', color: '#333', border: '1px solid #ddd' }}
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
              style={{ marginLeft: '10px', padding: '8px 15px', backgroundColor: '#f5f5f5', color: '#333', border: '1px solid #ddd' }}
            >
              중복 확인
            </Button>
          </div>

          <label style={{ marginBottom: '5px', fontSize: '14px', color: '#333', fontWeight: 'bold', textAlign: 'left' }}>휴대전화 번호</label>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <TextField variant="standard"
              name='phone'
              value={user.phone}
              onChange={handlePhoneChange}
              type="tel"
              placeholder="010-1234-5678"
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
              style={{ marginLeft: '10px', padding: '8px 15px', backgroundColor: '#f5f5f5', color: '#333', border: '1px solid #ddd' }}
            >
              휴대폰 인증
            </Button>
          </div>

          <label style={{ marginBottom: '5px', fontSize: '14px', color: '#333', fontWeight: 'bold', textAlign: 'left' }}>비밀번호</label>
          <TextField variant="standard"
            name='password'
            value={user.password}
            onChange={handleChange}
            type="password"
            placeholder="비밀번호를 입력하세요"
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
            disabled={isRegisterDisabled}
            style={{
              backgroundColor: isRegisterDisabled ? 'lightgray' : '#333',
              color: 'white',
              padding: '10px',
              borderRadius: '5px',
              fontWeight: 'bold'
            }}
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