import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import Enter from "../../../components/common/Button";
import ProgressBar from "../../../components/common/Progressbar";
import styled from "styled-components";
import { Icons } from "../../../components/icons/index";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PostComplete() {
  const navigate = useNavigate();
  const handleNext = () => {
    navigate("/employer");
  };
  return (
    <>
      <Header text={"새 공고"} />
      <ApplyWrapper>
        <ProgressBar value={"100"} max={"100"} />
        <Question>
          🎉구인 등록이 <br />
          성공적으로 <br />
          완료되었어요! <br />
          <br />
          좋은 인재와 <br />
          만날 준비가 <br />
          끝났습니다.
        </Question>
      </ApplyWrapper>
      <Footer>
        <Button text="확인" type="White" onClick={handleNext} />
      </Footer>
    </>
  );
}
const ApplyWrapper = styled.div`
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 45px;
  flex: 1 0 0;
  align-self: stretch;
  background-color: var(--Foundation-Black-black-1);
  height: 70vh;
`;

const Question = styled.div`
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid #d9d9d9;
  padding: 10px;
`;
