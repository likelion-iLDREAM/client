import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Icons } from "../icons/index";
import Button from "../common/Button";

export default function ApplicantItem({
  applicationId,
  name,
  gender,
  age,
  district,
  currentTab,
  isClosed,
}) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/employer/seekerlist/resume`, { state: { applicationId } });
  };
  // const handleViewApplicants = () => navigate("/employer/seekerlist/resume"); //navigate("../resume/${resume.id}")

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

  const handleViewContract = (e) => {
    e.stopPropagation(); // 부모 onClick 이벤트 전파 차단
    if (currentTab === "채용 확정" || currentTab === "최종 합격") {
      navigate("/employer/seekerlist/writecontract");
    }
  };

  return (
    <ApplicantCard onClick={handleViewDetails}>
      <NameRow>
        <InfoBlock>
          <Name>{name}</Name>
          <SumWrap>
            <Summary>{gender}</Summary>
            <Summary>{age}대</Summary>
            <Summary>{district}</Summary>
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
  );
}

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
