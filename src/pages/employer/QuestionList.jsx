import Header from "../../components/common/Header";
import Button from "../../components/common/Button";
import QuestionProcess from "../../components/employer/QuestionProcess";
import styled from "styled-components";
import { Icons } from "../../components/icons/index";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function QuestionList() {
  const navigate = useNavigate();
  // const handleNext = () => { navigate("../AddQuestions")}

  const [IsSave, setSave] = useState({});
  // const [progress, setProgress] = useState(87.5);

  const toggleItem = () => setSave((prev) => !prev);
  const [questions, setQuestions] = useState([
    "요양보호사 경력이 있으시면 말씀해주세요.",
  ]);
  const [newQuestion, setNewQuestion] = useState("");
  const [questionType, setQuestionType] = useState("yesno");

  // 질문 삭제
  const handleDelete = (idx) => {
    setQuestions(questions.filter((_, i) => i !== idx));
  };

  // 새 질문 등록
  const handleAddQuestion = () => {
    if (newQuestion && questions.length < 10) {
      setQuestions([...questions, newQuestion]);
      setNewQuestion("");
    }
  };
  const Catetags = ["돌봄", "식품·옷·환경 가공", "목공·공예·제조"];

  return (
    <>
      <Header text="기업 후기" showBack />
      <ProfileWrapper>
        <ProfileImage>
          <Icons.Building color="var(--Foundation-Green-Normal)" size={55} />
        </ProfileImage>
        <ContentWrapper>
          <SubWrapper style={{ fontWeight: "700" }}>{"기업명"}</SubWrapper>
          <SubWrapper style={{ fontWeight: "700" }}>
            {"대표자명"} <div>{"강길동"}</div>
          </SubWrapper>
        </ContentWrapper>
      </ProfileWrapper>
      <CategoryWrapper>
        구인분야
        <TagRow>
          {Catetags.slice(0, 3).map((t, i) => (
            <CateTag key={i}>{t}</CateTag>
          ))}
        </TagRow>
      </CategoryWrapper>
      <Process>
        <QuestionProcess />
      </Process>
      <Footer>
        <Button text="저장하기" type="White" />
      </Footer>
    </>
  );
}

const TagRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 6px;
  //   padding-top: 10px;
`;

const CateTag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #000;
  font-size: 15px;
  white-space: nowrap;
  font-weight: 400;
`;
const ProfileWrapper = styled.div`
  display: flex;
  padding: 20px 10px;
  align-items: center;
  gap: 20px;
  align-self: stretch;
`;

const ProfileImage = styled.div`
  display: flex;
  width: 60px;
  height: 60px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 1000px;
  border: 5px solid var(--Foundation-Green-Normal, #2baf66);
  background: var(--Foundation-surface-White, #fff);
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 220px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const SubWrapper = styled.div`
  display: flex;
  gap: 5px;
  font-size: 20px;

  div {
    font-weight: 400;
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 5px;
  align-self: stretch;
  font-size: 20px;
  font-weight: 700;
  border-bottom: 1px solid #bfbfbf;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid #d9d9d9;
  padding: 10px;
`;

const Process = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 15px;
  align-self: stretch;
`;
