import styled from "styled-components";
import Header from "../../../components/common/Header";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";
import { useState } from "react";

export default function CheckFail() {
  const navigate = useNavigate();

  // NameBirth에서 저장한 이름 불러오기 (없으면 기본값)
  const [name] = useState(
    () => (sessionStorage.getItem("signup.name") || "").trim() || "홍길동"
  );

  return (
    <CheckContainer>
      <Header showBack text={"지원 결과"} />
      <Text>
        <p>
          {name} 님이
          <br />
          지원하신
          <br />
          <Highlight>[지역] 구인공고명 공고</Highlight>는<br />
          이번에 함께하지 못했어요. 🥲
        </p>

        <Gap />

        <p>
          아쉽게도 이번에는
          <br />
          인연이 아니었지만,
          <br />
          곧 멋진 기회가
          <br />
          찾아올 거예요.
          <br />
          계속 함께 걸어가요.
        </p>
      </Text>

      <Tap>
        <Button
          onClick={() => navigate("/homeseeker")}
          text={"다른 기회 잡으러 가기"}
        />
      </Tap>
    </CheckContainer>
  );
}

const CheckContainer = styled.div``;

const Text = styled.div`
  padding: 80px 40px;
  color: #000;
  font-size: 25px;
  font-weight: 700;
  line-height: 1.4;

  p {
    margin: 0;
  }
`;

const Highlight = styled.span`
  color: var(--Foundation-Green-Normal, #2baf66);
`;

const Gap = styled.div`
  height: 20px; /* 한 줄 띄우기 */
`;

const Tap = styled.div`
  border-top: 1px solid #bbb;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
