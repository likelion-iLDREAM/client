import Button from "../../../components/common/Button";
import styled from "styled-components";
import ildreamText from "../../../assets/ildreamText.svg";
import Enter from "../../../components/common/Enter";
import { useNavigate } from "react-router-dom";

const BOTTOM_H = 90; // 하단 고정 영역 높이(필요시 조정)

export default function Phonenum() {
  const navigate = useNavigate();

  return (
    <PhonenumContainer>
      {/* 스크롤되더라도 하단 버튼과의 간격은 고정 */}
      <Content>
        <div className="Logo">
          <img src={ildreamText} />
        </div>
        <div className="Text">전화번호를 입력해주세요.</div>
        <div className="Input">
          <Enter text={"이곳에 전화번호를 입력해주세요."} />
        </div>
      </Content>

      {/* 하단 버튼 고정 */}
      <BottomFixed>
        <Button text={"인증번호 요청하기"} onClick={() => navigate("/opt")} />
      </BottomFixed>
    </PhonenumContainer>
  );
}

const PhonenumContainer = styled.div`
  background-color: #ebf8ed;
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;

  /* 하단 고정 바 때문에 내용이 가려지지 않도록 패딩 확보 */
  padding-bottom: ${BOTTOM_H}px;
  box-sizing: border-box;
`;

const Content = styled.div`
  /* 화면 높이에서 하단 고정 영역만큼 뺀 영역을 컨텐츠 영역으로 고정 */
  min-height: calc(100dvh - ${BOTTOM_H}px);
  display: flex;
  flex-direction: column;

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
    margin-left: 50px;
    margin-top: 85px;
    font-size: 20px;
    font-weight: 700;
  }

  > .Input {
    padding: 0 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const BottomFixed = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: ${BOTTOM_H}px;
  background-color: #ebf8ed;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
  box-sizing: border-box;
  z-index: 50; /* 오버레이 우선순위 확보 */
`;
