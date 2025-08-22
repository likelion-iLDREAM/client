import styled from "styled-components";
import Button from "../../common/Button";

export default function Choice() {
  const questionTitle = "(준)고령자(50세 이상)을 만족하시나요?";

  return (
    <Container>
      <Title>{questionTitle}</Title>
      <YesNo>
        <Button type={"White"} text={"네"} />
        <Button type={"White"} text={"아니요"} />
      </YesNo>
    </Container>
  );
}

const Container = styled.div``;

const Title = styled.h2`
  margin: 0 0 12px 0;
  padding: 0 10px;
  font-size: 26px;
  font-weight: 800;
  line-height: 1.35;
  color: #18a058;
`;

const YesNo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px 40px;
`;
