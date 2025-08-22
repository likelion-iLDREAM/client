import styled from "styled-components";
import Header from "../../../components/common/Header";
import ProgressBar from "../../../components/common/Progressbar";
import Button from "../../../components/common/Button";

export default function SignupEnd() {
  return (
    <SignupEndContainer>
      <Header text={"회원가입"} />
      <ProgressBar value={"100"} max={"100"} />
      <h2 className="Text1">
        회원가입이
        <br />
        완료되었어요.
        <br />
        <br />
        000님을 위한
        <br />
        구직공고를
        <br />
        확인해보세요!
      </h2>
      <div className="Bottom">
        <Button text={"시작하기"} type={"White"} />
      </div>
    </SignupEndContainer>
  );
}

const SignupEndContainer = styled.div`
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
    margin-top: 200px;
  }
`;
