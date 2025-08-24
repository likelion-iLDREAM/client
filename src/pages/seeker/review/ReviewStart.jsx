import styled from "styled-components";
import Header from "../../../components/common/Header";
import ReviewCheck from "../../../components/seeker/ReviewCheck";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../../components/common/Button";

// ===== 사전 준비(API 형식에 맞춘 라벨/유틸) =====
const ANSWER_LABELS = {
  boss_kindness: "사장님 친절도",
  coworker_kindness: "동료 친절도",
  welfare: "복지 수준",
  rework_intent: "재근무 의사",
  pay_expansion: "급여일 준수",
  payment: "시급 수준",
  work_intesity: "업무 강도", // (오타 그대로 키 유지) intesity → intensity
  work_clarity: "업무 명확성",
  breaktime: "휴게시간 준수",
};

const toScore = (idx) => (typeof idx === "number" ? idx + 1 : 2); // 0~2 → 1~3

export default function ReviewStart() {
  const navigate = useNavigate();
  const location = useLocation();

  // employerId 확보(쿼리스트링 → 세션 유지)
  const employerId = useMemo(() => {
    const search = new URLSearchParams(location.search);
    const fromQS = search.get("employerId");
    const fromSession = sessionStorage.getItem("review.employerId");
    const id = Number(fromQS ?? fromSession ?? 0) || 0;
    sessionStorage.setItem("review.employerId", String(id));
    return id;
  }, [location.search]);

  const [answers, setAnswers] = useState({}); // { key: 0|1|2 }
  const setAnswer = (key) => (idx) =>
    setAnswers((prev) => ({ ...prev, [key]: idx }));

  // 다음 단계로 넘어갈 때: API 스펙에 맞춘 draft 저장
  const goNext = () => {
    // API 요청형식 answers (라벨: 1~3)
    const apiAnswers = Object.entries(answers).reduce((acc, [k, v]) => {
      const label = ANSWER_LABELS[k];
      if (label) acc[label] = toScore(v);
      return acc;
    }, {});

    const draft = {
      employerId,
      answers: apiAnswers,
      hashtags: [], // 다음 페이지에서 채움
    };

    // 전 단계/후 단계에서 공유
    sessionStorage.setItem("review.answers", JSON.stringify(apiAnswers));
    sessionStorage.setItem("review.draft", JSON.stringify(draft));

    navigate("/homeseeker/review/tag");
  };

  // 초기화(새 작성시 이전 임시값 제거 - 선택)
  useEffect(() => {
    sessionStorage.removeItem("review.hashtags");
    // answers는 이번 페이지에서 새로 작성
  }, []);

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
            question="업무 강도는 어땠나요?"
            options={["단순 업무", "보통이에요", "힘든 업무"]}
            onChange={setAnswer("work_intesity")}
          />
          <ReviewCheck
            question="업무는 명확했나요?"
            options={["불명확해요", "보통이에요", "명확해요"]}
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
        <Button onClick={goNext} type={"White"} text={"다음"} />
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
