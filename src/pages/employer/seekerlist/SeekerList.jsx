import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import FilterTab_SeekerList from "../../../components/employer/FilterTab_SeekerList";
import StatsRow from "../../../components/employer/StatsRow";
import styled from "styled-components";
import { Icons } from "../../../components/icons/index";
import { useState } from "react";

export default function SeekerList() {
  // 탭 상태
  const [currentTab, setCurrentTab] = useState("지원 완료"); // 기본값

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
  return (
    <>
      <Header text="지원자 현황" />
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
        <ApplicantCard>
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
          <ConfirmBtn>{buttonText}</ConfirmBtn>
        </ApplicantCard>
      </List>
      <Footer>
        <Button text="채용 마감하기" type="White"></Button>
      </Footer>
    </>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  max-width: 375px;
  margin: 0 auto;
  background: #fff;
  min-height: 100vh;
  font-family: Pretendard, sans-serif;
  display: flex;
  flex-direction: column;
`;

const StatusTabBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 12px;
  background: #fff;
  position: sticky; /* sticky 속성! */
  top: 54px; /* 헤더 높이에 맞게 조정 */
  z-index: 10;
  border-bottom: 1px solid #ebebeb;
`;

const Tab = styled.button`
  flex: 1;
  border: none;
  background: none;
  font-size: 16px;
  font-weight: 600;
  color: ${({ active }) =>
    active ? "var(--Foundation-Green-Normal, #23c163)" : "#888"};
  border-bottom: 2px solid
    ${({ active }) =>
      active ? "var(--Foundation-Green-Normal, #23c163)" : "transparent"};
  padding: 16px 0 8px;
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

const RoundStat = styled.div`
  /* 적당한 크기의 원형 차트 or 숫자 영역 */
`;

const Circle = styled.div`
  width: 78px;
  height: 78px;
  border-radius: 50%;
  border: 4px solid #2363e0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  color: #333;
`;

const AgeGraph = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  gap: 8px;
  height: 60px;
  /* bar별 width, height, color 직접 지정 */
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
  background: var(--Foundation-Green-Normal, #23c163);
  color: #fff;
  border: none;
  border-radius: 7px;
  font-size: 18px;
  font-weight: 700;
  padding: 12px 0;
`;

const Footer = styled.div`
  background-color: White;
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
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
