import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import ProgressBar from "../../../components/common/Progressbar";
import QuestionProcess from "../../../components/employer/QuestionProcess";
import styled from "styled-components";
import { Icons } from "../../../components/icons/index";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import Alert_post from "../../../components/employer/Alert_post";

export default function AddQuestions() {
  const navigate = useNavigate();
  const handleNext = () => {
    navigate("../postcomplete");
  };
  const [IsSave, setSave] = useState(false);
  const [backAlertOpen, setBackAlertOpen] = useState(false);

  // const [progress, setProgress] = useState(87.5);
  const toggleItem = () => setSave((prev) => !prev);

  return (
    <>
      <Headersection>
        <HeaderContainer>
          <BackButton
            type="button"
            aria-label="뒤로가기"
            onClick={() => setBackAlertOpen(true)}
          >
            <IoIosArrowBack />
          </BackButton>
          {"새 공고"}
        </HeaderContainer>
      </Headersection>
      <Alert_post
        open={backAlertOpen}
        onConfirm={() => {
          setBackAlertOpen(false);
        }}
        onCancel={() => setBackAlertOpen(false)}
        onClose={() => setBackAlertOpen(false)}
      />
      <ApplyWrapper>
        <ProgressBar value={"87.5"} max={"100"} />{" "}
        {/*이거 나중에 useState로 바꿔주기*/}
        <Question>
          추가 질문을 <br />
          입력해 주세요.(선택)
        </Question>
        <QuestionProcess />
      </ApplyWrapper>
      <Footer>
        <Savequestion onClick={toggleItem}>
          {IsSave ? (
            <Icons.CheckboxActive
              color="var(--Foundation-Green-Normal)"
              size={24}
            />
          ) : (
            <Icons.CheckboxInactive
              color="var(--Foundation-Green-Normal)"
              size={24}
            />
          )}
          다음 공고에도 동일한 질문 사용하기
        </Savequestion>

        <Button text="다음" type="White" onClick={handleNext} />
      </Footer>
    </>
  );
}

// 변경: position 추가
const HeaderContainer = styled.div`
  position: relative;
  width: 400px;
  height: 70px;
  background-color: #eaf7f0;
  font-size: 30px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// 추가: 뒤로가기 버튼 스타일
const BackButton = styled.button`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  background: transparent;
  border: 0;
  padding: 10px;
  cursor: pointer;

  svg {
    width: 32px;
    height: 32px;
  }
`;
const Headersection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--Foundation-Black-black-5, #d9d9d9);
`;
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
  background-color: White;
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Savequestion = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: white;
  border: none;
  font-size: 18px;
  width: 100%;
  padding: 0 17px;
`;
