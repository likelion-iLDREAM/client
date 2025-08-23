import styled from "styled-components";
import Button from "../../../components/common/Button";
import ildreamText from "../../../assets/ildreamText.svg";
import "../../../styles/color.css";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/common/Header";

const HEADER_H = 56; // 헤더 높이(필요 시 실제 높이에 맞춰 조정)
const BOTTOM_H = 90; // 하단바 높이(버튼 높이+패딩에 맞춰 조정)

export default function LoginStart() {
  const navigate = useNavigate();
  return (
    <LoginContainer>
      {/* 헤더 고정 */}
      <HeaderFixed>
        <Header />
      </HeaderFixed>

      {/* 가운데 콘텐츠는 헤더/바텀 사이에 고정된 높이로 표시 */}
      <Content>
        <div className="Logo">
          <img src={ildreamText} />
        </div>
      </Content>

      {/* 하단바 고정 */}
      <BottomFixed>
        <Button
          text={"전화번호로 시작하기"}
          onClick={() => navigate("/phone")}
        />
      </BottomFixed>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  background-color: #ebf8ed;
  width: 100%;
  min-height: 100dvh;

  /* 고정된 헤더/바텀 때문에 가려지지 않도록 패딩으로 공간 확보 */
  padding-top: ${HEADER_H}px;
  padding-bottom: ${BOTTOM_H}px;
  box-sizing: border-box;
`;

const HeaderFixed = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${HEADER_H}px;
  z-index: 50;
  background-color: #ebf8ed;
  display: flex;
  align-items: center;

  /* Header 컴포넌트의 실제 높이가 다르면 내부 정렬로 맞춰집니다 */
  > * {
    width: 100%;
  }
`;

const Content = styled.div`
  /* 헤더와 바텀 사이의 영역을 항상 동일하게 유지 */
  min-height: calc(100dvh - ${HEADER_H}px - ${BOTTOM_H}px);
  display: flex;
  align-items: center;
  justify-content: center;

  .Logo {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .Logo img {
    width: 255px;
    height: 215px;
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
  z-index: 50;
`;
