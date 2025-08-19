import styled from "styled-components";

export default function Header() {
  return <HeaderContainer>회원가입</HeaderContainer>;
}

const HeaderContainer = styled.div`
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
