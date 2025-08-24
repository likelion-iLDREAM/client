import styled from "styled-components";
import Header from "../../../components/common/Header";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";
import { useState } from "react";

export default function CheckSuccess() {
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
          <Highlight>[지역] 구인공고명 공고</Highlight>에<br />
          <Highlight>최종합격</Highlight>하셨어요.
        </p>

        <Gap />

        <p>축하합니다! 🎉</p>
      </Text>

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
  gap: 10px 0;
`;
