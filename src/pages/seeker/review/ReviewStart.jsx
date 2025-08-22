import styled from "styled-components";
import Header from "../../../components/common/Header";
import ReviewCheck from "../../../components/seeker/ReviewCheck";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";

export default function ReviewStart() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const setAnswer = (key) => (idx) =>
    setAnswers((prev) => ({ ...prev, [key]: idx }));
  return (
    <ReviewContainer>
      <Header text={"고용주 후기 작성"} showBack />
      <Section>
        <p>
          구인업체명에 대해
          <br />
          후기를 남겨주세요!
          <br />
          <br />
          작성하신 후기는 다른 시니어들
          <br />
          에게 큰 도움이 돼요!
        </p>
        <Checks>
          <ReviewCheck
            question="사장님은 친절한가요?"
            options={["불친절해요", "보통이에요", "친절해요"]}
            onChange={setAnswer("boss_kindness")}
          />
          <ReviewCheck
            question="동료들은 친절한가요?"
            options={["불친절해요", "보통이에요", "친절해요"]}
            onChange={setAnswer("coworker_kindness")}
          />
          <ReviewCheck
            question="복지는 좋은가요?"
            options={["안좋아요", "보통이에요", "좋아요"]}
            onChange={setAnswer("welfare")}
          />
          <ReviewCheck
            question="재근무 의사가 있나요?"
            options={["없어요", "모르겠어요", "있어요"]}
            onChange={setAnswer("rework_intent")}
          />
          <ReviewCheck
            question="급여는 밀리지 않았나요?"
            options={["자주 밀려요", "보통이에요", "정확해요"]}
            onChange={setAnswer("pay_expansion")}
          />
          <ReviewCheck
            question="시급은 어떤 편이었나요?"
            options={["낮은 편", "최저 시급", "높은 편"]}
            onChange={setAnswer("payment")}
          />
          <ReviewCheck
            question="업무는 강도는 어떘나요?"
            options={["단순 업무", "보통이에요", "힘든 업무"]}
            onChange={setAnswer("work_intesity")}
          />
          <ReviewCheck
            question="업무는 명확했나요?"
            options={["불명확해요", "모르겠어요", "명확해요"]}
            onChange={setAnswer("work_clarity")}
          />
          <ReviewCheck
            question="휴게시간은 잘 지켜졌나요?"
            options={["안 지켜졌어요", "보통이에요", "잘 지켜졌어요"]}
            onChange={setAnswer("breaktime")}
          />
        </Checks>
      </Section>
      <Tap>
        <Button
          onClick={() => navigate("/homeseeker/review/tag")}
          type={"White"}
          text={"다음"}
        />
      </Tap>
    </ReviewContainer>
  );
}

const ReviewContainer = styled.div``;

const Section = styled.div`
  padding: 20px 40px;
  p {
    font-size: 25px;
  }
`;
const Checks = styled.div`
  margin-top: 16px;
  display: grid;
  gap: 20px;
`;

const Tap = styled.div`
  border-top: 1px solid #bbb;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
