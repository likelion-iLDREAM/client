import styled from "styled-components";
import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import { IoCheckboxOutline, IoCheckbox } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
/*
체크 박스, 이동 구현
*/

export default function Terms() {
  return (
    <TermsContainer>
      <Header />

      <div className="Text1">
        <div>약관 동의가</div>
        <div>필요해요.</div>
      </div>
      <div className="termall">
        <IoCheckboxOutline size="24" color="#0F3D24" />
        약관 전체동의
      </div>
      <div className="Terms">
        <div className="term">
          <IoCheckboxOutline size="24" color="#0F3D24" />
          (필수) 이용 약관 동의
          <div className="forward">
            <IoIosArrowForward size="24" color="#0F3D24" />
          </div>
        </div>
        <div className="term">
          <IoCheckboxOutline size="24" color="#0F3D24" />
          (필수) 개인정보 수집이용 동의
          <IoIosArrowForward size="24" color="#0F3D24" />
        </div>
        <div className="term">
          <IoCheckboxOutline size="24" color="#0F3D24" />
          (선택) 마케팅 정보 수신 동의
          <IoIosArrowForward size="24" color="#0F3D24" />
        </div>
      </div>
      <div className="Bottom">
        <Button text={"다음"} type={"White"} />
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
    font-size: 25px;
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
    justify-content: column;
    align-items: center;
    border-radius: 8px;
    background: var(--Foundation-Green-Light, #eaf7f0);
    margin-bottom: 27px;
    font-size: 20px;
    gap: 5px;
    cursor: pointer;
  }
  > .Terms > .term > .forward {
    padding-left: 75px;
  }
  > .termall {
    display: flex;
    justify-content: column;
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
