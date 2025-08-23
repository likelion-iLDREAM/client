// pages/terms/SignupEnd.jsx
import styled from "styled-components";
import Header from "../../../components/common/Header";
import ProgressBar from "../../../components/common/Progressbar";
import Button from "../../../components/common/Button";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupEnd() {
  const navigate = useNavigate();
  // NameBirth에서 sessionStorage에 저장된 이름을 읽어 표시
  const name = useMemo(
    () => (sessionStorage.getItem("signup.name") || "").trim(),
    []
  );
  const displayName = name || "고객";

  return (
    <SignupEndContainer>
      <Header text={"회원가입"} />
      <ProgressBar value={"100"} max={"100"} />
      <h2 className="Text1">
        회원가입이
        <br />
        완료되었어요.
        <br />
        <br />
        {displayName}님을 위한
        <br />
        구직공고를
        <br />
        확인해보세요!
      </h2>
      <div className="Bottom">
        <Button
          text={"시작하기"}
          type={"White"}
          onClick={() => navigate("/homeseeker")}
        />
      </div>
    </SignupEndContainer>
  );
}

const SignupEndContainer = styled.div`
  background-color: #fff;
  width: 400px;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  > .Text1 {
    margin-left: 45px;
    margin-right: auto;
  }
  > .Bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 1px solid #d9d9d9;
    padding: 10px;
    margin-top: 200px;
  }
`;
