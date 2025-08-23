import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import FilterTab_SeekerList from "../../../components/employer/FilterTab_SeekerList";
import StatsRow from "../../../components/employer/StatsRow";
import styled from "styled-components";
import { Icons } from "../../../components/icons/index";
import { useState } from "react";
import Alert_emp from "../../../components/employer/Alert_emp";
import { useNavigate } from "react-router-dom";

export default function SeekerList() {
  // 탭 상태
  const [currentTab, setCurrentTab] = useState("지원 완료"); // 기본값
  const [backAlertOpen, setBackAlertOpen] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  // 탭에 따라 하단 버튼 문구와 카드 내용 등 변경
  let buttonText;
  switch (currentTab) {
    case "지원 완료":
      buttonText = "전화 면접하기";
      break;
    case "면접 진행":
      buttonText = "채용 확정하기";
      break;
    case "채용 확정":
      buttonText = "계약서 작성하기";
      break;
    case "최종 합격":
      buttonText = "계약서 확인하기";
      break;
    default:
      buttonText = "전화 면접하기";
  }
  const isButtonDisabled =
    isClosed && !(currentTab === "채용 확정" || currentTab === "최종 합격");
  const navigate = useNavigate();
  const handleViewApplicants = () => navigate("/employer/seekerlist/resume"); //navigate("../resume/${resume.id}")
  const handleViewContract = () => {
    if (currentTab === "채용 확정") {
      return navigate("/employer/seekerlist/writecontract");
      // navigate("seekerlist/${job.id}")
    } else if (currentTab === "최종 합격") {
      return navigate("/employer/seekerlist/writecontract");
    } else return;
  };

  return (
    <>
      <Headersection>
        <Header text={"지원자 현황"} showBack />
      </Headersection>
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
        <StatsRow>
          {/* <RoundStat>
                <CircleChart total={8} malePercent={25} femalePercent={75} />
              </RoundStat>
              <AgeGraph>
                <AgeBarChart stats={ageStats} />
              </AgeGraph> */}
        </StatsRow>
      </SummarySection>
      <FilterTab_SeekerList
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <List>
        <ApplicantCard onClick={handleViewApplicants}>
          <NameRow>
            <InfoBlock>
              <Name>홍길동</Name>
              <SumWrap>
                <Summary>남성</Summary>
                <Summary>50대</Summary>
                <Summary>00구</Summary>
              </SumWrap>
            </InfoBlock>
            <Icons.ArrowForward size={32} />
          </NameRow>
          <Button
            text={buttonText}
            disabled={isButtonDisabled}
            onClick={handleViewContract}
          />
        </ApplicantCard>
      </List>
      <Footer>
        <ConfirmBtn disabled={isClosed} onClick={() => setBackAlertOpen(true)}>
          {isClosed ? "채용 마감" : "채용 마감하기"}
        </ConfirmBtn>
      </Footer>
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

// 지원자 카드 전체 박스
const ApplicantCard = styled.div`
  background: var(--Foundation-Green-Light);
  border-radius: 10px;
  padding: 5px 10px;
  box-shadow: 0 2px 12px #ecf9f3;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height 140px;
  width : 95%;
  cursor : pointer;
  `;

// 이름/세부/아이콘 row
const NameRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

// 이름과 세부 wrap (세로)
const InfoBlock = styled.div`
  padding: 10px;
  gap: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
`;

// 이름 (볼드, 크고)
const Name = styled.span`
  color: #000;
  font-size: 20px;
  font-weight: 700;
`;

// 세부정보 묶음 (가로)
const SumWrap = styled.div`
  align-items: center;
  gap: 5px;
  align-self: stretch;
  display: flex;
  gap: 8px;
`;

// 각 세부 tag 스타일
const Summary = styled.span`
  display: flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 8px;
  background: #fff;
  color: #000;
  font-size: 15px;
  font-weight: 500;
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
