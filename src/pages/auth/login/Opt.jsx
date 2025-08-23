import Button from "../../../components/common/Button";
import styled from "styled-components";
import ildreamText from "../../../assets/ildreamText.svg";
import Enter from "../../../components/common/Enter";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

/*
전화 번호 입력 후
남은 시간 기능
*/

export default function Opt() {
  const navigate = useNavigate();

  // === 추가 시작: 타이머 상태/로직 ===
  const [remaining, setRemaining] = useState(300); // 5분 = 300초
  const timerRef = useRef(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = (seconds = 300) => {
    clearTimer();
    setRemaining(seconds);
    timerRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearTimer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // 페이지 진입 시(인증번호를 이미 보냈다는 가정) 타이머 시작
  useEffect(() => {
    startTimer(300);
    return () => clearTimer();
  }, []);

  // 재전송 요청 (실제 API 연동 시 이 함수 내부만 교체)
  const requestOtpResend = async () => {
    // 예시: await api.post("/auth/otp/resend", { phone });
    await new Promise((r) => setTimeout(r, 400));
  };

  const handleResend = async () => {
    try {
      await requestOtpResend();
      startTimer(300);
    } catch (e) {
      console.error(e);
      // 에러 핸들링(UI 토스트 등) 필요시 추가
    }
  };

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");
  // === 추가 끝 ===

  return (
    <OptContainer>
      <div className="Logo">
        <img src={ildreamText} />
      </div>
      <div className="Text1">전화번호로 인증번호를 보내드렸어요.</div>
      <div className="Input">
        <Enter text={"전화번호 입력...."} />
      </div>
      <div className="Text2">인증번호를 입력해주세요.</div>
      <div className="Input">
        <Enter text={"이곳에 인증번호를 입력해주세요."} />
      </div>
      <TimeSection>
        <div className="Time">남은 시간: </div>
        {/* 추가: 기존 라인은 그대로 두고, 값만 별도 노드로 표시 */}
        <div className="TimeValue">
          {mm}:{ss}
        </div>
      </TimeSection>
      <div className="Bottom">
        <div>
          {/* 추가: 재전송 onClick만 부착 */}
          <Button text={"재전송하기"} type={"White"} onClick={handleResend} />
        </div>
        <div>
          <Button text={"인증하기"} onClick={() => navigate("/terms")} />
        </div>
      </div>
    </OptContainer>
  );
}
const TimeSection = styled.div`
  display: flex;
  align-items: center;
  margin-left: 50px;
  margin-top: 5px;
  gap: 10px;
  font-size: 20px;
  > .TimeValue {
    font-weight: 700;
  }
`;

const OptContainer = styled.div`
  background-color: #ebf8ed;
  width: 100%;
  display: flex;
  flex-direction: column;
  > .Bottom {
    margin-bottom: 34px;
    margin-top: 51px;
    gap: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  > .Logo {
    img {
      width: 255px;
      height: 215px;
    }
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  > .Text1 {
    margin-left: 50px;
    margin-top: 85px;
    font-size: 20px;
    font-weight: 700;
  }
  > .Text2 {
    margin-left: 50px;
    margin-top: 30px;
    font-size: 20px;
    font-weight: 700;
  }
  > .Input {
    padding: 0 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  > .Time {
    font-size: 20px;
    margin-left: 37px;
    margin-top: 5px;
    font-weight: 400;
    display: inline-block;
  }
  /* 추가: 시간값 스타일 */
  > .TimeValue {
    display: inline-block;
    font-size: 20px;
    font-weight: 700;
    margin-left: 6px;
    margin-top: 5px;
  }
`;
