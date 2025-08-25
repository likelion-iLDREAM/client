import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import FilterTab_SeekerList from "../../../components/employer/FilterTab_SeekerList";
import StatsRow from "../../../components/employer/StatsRow";
import styled from "styled-components";
import { Icons } from "../../../components/icons/index";
import { IoIosArrowBack } from "react-icons/io";
import { useState, useEffect } from "react";
import Alert_emp from "../../../components/employer/Alert_emp";
import { useNavigate, useLocation } from "react-router-dom";
import ApplicantItem from "../../../components/employer/ApplicantItem";

const employerToken = import.meta.env.VITE_EMPLOYER_TOKEN;
const serverUrl = import.meta.env.VITE_ILDREAM_URL;

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

// 탭 상태별 버튼 텍스트 매핑 예시
const tabButtonTextMap = {
  "지원 완료": "전화 면접하기",
  "면접 진행": "채용 확정하기",
  "채용 확정": "계약서 작성하기",
  "최종 합격": "계약서 확인하기",
  default: "전화 면접하기",
};

export default function SeekerList() {
  // 탭 상태
  const location = useLocation();
  const jobPostId = location.state?.id;
  console.log("prevState(jobPostId)입니다. ", jobPostId);

  const [currentTab, setCurrentTab] = useState("지원 완료"); // 기본값
  const [backAlertOpen, setBackAlertOpen] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [applicants, setApplicants] = useState([]);
  const buttonText = tabButtonTextMap[currentTab] || tabButtonTextMap.default;

  const handleBack = () => {
    navigate("/employer"); //navigate("/employer/seekerlist/seekerlist/${joblist.id}");
  };

  // useEffect(() => {
  //   async function fetchApplicants() {
  //     try {
  //       const res = await fetch("/jobPosts/{id}/applications"); // 실제 jobId 전달
  //       const json = await res.json();
  //       if (json.success) {
  //         setApplicants(json.data);
  //       }
  //     } catch (error) {
  //       console.error("지원자 목록 불러오기 실패", error);
  //     }
  //   }
  //   fetchApplicants();
  // }, []);
  useEffect(() => {
    if (!jobPostId) return; // id 없으면 요청하지 않음

    async function fetchApplicants() {
      try {
        console.log(jobPostId);
        const res = await fetch(
          `${serverUrl}/jobPosts/${jobPostId}/applications`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // 필요 시 인증 토큰도 추가
              // "Authorization": `Bearer ${token}`
              token: `${employerToken}`,
            },
          }
        );
        if (!res.ok) throw new Error("네트워크 응답 실패");
        const json = await res.json();
        if (json.success) {
          setApplicants(json.data);
          console.log("json.data입니당 ", json.data);
        } else {
          console.error("API 에러", json.message);
        }
      } catch (error) {
        console.error("지원자 목록 불러오기 실패", error);
      }
    }
    fetchApplicants();
  }, [jobPostId]);

  // 1) 총 지원자 수
  const totalApplicants = applicants.length;

  // 2) 성별 인원 수 구하기
  const genderCounts = applicants.reduce((acc, cur) => {
    acc[cur.workerGender] = (acc[cur.workerGender] || 0) + 1;
    return acc;
  }, {});
  console.log(genderCounts);
  // 3) 연령대별 인원 수 구하기
  // 예: 50대, 60대, 70대, 80대 이상
  const ageGroups = {
    "50대": 0,
    "60대": 0,
    "70대": 0,
    "80대 이상": 0,
  };

  applicants.forEach(({ workerAge }) => {
    if (workerAge >= 80) ageGroups["80대 이상"]++;
    else if (workerAge >= 70) ageGroups["70대"]++;
    else if (workerAge >= 60) ageGroups["60대"]++;
    else if (workerAge >= 50) ageGroups["50대"]++;
  });
  const barData = Object.entries(ageGroups).map(([label, value]) => ({
    label,
    value,
  }));

  // 결과 예시 console.log
  console.log("총 지원자:", totalApplicants);
  console.log("성별 인원 수:", genderCounts);
  console.log("연령대별 인원 수:", barData);
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
          handleRecruitmentClose(jobPostId);
          setBackAlertOpen(false);
          setIsClosed(true);
        }}
        onCancel={() => setBackAlertOpen(false)}
        onClose={() => setBackAlertOpen(false)}
      />
      <SummarySection>
        <div className="title">
          지원자 통계{" "}
          <span className="subtitle">총 지원자 {applicants.length}명</span>
        </div>
        <StatsRow
          totalApplicants={totalApplicants}
          genderCounts={genderCounts}
          barData={barData}
        ></StatsRow>
      </SummarySection>
      <FilterTab_SeekerList
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <List>
        {applicants.map((applicant) => (
          <ApplicantItem
            applicationId={applicant.applicationId}
            name={applicant.workerName}
            gender={applicant.workerGender}
            age={applicant.workerAge}
            district={applicant.workerAddress}
            buttonText={buttonText}
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

async function handleRecruitmentClose(jobPostId) {
  try {
    console.log(jobPostId);
    const res = await fetch(`/jobPosts/${jobPostId}/end`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "모집 마감" }),
    });
    // 먼저 status만 확인
    if (!res.ok) {
      alert("서버 오류: " + res.statusText);
      return;
    }

    // Content-Type 확인
    const contentType = res.headers.get("content-type");
    let json;
    // JSON 응답일 경우에만 파싱
    if (contentType && contentType.indexOf("application/json") !== -1) {
      json = await res.json();
    } else {
      // 서버가 빈 응답 혹은 텍스트 등 반환
      json = {};
    }

    if (json.success || res.ok) {
      console.log("채용 마감 완료!!!");
    } else {
      alert("채용 마감 실패");
    }
  } catch (error) {
    console.error("채용 마감 처리 실패", error);
  }
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
