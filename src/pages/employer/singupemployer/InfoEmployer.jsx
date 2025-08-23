import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import Enter from "../../../components/common/Enter";
import ProgressBar from "../../../components/common/Progressbar";
import styled from "styled-components";
import { Icons } from "../../../components/icons/index";
// import { useState} from "react";
import { useNavigate } from "react-router-dom";

export default function InfoEmployer() {
  const navigate = useNavigate();
  const handleNext = () => {
    navigate("/employer/singupemployer/hiringfields");
  };

  return (
    <>
      <Header text="새공고" />
      <ApplyWrapper>
        <ProgressBar value={"25"} max={"100"} />
        <Question>
          기업 정보를 <br />
          입력해 주세요
        </Question>
        <OptionsWrapper>
          <SubWrapper>
            이름
            <Enter text="이름을 입력해주세요" />
          </SubWrapper>
          <SubWrapper>
            전화번호
            <EnterWrapper>
              <input readOnly placeholder="010-1234-5678" />
            </EnterWrapper>
          </SubWrapper>
          <SubWrapper>
            이메일
            <Enter text="이메일을 입력해주세요" />
          </SubWrapper>
          <SubWrapper>
            대표자명
            <Enter text="대표자명을 입력해주세요" />
          </SubWrapper>
          <SubWrapper>
            기업명
            <Enter text="회사명을 입력해주세요" />
          </SubWrapper>
          <SubWrapper>
            주소입력
            <InputWrapper>
              <Inputaddress>{"아이콘으로 주소 검색하기"} </Inputaddress>
              <Icons.Map
                color="var(--Foundation-Green-Normal)"
                size={24}
                cursor={"pointer"}
                onClick={() => console.log("주소버튼")}
              />
            </InputWrapper>
            <Inputtitle placeholder={"상세 주소"} />
            <div className="alert" style={{ fontSize: "15px" }}>
              아직은 서울특별시에서만 이용 가능해요.🥲
            </div>
          </SubWrapper>
          <SubWrapper>
            사업자 등록번호
            <Enter text="예)000-00-0000" />
          </SubWrapper>
        </OptionsWrapper>
      </ApplyWrapper>
      <Footer>
        <Button text="다음" type="White" onClick={handleNext} />
      </Footer>
    </>
  );
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
`;

const Question = styled.div`
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid #d9d9d9;
  padding: 10px;
`;
const Inputdate = styled.input`
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  // align-self: stretch;
  border-radius: 7px;
  border: 1px solid var(--Foundation-Black-black-6, #bfbfbf);
  background: var(--Foundation-surface-White, #fff);
`;

const Period = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const SubWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 20px;

  .alert {
    color: #ff5858;
    font-size: 15px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  padding: 7px;
  gap: 10px;
  border-radius: 7px;
  border: 1px solid var(--Foundation-Black-black-6, #bfbfbf);
  background: var(--Foundation-surface-White, #fff);
  width: 100%; /* 화면 너비(부모) 100%로 채움 */
  box-sizing: border-box; /* 패딩/보더 포함 너비 계산 */
  height: 46px;
  align-items: center;
  margin-top: 10px;
`;

const Inputtitle = styled.input`
  border-radius: 7px;
  background: var(--Foundation-surface-White, #fff);
  font-size: 1rem;
  border: 1px solid var(--Foundation-Black-black-6, #bfbfbf);
  padding: 10px;
  outline: none;
  flex: 1;
  display: flex;
  width: 100%; /* 화면 너비(부모) 100%로 채움 */
  box-sizing: border-box; /* 패딩/보더 포함 너비 계산 */
  align-self: stretch;
  color: var(--Foundation-Black-black-7, #8c8c8c);
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  align-items: center;
`;

const Inputaddress = styled.div`
  border-radius: 7px;
  background: var(--Foundation-surface-White, #fff);
  font-size: 1rem;
  border: none;
  outline: none;
  flex: 1 0 0;
  align-self: stretch;
  color: var(--Foundation-Black-black-7, #8c8c8c);
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  align-items: center;
  justify-content: center;
`;

const EnterWrapper = styled.div`
  display: flex;
  width: 294px;
  height: 44px;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  border: 1px solid #bfbfbf;
  background: var(--Foundation-Black-black-5, #d9d9d9);
  margin-top: 10px;

  > input {
    border: none;
    font-size: 20px;
    font-weight: 400;
    background: var(--Foundation-Black-black-5, #d9d9d9);
    pointerevent: none;

    &:focus {
      outline: none;
    }
  }
`;
