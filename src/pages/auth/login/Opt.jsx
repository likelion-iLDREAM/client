import Button from "../../../components/common/Button";
import styled from "styled-components";
import ildreamText from "../../../assets/ildreamText.svg";
import Enter from "../../../components/common/Enter";

/*
전화 번호 입력 후
남은 시간 기능
*/

export default function Opt() {
  return (
    <OptContainer>
      <div className="Logo">
        <img src={ildreamText} />
      </div>
      <div className="Text1">전화번호로 인증번호를 보내드렸어요.</div>
      <div className="Input">
        <Enter text={"전화번호 입력...."} />
      </div>
      <div className="Text2">인증번호를 입력해주세요.</div>
      <div className="Input">
        <Enter text={"이곳에 인증번호를 입력해주세요."} />
      </div>
      <div className="Time">남은 시간: </div>
      <div className="Bottom">
        <div>
          <Button text={"재전송하기"} type={"White"} />
        </div>
        <div>
          <Button text={"인증번호 요청하기"} />
        </div>
      </div>
    </OptContainer>
  );
}

const OptContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  > .Bottom {
    margin-bottom: 34px;
    margin-top: 51px;
    gap: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  > .Logo {
    img {
      width: 255px;
      height: 215px;
    }
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  > .Text1 {
    margin-left: 37px;
    margin-top: 85px;
    font-size: 20px;
    font-weight: 700;
  }
  > .Text2 {
    margin-left: 37px;
    margin-top: 30px;
    font-size: 20px;
    font-weight: 700;
  }
  > .Input {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  > .Time {
    font-size: 20px;
    margin-left: 37px;
    margin-top: 5px;
    font-weight: 400;
  }
`;
