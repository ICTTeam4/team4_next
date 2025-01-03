import React, { useState, useEffect } from 'react';
import './css/WeatherSection.css';

function WeatherSection() {
  const [weatherData, setWeatherData] = useState([]);

  const fetchWeatherData = async () => {
    try {
      // 기상청 API URL 및 키
      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      const baseDate = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD 형식
      const baseTime = '0500'; // 5시 기준 발표
      const nx = '60'; // 예: 위도
      const ny = '127'; // 예: 경도
      
      const url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${apiKey}&numOfRows=100&pageNo=1&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}&dataType=JSON`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.response.body.items.item) {
        const filteredData = data.response.body.items.item.filter(item => item.category === 'SKY'); // 하늘상태만 필터링
        setWeatherData(filteredData.slice(0, 6)); // 필요한 데이터만 자르기
      }
    } catch (error) {
      console.error('날씨 정보 에러 : ', error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <div className="weatherSection">
      <div>해당 지역의 일기예보입니다. 거래 날짜 선택시 참고해주세요.</div>
      <div className="weatherForecast">
        {weatherData.map((weather, index) => (
          <div className="weatherDay" key={index}>
            <span>{index === 0 ? '오늘' : `${index}일 뒤`}</span>
            <span>
              {weather.fcstValue === '1' ? '☀️ 맑음' :
               weather.fcstValue === '3' ? '⛅ 구름많음' :
               weather.fcstValue === '4' ? '🌧️ 비' : '❓'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

}

export default WeatherSection;