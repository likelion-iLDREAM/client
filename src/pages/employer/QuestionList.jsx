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
  return (
    <>
      <Header text="기업 후기" />
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
      <CategoryWrapper>구인분야</CategoryWrapper>
      <Process>
        <QuestionProcess />
      </Process>
      <Footer>
        <Button text="저장하기" type="White" />
      </Footer>
    </>
  );
}

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

const Review = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 15px;
  align-self: stretch;
  font-size: 20px;
  font-weight: 700;

  .subcategory {
    font-size: 18px;
    flex-direction: column;
    gap: 10px;
    span {
      display: flex;
      font-weight: 400;
      // display: flex;
    }
  }
  .count {
    ccolor: #666;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .sectionlist {
    gap: 20px;
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
`;

const Tag = styled.span`
  display: flex;
  padding: 3px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 7px;
  border: 1px solid ${({ $positive }) => ($positive ? "#23c163" : "#FF5858")};
  background: ${({ $positive }) => ($positive ? "#EAF7F0" : "#FFF3F3")};
  color: ${({ $positive }) => ($positive ? "#23c163" : "#FF5858")};
  font-size: 15px;
  font-weight: 700;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 6px;
`;

const EvalTag = styled.span`
  display: flex;
  padding: 3px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 7px;
  border: 1px solid ${({ $positive }) => ($positive ? "#23c163" : "#FF5858")};
  background: ${({ $positive }) => ($positive ? "#EAF7F0" : "#FFF3F3")};
  color: ${({ $positive }) => ($positive ? "#23c163" : "#FF5858")};
  font-size: 12px;
  font-weight: 700;
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
  font-size: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 15px;
  align-self: stretch;
  //   width: 100%;
  //   display: flex;
  //   flex-direction: column;
  //   gap: 16px;
`;

const SectionTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 4px;
  display: flex;
  width: 100%;
  box-sizing: border-box;
`;

const QuestionItem = styled.div`
  background: #fff;
  border: 1px solid #efefef;
  border-radius: 8px;
  padding: 10px 18px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const QuestionText = styled.div`
  flex: 1;
  color: #888;
  font-size: 16px;
`;

const DeleteBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const InputCard = styled.div`
  background: #f6fcfa;
  border-radius: 16px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  box-sizing: border-box;
`;

const Label = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 2px;
`;

const TabBar = styled.div`
  display: flex;
  gap: 16px;
`;

const TypeTab = styled.button`
  flex: 1;
  padding: 8px 0;
  border: none;
  border-radius: 5px;
  background: ${({ active }) => (active ? "#23C163" : "transparent")};
  color: ${({ active }) => (active ? "#fff" : "#23C163")};
  font-weight: 600;
  font-size: 16px;
  box-shadow: ${({ active }) => (active ? "0 2px 8px #23c16322" : "none")};
  cursor: pointer;
  transition: all 0.2s;
`;

const QuestionInput = styled.textarea`
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 16px;
  padding: 10px;
  resize: none;
  width: 100%;
  box-sizing: border-box;
  margin-top: 8px;
`;

const AddDoneBtn = styled.button`
  align-self: flex-end;
  background: #23c163;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  padding: 6px 20px;
  cursor: pointer;
  margin-top: 6px;
`;

const AddBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  background: #23c163;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 14px 0;
  font-size: 19px;
  font-weight: 700;
  margin-top: 6px;
  cursor: pointer;
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
