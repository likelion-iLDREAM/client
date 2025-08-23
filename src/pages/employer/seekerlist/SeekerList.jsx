import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import FilterTab_SeekerList from "../../../components/employer/FilterTab_SeekerList";
import StatsRow from "../../../components/employer/StatsRow";
import styled from "styled-components";
import { Icons } from "../../../components/icons/index";
import { IoIosArrowBack } from "react-icons/io";
import { useState, useEffect } from "react";
import Alert_emp from "../../../components/employer/Alert_emp";
import { useNavigate } from "react-router-dom";
import ApplicantItem from "../../../components/employer/ApplicantItem";

const mockData = [
  {
    applicationId: 1,
    workerName: "이현서",
    workerGender: "여성",
    workerAge: 70,
    workerAddress: "마포구",
    workplace: null,
    applicationStatus: "거부",
  },
  {
    applicationId: 2,
    workerName: "강길동",
    workerGender: "남성",
    workerAge: 50,
    workerAddress: "서대문구",
    workplace: null,
    applicationStatus: "승인",
  },
  {
    applicationId: 4,
    workerName: "오서현",
    workerGender: "여성",
    workerAge: 60,
    workerAddress: "중구",
    workplace: null,
    applicationStatus: "거부",
  },
];
export default function SeekerList() {
  // 탭 상태
  const [currentTab, setCurrentTab] = useState("지원 완료"); // 기본값
  const [backAlertOpen, setBackAlertOpen] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [applicants, setApplicants] = useState(mockData);

  const handleBack = () => {
    navigate("/employer"); //navigate("/employer/seekerlist/seekerlist/${joblist.id}");
  };

  useEffect(() => {
    async function fetchApplicants() {
      try {
        const res = await fetch("/jobPosts/{id}/applications"); // 실제 jobId 전달
        const json = await res.json();
        if (json.success) {
          setApplicants(json.data);
        }
      } catch (error) {
        console.error("지원자 목록 불러오기 실패", error);
      }
    }
    fetchApplicants();
  }, []);

  const navigate = useNavigate();

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
      <Alert_emp
        open={backAlertOpen}
        onConfirm={() => {
          setBackAlertOpen(false);
          setIsClosed(true);
        }}
        onCancel={() => setBackAlertOpen(false)}
        onClose={() => setBackAlertOpen(false)}
      />
      <SummarySection>
        <div className="title">
          지원자 통계 <span className="subtitle">총 지원자 8명</span>
        </div>
        <StatsRow></StatsRow>
      </SummarySection>
      <FilterTab_SeekerList
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <List>
        {applicants.map((applicant) => (
          <ApplicantItem
            key={applicant.applicationId}
            application={applicant}
            currentTab={currentTab}
            isClosed={isClosed}
          />
        ))}
      </List>
      <Footer>
        <ConfirmBtn disabled={isClosed} onClick={() => setBackAlertOpen(true)}>
          {isClosed ? "채용 마감" : "채용 마감하기"}
        </ConfirmBtn>
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

const SummarySection = styled.section`
  padding: 20px;
  .title {
    font-size: 20px;
    font-weight: 700;
    .subtitle {
      font-size: 15px;
      font-weight: 400;
    }
  }
`;

// 오른쪽 화살표는 이미 있는 컴포넌트 사용

const ConfirmBtn = styled.button`
  background-color: white;
  cursor: pointer;
  border: none;
  border-radius: 7px;
  border: 1px solid var(--Foundation-Green-Normal);
  padding: 10px 20px;
  text-wrap: nowrap;
  color: var(--Foundation-Green-Normal);
  display: flex;
  width: 340px;
  height: 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 20px;
  &:disabled {
    background: #bfbfbf;
    cursor: not-allowed;
    color: #fff;
    border: none;
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid #d9d9d9;
  padding: 10px;
`;

const List = styled.div`
  display: flex;
  padding: 15px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  flex: 1 0 0;
  align-self: stretch;
`;
