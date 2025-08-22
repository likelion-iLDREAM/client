import styled from "styled-components";
import Header from "../../../components/common/Header";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";

export default function CheckFail() {
  const navigate = useNavigate();

  return (
    <CheckContainer>
      <Header showBack text={"지원 결과"} />
      <Text>Text</Text>
      <Tap>
        <Button
          onClick={() => navigate("/homeseeker/jobs")}
          text={"다른 기회 잡으러 가기"}
        />
      </Tap>
    </CheckContainer>
  );
}

const CheckContainer = styled.div``;

const Text = styled.div`
  padding: 80px 40px;
`;

const Tap = styled.div`
  border-top: 1px solid #bbb;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
