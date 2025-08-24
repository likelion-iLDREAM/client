import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import Enter from "../../../components/common/Enter";
import JobHistory from "../../../components/employer/JobHistory";
import styled from "styled-components";
import { Icons } from "../../../components/icons/index";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const mockData = {
  applicationId: 2,
  jobPostId: 2,
  workerId: 1,
  status: "임시저장",
  submissionTime: "2025-08-23T21:05:05.084545",
  applyMethod: "간편지원",
  workerName: "이현서",
  workerBirthDate: "2025-08-22",
  workerGender: "여성",
  workerPhoneNumber: "+821012345678",
  workerAddress: "서강대학교",
  answers: [
    {
      questionId: 2,
      text: "이것은 답변입니다",
      optionIds: null,
    },
    {
      questionId: 1,
      text: "이것은 답변입니다",
      optionIds: null,
    },
  ],
  question: [
    {
      id: 1,
      text: "이름이 뭐에요",
      type: "예/아니요",
      options: ["예", "아니요"],
    },
    {
      id: 2,
      text: "전화번호 뭐에요",
      type: "서술형",
      options: [],
    },
  ],
};

const mockhistory = [
  {
    id: 2,
    workerId: 1,
    title: "근무이력",
    companyName: "회사이름",
    startDate: "2025-08-11",
    endDate: "2025-08-22",
    workplace: "마포",
    mainDuties: "일한내용",
    isOpening: true,
    jobField: "음식,서비스",
  },
  {
    id: 3,
    workerId: 1,
    title: "22근무이력",
    companyName: "회사이름",
    startDate: "2025-08-11",
    endDate: "2025-10-30",
    workplace: "용산",
    mainDuties: "일한내용",
    isOpening: true,
    jobField: "판매",
  },
];

export default function Resume() {
  const navigate = useNavigate("");
  const location = useLocation();
  const { applicationId, buttonText } = location.state || {};
  console.log("prevdata입니다.", applicationId);

  // 실제 API 사용 시 아래 fetch 로직 주석 해제 후 사용
  const [applicationData, setApplicationData] = useState(mockData);

  // useEffect(() => {
  //   if (!applicationId) return;
  //   fetch(`/api/applications/${applicationId}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.success) {
  //         setApplicationData(data.data);
  //       }
  //     })
  //     .catch((error) => console.error(error));
  // }, [applicationId]);

  // 날짜 포맷팅 (예: 생년월일)
  const birthDateFormatted = new Date(
    applicationData.workerBirthDate
  ).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  function formatPhoneNumber(phone) {
    // +82로 시작하는 경우 0으로 시작하도록 변환
    // +821012345678 → 01012345678
    let num = phone.startsWith("+82") ? "0" + phone.slice(3) : phone;

    // 일반적인 010-1234-5678 형태로 변환
    // 0으로 시작하는 11자리 번호 포맷팅 예제
    const match = num.match(/^(\d{3})(\d{4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phone; // 포맷에 맞지 않으면 원본 반환
  }

  const handleBack = () => {
    navigate("/employer/seekerlist/seekerlist"); //navigate("/employer/seekerlist/seekerlist/${joblist.id}");
  };
  const savedCategory = "음식,서비스"; // 예: 따로 저장해둔 정보
  return (
    <>
      <Headersection>
        <HeaderContainer>
          <BackButton type="button" aria-label="뒤로가기" onClick={handleBack}>
            <IoIosArrowBack />
          </BackButton>
          {"지원자 현황"}
        </HeaderContainer>
      </Headersection>
      {/* <Headersection>
        <Header text={"지원자 현황"} showBack />
      </Headersection> */}
      <Menu>
        <Submenu>
          이름
          <span>{applicationData.workerName}</span>
          생년월일
          <span>{birthDateFormatted}</span>
          성별
          <span>{applicationData.workerGender}</span>
          전화번호
          <span>{formatPhoneNumber(applicationData.workerPhoneNumber)}</span>
          주소
          <span>{applicationData.workerAddress}</span>
        </Submenu>
        <Submenu>
          추가질문
          {applicationData.question.map((q, idx) => (
            <div className="singlequestion" key={q.id}>
              <span>
                {idx + 1}. {q.text}
              </span>
              <EnterWrapper>
                <input
                  readOnly
                  placeholder={
                    applicationData.answers.find((a) => a.questionId === q.id)
                      ?.text || ""
                  }
                />
              </EnterWrapper>
            </div>
          ))}
        </Submenu>
        <Submenu>
          지원자 이력
          <ItemWrapper>
            <JobHistory
              workerId={applicationData.workerId}
              savedCategory={savedCategory}
            />
          </ItemWrapper>
        </Submenu>
      </Menu>
      <Footer>
        <Button text={buttonText} type="White"></Button>
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

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid #d9d9d9;
  padding: 10px;
`;

const Submenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  span {
    font-weight: 400;
  }

  .alert {
    color: #ff5858;
    font-size: 15px;
  }

  button {
    display: flex;
    padding: 0 10px;
    align-items: center;
    gap: 10px;
    border-radius: 6px;
    background: var(--Foundation-Green-Light, #eaf7f0);
    border: none;
    align-self: stretch;
    margin-top: 10px;
    cursor: pointer;
  }

  div.singlequestion {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const Menu = styled.div`
  display: flex;
  width: 360px;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  flex: 1 0 0;
`;

const EnterWrapper = styled.div`
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 6px;
  border: 1px solid #000;

  > input {
    flex: 1 0 0;
    color: #000;
    font-family: "Pretendard Variable";
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border: none;

    &:focus {
      outline: none;
    }
  }
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  align-self: stretch;
  border-radius: 7px;
  color: #fff;
`;
