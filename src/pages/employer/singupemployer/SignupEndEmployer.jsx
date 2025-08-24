import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import Enter from "../../../components/common/Button";
import ProgressBar from "../../../components/common/Progressbar";
import styled from "styled-components";
import { Icons } from "../../../components/icons/index";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const employerToken = import.meta.env.VITE_EMPLOYER_TOKEN;

export default function SignupEndEmployer() {
  const navigate = useNavigate();
  const location = useLocation();

  const FinalData = location.state || {};
  console.log("final data :", FinalData);

  const postDataToBackend = async (formData) => {
    const payload = transformFormData(formData);

    try {
      const response = await fetch("/auth/employer/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }

      const data = await response.json();
      console.log("저장 성공", data);
      return data;
    } catch (error) {
      console.error("저장 중 오류 발생", error);
      throw error;
    }
  };

  // const handleNext = () => {
  //   navigate("/employer");
  // };

  const handleSave = async () => {
    try {
      const result = await postDataToBackend(formData);
      // 저장 성공 후 후속 처리 (예: 페이지 이동, 메시지 표시 등)
      navigate("/employer");
    } catch (error) {
      // 오류 처리
    }
  };
  return (
    <>
      <Header text={"새 공고"} />
      <ApplyWrapper>
        <ProgressBar value={"100"} max={"100"} />
        <Question>
          회원가입이
          <br />
          완료되었어요.
          <br />
          <br />
          첫 공고를 등록해 <br />
          바로 채용을 시작해보세요!
          <br />
        </Question>
      </ApplyWrapper>
      <Footer>
        <Button text="확인" type="White" onClick={handleSave} />
      </Footer>
    </>
  );
}

function transformFormData(formData) {
  return {
    name: formData.name || "",
    email: formData.email || "",
    bossName: formData.bossName || "",
    phoneNumber: formData.phone || "", // 이름이 phoneNumber로 변경됨
    companyName: formData.companyName || "",
    companyLocation: `${formData.address || ""} ${
      formData.addressDetail || ""
    }`.trim(),
    companyNumber: formData.companyNumber || "",
    jobFields: (formData.jobFields || []).join(","),
    // 이미 배열이므로 그대로 사용; 필요시 문자열 변환 가능
  };
}

const ApplyWrapper = styled.div`
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 45px;
  flex: 1 0 0;
  align-self: stretch;
  background-color: var(--Foundation-Black-black-1);
  height: 70vh;
`;

const Question = styled.div`
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid #d9d9d9;
  padding: 10px;
`;
