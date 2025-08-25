import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Icons } from "../icons/index";
import Button from "../common/Button";

const employerToken = import.meta.env.VITE_EMPLOYER_TOKEN;
const serverUrl = import.meta.env.VITE_ILDREAM_URL;

export default function ApplicantItem({
  applicationId,
  name,
  gender,
  age,
  district,
  buttonText,
  isClosed,
}) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/employer/seekerlist/resume`, {
      state: { applicationId, buttonText },
    });
  };
  // const handleViewApplicants = () => navigate("/employer/seekerlist/resume"); //navigate("../resume/${resume.id}")

  const isButtonDisabled = isClosed && !(buttonText === "계약서 작성하기");

  // const handleViewContract = (e) => {
  //   e.stopPropagation(); // 부모 onClick 이벤트 전파 차단
  //   if (buttonText === "계약서 작성하기" || buttonText === "계약서 확인하기") {
  //     navigate("/employer/seekerlist/writecontract", {
  //       state: { applicationId, buttonText },
  //     });
  //   } else if (buttonText === "전화 면접하기") {
  //   } else {
  //     // "채용 확정하기"
  //   }
  // };
  const handleViewContract = async (e) => {
    e.stopPropagation();

    try {
      if (buttonText === "계약서 작성하기") {
        navigate("/employer/seekerlist/writecontract", {
          state: { applicationId, buttonText },
        });
      } else if (buttonText === "전화 면접하기") {
        // 1. application/{id}에서 workerPhoneNumber 조회
        const res = await fetch(`${serverUrl}/applications/${applicationId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: employerToken,
          },
        });

        if (!res.ok) throw new Error("전화번호 조회 실패");

        const data = await res.json();

        const phoneNumber = data.workerPhoneNumber || "";

        if (phoneNumber) {
          // 2. 클립보드에 전화번호 복사
          await navigator.clipboard.writeText(phoneNumber);
          alert("전화번호가 복사되었습니다: " + phoneNumber);
        } else {
          alert("전화번호가 없습니다.");
        }

        // 3. 상태 "보류"로 변경 PATCH 요청
        const patchRes = await fetch(
          `${serverUrl}/applications/${applicationId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              token: employerToken,
            },
            body: JSON.stringify({ status: "보류" }),
          }
        );

        if (!patchRes.ok) throw new Error("상태 변경 실패");

        alert("상태가 '보류'로 변경되었습니다.");
      } else if (buttonText === "채용 확정하기") {
        // "채용 확정하기" 버튼 클릭 시 상태를 "승인"으로 변경
        const patchRes = await fetch(
          `${serverUrl}/applications/${applicationId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              token: employerToken,
            },
            body: JSON.stringify({ status: "승인" }),
          }
        );

        if (!patchRes.ok) throw new Error("상태 변경 실패");

        alert("상태가 '승인'으로 변경되었습니다.");
      } else {
        console.log("합격");
      }
    } catch (error) {
      alert("작업 중 오류 발생: " + error.message);
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
      {buttonText ? (
        <Button
          text={buttonText}
          disabled={isButtonDisabled}
          onClick={handleViewContract}
        />
      ) : null}
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
