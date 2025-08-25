// pages/terms/Phonenum.jsx
import Button from "../../../components/common/Button";
import styled from "styled-components";
import ildreamText from "../../../assets/ildreamText.svg";
import Enter from "../../../components/common/Enter";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const BOTTOM_H = 90; // 하단 고정 영역 높이(필요시 조정)
const serverUrl = import.meta.env.VITE_ILDREAM_URL; // 환경변수로 서버 주소 받아오기

export default function Phonenum() {
  const navigate = useNavigate();

  // 입력값 추적 (Enter.jsx 수정 없이 내부 input을 찾아 바인딩)
  const rootRef = useRef(null);
  const [phone, setPhone] = useState(
    () => sessionStorage.getItem("signup.phone") || ""
  );

  useEffect(() => {
    const input =
      rootRef.current?.querySelector("input.Input_phone") ||
      rootRef.current?.querySelector("input");
    if (!input) return;

    // 초기값 주입(뒤로가기/새로고침 대비)
    if (phone && input.value !== phone) input.value = phone;

    const onInput = (e) => {
      const v = e.target.value;
      setPhone(v);
      sessionStorage.setItem("signup.phone", v);
    };
    input.addEventListener("input", onInput);
    return () => input.removeEventListener("input", onInput);
  }, [phone]);

  useEffect(() => {
    const input =
      rootRef.current?.querySelector("input.Input_phone") ||
      rootRef.current?.querySelector("input");
    if (!input) return;

    if (phone && input.value !== phone) input.value = phone;

    const onInput = (e) => {
      const v = e.target.value;
      setPhone(v);
      sessionStorage.setItem("signup.phone", v);
    };
    input.addEventListener("input", onInput);
    return () => input.removeEventListener("input", onInput);
  }, [phone]);

  const sendCode = async () => {
    if (!phone) {
      alert("전화번호를 입력해주세요.");
      return false;
    }

    try {
      console.log(formatPhone(phone));
      const response = await fetch(`${serverUrl}/auth/send-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: formatPhone(phone) }),
      });

      if (!response.ok) {
        throw new Error("Failed to send code");
      }

      const data = await response.json();
      console.log("Code sent:", data);
      return true;
    } catch (error) {
      console.error("Error sending code:", error);
      alert("인증 코드 전송에 실패했습니다.");
      return false;
    }
  };

  const goNext = async () => {
    const success = await sendCode();
    if (success) {
      navigate("/opt", { state: { phone } });
    }
  };

  return (
    <PhonenumContainer>
      {/* 스크롤되더라도 하단 버튼과의 간격은 고정 */}
      <Content ref={rootRef}>
        <div className="Logo">
          <img src={ildreamText} />
        </div>
        <div className="Text">전화번호를 입력해주세요.</div>
        <div className="Input">
          {/* type 부여해서 선택자 고정 (Input_phone 클래스 생성) */}
          <Enter type={"phone"} text={"이곳에 전화번호를 입력해주세요."} />
        </div>
      </Content>

      {/* 하단 버튼 고정 */}
      <BottomFixed>
        <Button text={"인증번호 요청하기"} onClick={goNext} />
      </BottomFixed>
    </PhonenumContainer>
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

const PhonenumContainer = styled.div`
  background-color: #ebf8ed;
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;

  /* 하단 고정 바 때문에 내용이 가려지지 않도록 패딩 확보 */
  padding-bottom: ${BOTTOM_H}px;
  box-sizing: border-box;
`;

const Content = styled.div`
  /* 화면 높이에서 하단 고정 영역만큼 뺀 영역을 컨텐츠 영역으로 고정 */
  min-height: calc(100dvh - ${BOTTOM_H}px);
  display: flex;
  flex-direction: column;

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

  > .Text {
    margin-left: 50px;
    margin-top: 85px;
    font-size: 20px;
    font-weight: 700;
  }

  > .Input {
    padding: 0 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
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
  align-items: center;
  justify-content: center;
  padding: 12px 0;
  box-sizing: border-box;
  z-index: 50; /* 오버레이 우선순위 확보 */
`;
