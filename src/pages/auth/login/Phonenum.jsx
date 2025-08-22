import Button from "../../../components/common/Button";
import styled from "styled-components";
import ildreamText from "../../../assets/ildreamText.svg";
import Enter from "../../../components/common/Enter";

export default function Phonenum() {
  return (
    <PhonenumContainer>
      <div className="Logo">
        <img src={ildreamText} />
      </div>
      <div className="Text">전화번호를 입력해주세요.</div>
      <div className="Input">
        <Enter text={"이곳에 전화번호를 입력해주세요."} />
      </div>
      <div className="Bottom">
        <Button text={"인증번호 요청하기"} />
      </div>
    </PhonenumContainer>
  );
}

const PhonenumContainer = styled.div`
  background-color: #ebf8ed;
  width: 100%;
  display: flex;
  flex-direction: column;
  > .Bottom {
    margin-bottom: 35px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 242px;
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
  > .Text {
    margin-left: 37px;
    margin-top: 85px;
    font-size: 20px;
    font-weight: 700;
  }
  > .Input {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
