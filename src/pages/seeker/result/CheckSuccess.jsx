import styled from "styled-components";
import Header from "../../../components/common/Header";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";

export default function CheckSuccess() {
  const navigate = useNavigate();

  return (
    <CheckContainer>
      <Header showBack text={"지원 결과"} />
      <Text>축하해</Text>
      <Tap>
        <Button
          type={"White"}
          onClick={() => navigate("/homeseeker/jobs")}
          text={"채용 포기하기"}
        />
        <Button
          onClick={() => navigate("/homeseeker/jobs")}
          text={"근로 확정하기"}
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
  gap: 10px 0;
`;
