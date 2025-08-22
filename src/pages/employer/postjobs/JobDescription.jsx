import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import ProgressBar from "../../../components/common/Progressbar";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function JobDescription() {
  const navigate = useNavigate();
  const handleNext = () => {
    navigate("../AddQuestions");
  };
  const [content, setContent] = useState("");
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };
  return (
    <>
      <Header text="새공고" />
      <ApplyWrapper>
        <ProgressBar value={"75"} max={"100"} />
        <Question>
          직무 내용을 <br />
          입력해 주세요.
        </Question>
        <OptionsWrapper>
          직무내용
          <Title
            placeholder="직무 내용을 자유롭게 입력해주세요.(100자 이상)"
            onChange={onChangeContent}
          />
          <div>{content.length}자 / 100자</div>
        </OptionsWrapper>
      </ApplyWrapper>
      <Footer>
        <Button text="다음" type="White" onClick={handleNext} />
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
`;

const Question = styled.div`
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  align-self: stretch;
  font-size: 20px;
  height: 50vh; // 높이인데 나중에 통일할 필요가 있어보임..

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    gap: 5px;
    align-self: stretch;
    font-size: 18px;
  }
`;

const Footer = styled.div`
  background-color: White;
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.textarea`
  display: flex;
  height: 210px;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  color: #8d8d8d;
  font-size: 20px;
  font-style: normal;
  border-radius: 7px;
  border: 1px solid var(--Foundation-Black-black-6, #bfbfbf);
  resize: none; /* 크기 조절 막으려면 */
  &:focus {
    outline: none;
  }
`;
