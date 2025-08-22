// 변경: import 추가
import { IoIosArrowBack } from "react-icons/io";
import styled from "styled-components";
import ildream from "../../assets/ildream.svg";

// 변경: 컴포넌트 시그니처 & 조건부 렌더링
// Header.jsx — 함수 시그니처 & children 렌더링으로 교체
export default function Header({ text, showBack = false, onBack, children }) {
  return (
    <HeaderContainer>
      {showBack && (
        <BackButton
          type="button"
          aria-label="뒤로가기"
          onClick={
            onBack ||
            (() => typeof window !== "undefined" && window.history.back())
          }
        >
          <IoIosArrowBack />
        </BackButton>
      )}
      {children ?? text}
    </HeaderContainer>
  );
}

// 변경: position 추가
const HeaderContainer = styled.div`
  position: relative;
  width: 400px;
  height: 70px;
  background-color: #eaf7f0;
  font-size: 30px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// 추가: 뒤로가기 버튼 스타일
const BackButton = styled.button`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  background: transparent;
  border: 0;
  padding: 10px;
  cursor: pointer;

  svg {
    width: 32px;
    height: 32px;
  }
`;
