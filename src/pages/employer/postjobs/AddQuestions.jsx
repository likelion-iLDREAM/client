import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import ProgressBar from "../../../components/common/Progressbar";
import QuestionProcess from "../../../components/employer/QuestionProcess";
import styled from "styled-components";
import { Icons } from "../../../components/icons/index";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Alert_post from "../../../components/employer/Alert_post";

const employerToken = import.meta.env.VITE_EMPLOYER_TOKEN;
const serverUrl = import.meta.env.VITE_ILDREAM_URL;

export default function AddQuestions() {
  const navigate = useNavigate();
  const location = useLocation();
  const prevState = location.state || {};
  console.log("prevState입니다. ", prevState);
  const [questions, setQuestions] = useState([]);

  // const handleNext = () => {
  //   navigate("/employer/postjobs/postcomplete");
  // };

  const [IsSave, setSave] = useState(false);
  const [backAlertOpen, setBackAlertOpen] = useState(false);

  // const [progress, setProgress] = useState(87.5);
  const toggleItem = () => setSave((prev) => !prev);

  useEffect(() => {
    const filteredQuestions = questions.filter((q) => q.text.trim() !== "");
    if (filteredQuestions.length > 0) {
      console.log("생성된 질문들:", filteredQuestions);
    } else {
      console.log("생성된 질문이 없습니다.");
    }
  }, [questions]);

  const handleNext = async () => {
    try {
      const jobPostId = prevState?.jobPostId;
      console.log("prevState:", prevState);
      console.log("jobPostId:", prevState?.jobPostId);

      if (!jobPostId) {
        alert("잘못된 접근입니다: 모집 공고 ID가 없습니다.");
        return;
      }

      const response = await fetch(
        `${serverUrl}/jobPosts/${jobPostId}/questionList`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            token: employerToken,
          },
          body: JSON.stringify({
            items: questions,
            saveQuestionList: IsSave, // 여기에 체크 상태 반영
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        navigate("/employer/postjobs/postcomplete");
      } else {
        alert("질문 저장에 실패했습니다: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("서버 요청 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <Headersection>
        <Header text={"지원자 현황"} showBack />
      </Headersection>

      <Alert_post
        open={backAlertOpen}
        onConfirm={() => {
          setBackAlertOpen(false);
          navigate("/employer");
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
        <QuestionProcess questions={questions} setQuestions={setQuestions} />
      </ApplyWrapper>
      <Footerwithcheckbox>
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
        <Footer>
          <Button text="다음" type="White" onClick={handleNext} />
        </Footer>
      </Footerwithcheckbox>
    </>
  );
}

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
  // height: 70vh;
`;

const Question = styled.div`
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Footerwithcheckbox = styled.div`
  background-color: White;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid #d9d9d9;
  padding: 10px;
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
