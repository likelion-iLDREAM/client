import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import ProgressBar from "../../../components/common/Progressbar";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Alert_post from "../../../components/employer/Alert_post";

// const employerToken = sessionStorage.getItem('authToken');
const employerToken = import.meta.env.VITE_EMPLOYER_TOKEN;
const serverUrl = import.meta.env.VITE_ILDREAM_URL;

export default function JobDescription() {
  const navigate = useNavigate();
  const location = useLocation();
  const prevState = location.state || {};
  console.log("prevState입니다. ", prevState);

  const handleNext = async () => {
    // API 요청용 payload 조립 (prevState 포함, content 추가)
    const payload = {
      ...prevState,
      content,
      saveQuestionList: false,
      status: "모집 중",
    };
    console.log("payload", payload);
    try {
      const response = await fetch(`${serverUrl}/jobPosts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: `${employerToken}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (data.success) {
        const jobPostId = data.data.id; // 새 공고 id 저장
        // 생성 성공 시 다음 페이지로 이동하며 id 전달
        navigate("/employer/postjobs/AddQuestions", { state: { jobPostId } });
      } else {
        alert("공고 생성에 실패했습니다: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("서버 요청 중 오류가 발생했습니다.");
    }
  };

  const [content, setContent] = useState("");
  const [backAlertOpen, setBackAlertOpen] = useState(false);
  const onChangeContent = (e) => {
    setContent(e.target.value);
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
        <ProgressBar value={"75"} max={"100"} />
        <Question>
          직무 내용을 <br />
          입력해 주세요.
        </Question>
        <Tag>
          <OptionsWrapper>
            <p>직무내용</p>
            <Title
              placeholder="직무 내용을 자유롭게 입력해주세요.(100자 이상)"
              onChange={onChangeContent}
            />
            <div>{content.length}자 / 100자</div>
          </OptionsWrapper>
        </Tag>
      </ApplyWrapper>
      <Footer>
        <Button text="다음" type="White" onClick={handleNext} />
      </Footer>
    </>
  );
}

const Tag = styled.div`
  p {
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 8px 0;
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
  // width: 65vw;

  div {
    display: flex;
    // flex-direction: flex-end;
    justify-content: flex-end;
    align-items: flex-end;
    gap: 5px;
    align-self: stretch;
    font-size: 18px;
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid #d9d9d9;
  padding: 10px;
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

function extractDistrict(location) {
  // 예: "서울특별시 마포구 대흥동 000" -> "마포구"
  // 간단히 '구'라는 글자가 포함된 단어 추출 예시
  if (!location) return "";

  const match = location.match(/(\S+구)/);
  return match ? match[1] : "";
}
