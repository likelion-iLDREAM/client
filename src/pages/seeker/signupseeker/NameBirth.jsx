import styled from "styled-components";
import Header from "../../../components/common/Header";
import ProgressBar from "../../../components/common/Progressbar";
import Enter from "../../../components/common/Enter";
import Button from "../../../components/common/Button";

export default function NameBirth() {
  return (
    <NameBirthContainer>
      <Header text={"회원가입"} />
      <ProgressBar value={"40"} max={"100"} />
      <h2 className="Text1">
        이름과
        <br />
        주민등록번호 앞 7자리를
        <br />
        입력해주세요.
      </h2>
      <Section />
      <div className="Bottom">
        <Button text={"다음"} type={"White"} />
      </div>
    </NameBirthContainer>
  );
}

const NameBirthContainer = styled.div`
  background-color: #fff;
  width: 400px;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  > .Text1 {
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
`;

function Section() {
  return (
    <SectionContainer>
      <Enter text={"이름을 입력해주세요."} />
      <div className="Birth">
        <input></input>
        <input></input>
      </div>
    </SectionContainer>
  );
}

const SectionContainer = styled.div`
  > .Birth {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
  }
  > .Birth > input {
    display: flex;
    padding: 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 7px;
    border: 1px solid var(--Foundation-Black-black-6, #bfbfbf);
    color: var(--Foundation-Black-black-6, #bfbfbf);
    font-family: "Pretendard Variable";
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    &:focus {
      outline: none;
    }
  }
`;
