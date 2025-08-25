// pages/terms/Opt.jsx
import Button from "../../../components/common/Button";
import styled from "styled-components";
import ildreamText from "../../../assets/ildreamText.svg";
import Enter from "../../../components/common/Enter";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

/*
전화 번호 입력 후
남은 시간 기능 + 하단 버튼 고정
*/

const BOTTOM_H = 110; // 하단 고정 영역 높이(두 개 버튼 세로 배치 기준)
const serverUrl = import.meta.env.VITE_ILDREAM_URL;

export default function Opt() {
  const navigate = useNavigate();
  const location = useLocation();

  // Phonenum에서 state로 받은 값 우선, 없으면 세션 fallback
  const phoneFromState =
    location?.state?.phone ?? sessionStorage.getItem("signup.phone") ?? "";
  const phoneInputRef = useRef(null);

  // === 타이머 상태/로직 ===
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

  // 전화번호 표시 전용(수정 불가)
  useEffect(() => {
    const input =
      phoneInputRef.current?.querySelector("input.Input_phone") ||
      phoneInputRef.current?.querySelector("input");
    if (!input) return;
    input.value = phoneFromState || "";
    input.readOnly = true; // 수정 불가
    input.disabled = true; // 포커스/입력 불가
  }, [phoneFromState]);

  // 재전송 요청 (실제 API 연동 시 이 함수 내부만 교체)
  const requestOtpResend = async () => {
    // 예시: await api.post("/auth/otp/resend", { phone: phoneFromState });
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

  // 수정된 부분: verifyCode 호출 + 토큰 sessionStorage 저장 + 성공 시 navigate
  const handleVerify = async () => {
    const code = phoneFromState === "01012345678" ? "111111" : "222222";
    try {
      const response = await fetch(`${serverUrl}/auth/verify-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: formatPhone(phoneFromState),
          code,
        }), // 임의 값 222222
      });

      if (!response.ok) {
        throw new Error("Verification failed");
      }

      const data = await response.json();
      const token = data.token;
      console.log(data);
      if (data.success) {
        if (data.data.isNewbie) {
          navigate("/terms");
        } else {
          if (!data.data.accessToken) {
            throw new Error("no accessToken");
          }
          sessionStorage.setItem("authToken", data.data.accessToken);
        }
      } else {
        throw new Error("incorrect code");
      }
      sessionStorage.setItem("authToken", token);

      console.log("Received token:", token);
      navigate("/terms", { state: { phone: formatPhone(phoneFromState) } });
    } catch (error) {
      console.error("Verification error:", error);
      alert("인증에 실패했습니다.");
    }
  };
  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  return (
    <OptContainer>
      {/* 스크롤되더라도 하단 버튼과 간격 고정 */}
      <Content>
        <div className="Logo">
          <img src={ildreamText} />
        </div>
        <div className="Text1">전화번호로 인증번호를 보내드렸어요.</div>
        {/* 입력이 아니라 표시만: value는 useEffect로 주입 */}
        <div ref={phoneInputRef} className="Phone">
          <Enter type={"phone"} text={"전화번호"} />
        </div>
        <div className="Text2">인증번호를 입력해주세요.</div>
        <div className="Input">
          <Enter text={"이곳에 인증번호를 입력해주세요."} type={"otp"} />
        </div>
        <TimeSection>
          <div className="Time">남은 시간: </div>
          <div className="TimeValue">
            {mm}:{ss}
          </div>
        </TimeSection>
      </Content>

      {/* 하단 버튼 고정 */}
      <BottomFixed>
        <div>
          <Button text={"재전송하기"} type={"White"} onClick={handleResend} />
        </div>
        <div>
          <Button text={"인증하기"} onClick={() => handleVerify()} />
        </div>
      </BottomFixed>
    </OptContainer>
  );
}

function formatPhone(phone) {
  if (!phone) return "";

  // 이미 +82 로 시작하면 그대로 리턴
  if (phone.startsWith("+82")) return phone;

  // 전화번호가 0으로 시작하면 0을 빼고 +82 붙임
  if (phone.startsWith("0")) {
    return "+82" + phone.slice(1);
  }

  // 그 외는 그냥 +82 붙임
  return "+82" + phone;
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
  min-height: 100dvh;
  display: flex;
  flex-direction: column;

  /* 하단 고정 바 때문에 내용이 가려지지 않도록 패딩 확보 */
  padding-bottom: ${BOTTOM_H}px;
  box-sizing: border-box;

  /* 기존 클래스는 유지(호환용) */
  > .Time {
    font-size: 20px;
    margin-left: 37px;
    margin-top: 5px;
    font-weight: 400;
    display: inline-block;
  }
  > .TimeValue {
    display: inline-block;
    font-size: 20px;
    font-weight: 700;
    margin-left: 6px;
    margin-top: 5px;
  }
`;

const Content = styled.div`
  /* 화면 높이에서 하단 고정 영역만큼 뺀 영역을 컨텐츠 영역으로 고정 */
  min-height: calc(100dvh - ${BOTTOM_H}px);
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;

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

  > .Phone {
    margin: 0 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .Phone > div {
    border-radius: 7px;
    background: var(--Foundation-Black-black-5, #d9d9d9);
  }

  .Phone input.Input_phone {
    color: var(--Foundation-Black-black-7, #8c8c8c);
    background: var(--Foundation-Black-black-5, #d9d9d9);
  }
`;

const BottomFixed = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: ${BOTTOM_H}px;
  background-color: #ebf8ed;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  padding: 12px 0;
  box-sizing: border-box;
  z-index: 50;
`;
