import styled from "styled-components";
import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import { IoCheckboxOutline, IoCheckbox } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";

const HEADER_H = 56; // 헤더 높이(필요 시 실제 높이로 조정)
const BOTTOM_H = 90; // 하단 고정 영역 높이

export default function Terms() {
  const navigate = useNavigate();

  // 각 항목 동의 상태
  const [agreeTerms, setAgreeTerms] = useState(false); // (필수) 이용 약관 동의
  const [agreePrivacy, setAgreePrivacy] = useState(false); // (필수) 개인정보 수집이용 동의
  const [agreeMarketing, setAgreeMarketing] = useState(false); // (선택) 마케팅 정보 수신 동의

  // 파생 상태
  const allChecked = useMemo(
    () => agreeTerms && agreePrivacy && agreeMarketing,
    [agreeTerms, agreePrivacy, agreeMarketing]
  );
  const isNextEnabled = useMemo(
    () => agreeTerms && agreePrivacy,
    [agreeTerms, agreePrivacy]
  );

  // 전체 동의 토글
  const handleToggleAll = () => {
    const next = !allChecked;
    setAgreeTerms(next);
    setAgreePrivacy(next);
    setAgreeMarketing(next);
  };

  // 다음 단계 이동
  const handleNext = () => {
    if (isNextEnabled) {
      navigate("/terms/selectrole");
    }
  };

  return (
    <TermsContainer>
      {/* 헤더 고정 */}
      <HeaderFixed>
        <Header text={"회원가입"} />
      </HeaderFixed>

      {/* 콘텐츠: 헤더/바텀 사이 간격 고정 */}
      <Content>
        <div className="Text1">
          <div>약관 동의가</div>
          <div>필요해요.</div>
        </div>

        {/* 전체 동의 */}
        <div className="termall" onClick={handleToggleAll}>
          {allChecked ? (
            <IoCheckbox size="24" color="#2BAF66" />
          ) : (
            <IoCheckboxOutline size="24" color="#0F3D24" />
          )}
          약관 전체동의
        </div>

        <div className="Terms">
          {/* (필수) 이용 약관 동의 */}
          <div className="term" onClick={() => setAgreeTerms((v) => !v)}>
            {agreeTerms ? (
              <IoCheckbox size="24" color="#2BAF66" />
            ) : (
              <IoCheckboxOutline size="24" color="#0F3D24" />
            )}
            (필수) 이용 약관 동의
            <div className="forward">
              <IoIosArrowForward size="24" color="#0F3D24" />
            </div>
          </div>

          {/* (필수) 개인정보 수집이용 동의 */}
          <div className="term" onClick={() => setAgreePrivacy((v) => !v)}>
            {agreePrivacy ? (
              <IoCheckbox size="24" color="#2BAF66" />
            ) : (
              <IoCheckboxOutline size="24" color="#0F3D24" />
            )}
            (필수) 개인정보 수집이용 동의
            <div className="forward">
              <IoIosArrowForward size="24" color="#0F3D24" />
            </div>
          </div>

          {/* (선택) 마케팅 정보 수신 동의 */}
          <div className="term" onClick={() => setAgreeMarketing((v) => !v)}>
            {agreeMarketing ? (
              <IoCheckbox size="24" color="#2BAF66" />
            ) : (
              <IoCheckboxOutline size="24" color="#0F3D24" />
            )}
            (선택) 마케팅 정보 수신 동의
            <div className="forward">
              <IoIosArrowForward size="24" color="#0F3D24" />
            </div>
          </div>
        </div>
      </Content>

      {/* 하단 버튼 고정 */}
      <BottomFixed>
        <Button
          text={"다음"}
          type={"White"}
          disabled={!isNextEnabled}
          onClick={handleNext}
        />
      </BottomFixed>
    </TermsContainer>
  );
}

const TermsContainer = styled.div`
  background-color: #fff;
  width: 100%;
  max-width: 400px; /* 기존 400px 유지하면서 중앙정렬 */
  margin: 0 auto;
  min-height: 100dvh;

  /* 고정된 헤더/바텀 때문에 가려지지 않도록 패딩 확보 */
  padding-top: ${HEADER_H}px;
  padding-bottom: ${BOTTOM_H}px;
  box-sizing: border-box;
`;

const HeaderFixed = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%); /* 400px 레이아웃 중앙 고정 */
  width: 100%;
  max-width: 400px;
  height: ${HEADER_H}px;
  background: #fff;
  z-index: 50;

  display: flex;
  align-items: center;

  /* Header가 가로로 꽉 차도록 */
  > * {
    width: 100%;
  }
`;

const Content = styled.div`
  /* 헤더/바텀 사이 영역을 고정 높이로 */
  min-height: calc(100dvh - ${HEADER_H}px - ${BOTTOM_H}px);
  display: flex;
  flex-direction: column;
  align-items: center;

  > .Text1 {
    font-size: 30px;
    font-weight: 700;
    margin-top: 30px;
    margin-left: 45px;
    margin-right: auto;
  }

  > .Terms {
    margin: 10px 30px 30px 30px;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  > .Terms > .term {
    display: flex;
    width: 300px;
    height: 80px;
    padding: 5px;
    align-items: center;
    border-radius: 8px;
    background: var(--Foundation-Green-Light, #eaf7f0);
    margin-bottom: 27px;
    font-size: 20px;
    gap: 5px;
    cursor: pointer;
    position: relative;
  }

  > .Terms > .term > .forward {
    margin-left: auto;
    display: flex;
    align-items: center;
  }

  > .termall {
    display: flex;
    align-items: center;
    margin-top: 150px;
    padding: 0px 45px 0px 45px;
    gap: 5px;
    font-size: 20px;
    cursor: pointer;
    margin-right: auto;
  }
`;

const BottomFixed = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  width: 100%;
  max-width: 400px;
  height: ${BOTTOM_H}px;
  background: #fff;
  border-top: 1px solid #d9d9d9;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px; /* 기존 .Bottom의 패딩 유지 */
  box-sizing: border-box;
  z-index: 50;
`;
