import Header from "../../components/common/Header";
import Button from "../../components/common/Button";
import QuestionProcess from "../../components/employer/QuestionProcess";
import styled from "styled-components";
import { Icons } from "../../components/icons/index";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const employerToken = import.meta.env.VITE_EMPLOYER_TOKEN;
const serverUrl = import.meta.env.VITE_ILDREAM_URL;

export default function QuestionList() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, companyName, bossName, jobFields, questionList } =
    location.state || {};
  // const prevState = location.state || {};
  // console.log("prevState입니다. ", prevState);
  // console.log("id다", prevState.id);
  console.log(
    "id, companyname, bossname, jobfileds, quesitonlist",
    id,
    companyName,
    bossName,
    jobFields,
    questionList
  );
  // const handleNext = () => { navigate("../AddQuestions")}

  const [IsSave, setSave] = useState({});
  // const [progress, setProgress] = useState(87.5);

  const toggleItem = () => setSave((prev) => !prev);

  const [newQuestion, setNewQuestion] = useState("");
  const [questions, setQuestions] = useState([]);

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
  const [tags, setTags] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("employer.jobFields") || "[]");
    } catch {
      return [];
    }
  });
  // useEffect(() => {
  //   const jobPostId = id;
  //   if (!jobPostId) {
  //     alert("잘못된 접근입니다: 모집 공고 ID가 없습니다.");
  //     return;
  //   }

  //   fetch(`${serverUrl}/jobPosts/${jobPostId}/questionList`, {
  //     headers: {
  //       token: employerToken,
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.success && data.items) {
  //         setQuestions(data.items);
  //       } else {
  //         setQuestions([]);
  //       }
  //     })
  //     .catch(console.error);
  // }, [prevState]);

  const handleNext = async () => {
    try {
      const jobPostId = id;
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
            saveQuestionList: IsSave,
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
      <Header text="기업 후기" showBack />
      <ProfileWrapper>
        <ProfileImage>
          <Icons.Building color="var(--Foundation-Green-Normal)" size={55} />
        </ProfileImage>
        <ContentWrapper>
          <SubWrapper style={{ fontWeight: "700" }}>{companyName}</SubWrapper>
          <SubWrapper style={{ fontWeight: "700" }}>
            {"대표자명"} <div>{bossName}</div>
          </SubWrapper>
          <SubWrapper style={{ fontWeight: "700" }}>
            구인분야
            <TagRow>
              {jobFields.slice(0, 3).map((t, i) => (
                <Tag key={i}>{t}</Tag>
              ))}
            </TagRow>
          </SubWrapper>
        </ContentWrapper>
      </ProfileWrapper>
      <Process>
        <QuestionProcess questions={questionList} setQuestions={setQuestions} />
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

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #000;
  font-size: 15px;
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
  align-items: center;
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
