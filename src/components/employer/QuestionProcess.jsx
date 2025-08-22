import styled from "styled-components";
import { useState } from "react";
import { Icons } from "../icons/index";

export default function QuestionProcess() {
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
    <Wrapper>
      <SectionTitle>추가 질문(최대 10개)</SectionTitle>
      {/* -------- 등록된 질문 목록 -------- */}
      {questions.map((q, idx) => (
        <QuestionItem key={idx}>
          <QuestionText>{`${idx + 1}. ${q}`}</QuestionText>
          <DeleteBtn onClick={() => handleDelete(idx)}>
            <Icons.Close color="#BFBFBF" size={20} />
          </DeleteBtn>
        </QuestionItem>
      ))}

      {/* -------- 새 질문 입력 영역 -------- */}
      <InputCard>
        <Label>질문유형</Label>
        <TabBar>
          <TypeTab
            active={questionType === "yesno"}
            onClick={() => setQuestionType("yesno")}
          >
            예/아니오
          </TypeTab>
          <TypeTab
            active={questionType === "desc"}
            onClick={() => setQuestionType("desc")}
          >
            서술형
          </TypeTab>
        </TabBar>
        <QuestionInput
          placeholder="이곳에 질문을 입력해주세요."
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          rows={2}
        />
        <AddDoneBtn onClick={handleAddQuestion}>완료</AddDoneBtn>
      </InputCard>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SectionTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 4px;
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
  border-radius: 7px;
  background: var(--Foundation-Green-Light, #eaf7f0);
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.25);
`;

const Label = styled.div`
  font-size: 18px;
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
  &:hover {
    background: #23c163;
    color: #fff;
  }
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
  &:focus {
    outline: none;
  }
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
  &:hover {
    background: #33a345;
    color: #fcfdfd;
    outline: none;
  }
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
