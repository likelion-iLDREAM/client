import styled from "styled-components";

export default function TapBar() {
  return (
    <TapBarContainer>
      <div>TapBar</div>
    </TapBarContainer>
  );
}

const TapBarContainer = styled.div`
  display: flex;
  width: 400px;
  height: 70px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background: var(--Foundation-Green-Light, #eaf7f0);
  position: fixed;
  z-index: 1000;
  left: 0;
  right: 0; /* = width: 100% */
  bottom: 0%;
`;
