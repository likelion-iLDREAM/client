import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import Enter from "../../../components/common/Button";
import ProgressBar from "../../../components/common/Progressbar";
import styled from "styled-components";
import { Icons } from "../../../components/icons/index";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// const employerToken = import.meta.env.VITE_EMPLOYER_TOKEN;
const serverUrl = import.meta.env.VITE_ILDREAM_URL;

export default function SignupEndEmployer() {
  const employerToken = sessionStorage.getItem("authToken")?.trim();

  console.log("employer token: ", employerToken);
  const navigate = useNavigate();
  const location = useLocation();

  const FinalwithtokenData = location.state || {};
  const { token, ...rest } = FinalwithtokenData;
  const FinalData = rest;
  console.log("final data :", transformFormData(FinalData));

  const postDataToBackend = async (formData, token) => {
    const payload = transformFormData(formData);
    console.log(payload);
    console.log(token);
    try {
      const response = await fetch(`${serverUrl}/auth/employer/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify(transformFormData(payload)),
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
  const handleSave = async (token) => {
    try {
      const dataToSend = transformFormData(FinalData);
      console.log("보낼 데이터:", dataToSend);

      const response = await fetch(`${serverUrl}/employers/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("저장 성공", responseData);

      navigate("/employer");
    } catch (error) {
      console.error("저장 중 오류 발생", error);
      alert("데이터 저장에 실패했습니다.");
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
        <Button text="확인" type="White" onClick={handleSave(token)} />
      </Footer>
    </>
  );
}

function formatPhone(phone) {
  if (!phone) return "";

  // 이미 +82 로 시작하면 그대로 리턴
  if (phone.startsWith("+82")) return phone;

  // 전화번호가 0으로 시작하면 0을 빼고 +82 붙임
  if (phone.startsWith("0")) {
    return "+82" + phone.slice(1);
  }

  // 그 외는 그냥 +82 붙임
  return "+82" + phone;
}

function transformFormData(formData) {
  return {
    name: formData.name || "",
    email: formData.email || "",
    bossName: formData.bossName || "",
    phoneNumber: formatPhone(formData.phone) || "", // 이름이 phoneNumber로 변경됨
    companyName: formData.companyName || "",
    companyLocation: `${formData.address || ""} ${
      formData.addressDetail || ""
    }`.trim(),
    companyNumber: formData.companyNumber || "",
    jobFields: (formData.jobFields || []).map((field) => {
      // 각 그룹 문자열을 쉼표로 분리 → 배열
      const emojiRegex = /\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu;
      const cleanedRest = field.replace(emojiRegex, "");

      return cleanedRest.trim().split("·").join(",");
    }),
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
