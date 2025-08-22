import styled from "styled-components";
import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import { IoCheckboxOutline, IoCheckbox } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";

export default function Terms() {
  const navigate = useNavigate();

  // [추가] 각 항목 동의 상태
  const [agreeTerms, setAgreeTerms] = useState(false); // (필수) 이용 약관 동의
  const [agreePrivacy, setAgreePrivacy] = useState(false); // (필수) 개인정보 수집이용 동의
  const [agreeMarketing, setAgreeMarketing] = useState(false); // (선택) 마케팅 정보 수신 동의

  // [추가] 파생 상태: 전체 동의(세 개가 모두 true일 때)
  const allChecked = useMemo(
    () => agreeTerms && agreePrivacy && agreeMarketing,
    [agreeTerms, agreePrivacy, agreeMarketing]
  );

  // [추가] 다음 버튼 활성 조건: 필수 2개가 모두 체크
  const isNextEnabled = useMemo(
    () => agreeTerms && agreePrivacy,
    [agreeTerms, agreePrivacy]
  );

  // [추가] 전체 동의 토글
  const handleToggleAll = () => {
    const next = !allChecked;
    setAgreeTerms(next);
    setAgreePrivacy(next);
    setAgreeMarketing(next);
  };

  // [추가] 안전한 내비게이션
  const handleNext = () => {
    if (isNextEnabled) {
      navigate("/terms/selectrole");
    }
  };

  return (
    <TermsContainer>
      <Header text={"회원가입"} />
      <div className="Text1">
        <div>약관 동의가</div>
        <div>필요해요.</div>
      </div>

      {/* [추가] 전체 동의 영역 */}
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

      <div className="Bottom" style={{ opacity: isNextEnabled ? 1 : 0.5 }}>
        <Button
          text={"다음"}
          type={"White"}
          disabled={!isNextEnabled}
          onClick={handleNext}
        />
      </div>
    </TermsContainer>
  );
}

const TermsContainer = styled.div`
  background-color: #fff;
  width: 400px;
  height: 100dvh;
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

  > .Bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 1px solid #d9d9d9;
    padding: 10px;
    width: 100%;
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

  > .Bar {
    width: 319px;
    height: 24px;
    margin-top: 30px;
    border-radius: 14px;
    background: var(--Foundation-Green-Light, #eaf7f0);
  }
`;
