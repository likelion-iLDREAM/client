import styled from "styled-components";
import Header from "../../../components/common/Header";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";
import { useEffect, useMemo, useState } from "react";

// ===== 해시태그 매핑(UI → API 라벨, API → ENUM) =====
const UI_TO_API_HASHTAG = {
  "승진기회가 열려있어요": "승진 기회",
  유연근무: "유연 근무",
  교대근무: "교대 근무",
  "텃세가 심해요": "텃세",
  교육제공: "교육 제공",
  "근무환경이 쾌적해요": "근무환경 쾌적",
  엄격해요: "엄격",
  "위생이 안좋아요": "위생 불량",
};

const API_TAG_TO_ENUM = {
  "승진 기회": "PROMOTION_OPPORTUNITY",
  "유연 근무": "FLEXIBLE_WORK",
  "교대 근무": "SHIFT_WORK",
  텃세: "HARSH_SENIORITY",
  "교육 제공": "TRAINING_PROVIDED",
  "근무환경 쾌적": "COMFORTABLE_ENVIRONMENT",
  엄격: "STRICT_CULTURE",
  "위생 불량": "POOR_HYGIENE",
};

// 답변 라벨 → ENUM 매핑(모의 응답 생성용)
const ANSWER_LABEL_TO_ENUM = {
  "사장님 친절도": "BOSS_KINDNESS",
  "동료 친절도": "COWORKER_KINDNESS",
  "업무 강도": "WORK_INTENSITY",
  "업무 명확성": "WORK_CLARITY",
  "급여일 준수": "PAY_PUNCTUALITY",
  "시급 수준": "WAGE_LEVEL",
  "휴게시간 준수": "BREAK_COMPLIANCE",
  "복지 수준": "WELFARE_LEVEL",
  "재근무 의사": "REWORK_INTENT",
};

export default function ReviewTag() {
  const navigate = useNavigate();
  const TAGS = useMemo(
    () => [
      "승진기회가 열려있어요",
      "유연근무",
      "교대근무",
      "텃세가 심해요",
      "교육제공",
      "근무환경이 쾌적해요",
      "엄격해요",
      "위생이 안좋아요",
    ],
    []
  );

  const [selected, setSelected] = useState([]);

  const toggleTag = (label) =>
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((t) => t !== label) : [...prev, label]
    );

  // 이전 단계에서 저장한 draft 로드
  const draft = useMemo(() => {
    try {
      return JSON.parse(sessionStorage.getItem("review.draft") || "{}");
    } catch {
      return {};
    }
  }, []);

  const employerId = Number(
    sessionStorage.getItem("review.employerId") || draft?.employerId || 0
  );

  // 작성하기 → API 형식의 Request/Headers 구성만 저장(전송 X) + 모의 Response 생성
  const submitMock = () => {
    const apiHashtags = selected
      .map((ui) => UI_TO_API_HASHTAG[ui])
      .filter(Boolean);

    const requestBody = {
      employerId,
      answers: draft?.answers || {},
      hashtags: apiHashtags,
    };

    const headers = {
      // 실제 API 스펙: token 헤더 사용
      token:
        localStorage.getItem("ildream_access_token") ||
        localStorage.getItem("ildream_worker_access_token") ||
        import.meta.env.VITE_WORKER_TOKEN ||
        "",
      "Content-Type": "application/json",
    };

    // 세션에 저장(후에 실제 fetch 시 그대로 활용 가능)
    sessionStorage.setItem("review.hashtags", JSON.stringify(apiHashtags));
    sessionStorage.setItem("review.request", JSON.stringify(requestBody));
    sessionStorage.setItem("review.requestHeaders", JSON.stringify(headers));

    // === 모의 응답(JSON) 생성 ===
    // answers 라벨 → ENUM 키로 치환
    const enumAnswers = Object.entries(draft?.answers || {}).reduce(
      (acc, [label, score]) => {
        const key = ANSWER_LABEL_TO_ENUM[label] || label;
        acc[key] = score;
        return acc;
      },
      {}
    );
    const enumTags = apiHashtags.map((t) => API_TAG_TO_ENUM[t] || t);

    const mockResponse = {
      success: true,
      code: 201,
      message: "리뷰 작성 성공(모의)",
      data: {
        reviewId: Math.floor(Math.random() * 1000000), // 임의 값
        employerId,
        workerId: 0, // 실제 연결 시 서버에서 채움
        answers: enumAnswers,
        hashtags: enumTags,
      },
    };
    sessionStorage.setItem("review.mockResponse", JSON.stringify(mockResponse));

    navigate("/homeseeker/profile");
  };

  // (선택) 페이지 진입 시 이전 선택 불러오기 초기화
  useEffect(() => {
    const saved = (() => {
      try {
        return JSON.parse(sessionStorage.getItem("review.hashtags") || "[]");
      } catch {
        return [];
      }
    })();
    if (saved.length) {
      // saved는 API 라벨이라 UI 라벨로 역매핑 시도
      const apiToUi = Object.entries(UI_TO_API_HASHTAG).reduce(
        (acc, [ui, api]) => {
          acc[api] = ui;
          return acc;
        },
        {}
      );
      const restored = saved.map((api) => apiToUi[api]).filter(Boolean);
      setSelected(restored);
    }
  }, []);

  return (
    <ReviewContainer>
      <Header text={"고용주 후기 작성"} showBack />
      <Section>
        <p>
          해당되는 특징이 있다면
          <br />
          선택해주세요!
        </p>
      </Section>
      <TagGrid>
        {TAGS.map((label) => (
          <Tag
            key={label}
            type="button"
            onClick={() => toggleTag(label)}
            $active={selected.includes(label)}
          >
            {label}
          </Tag>
        ))}
      </TagGrid>
      <Tap>
        <Button onClick={submitMock} text={"작성하기"} />
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

const Tap = styled.div`
  border-top: 1px solid #bbb;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TagGrid = styled.div`
  padding: 0 32px;
  margin: 12px 0 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px 10px;
`;

const Tag = styled.button`
  background-color: #fff;
  border-radius: 7px;
  border: 1px solid var(--Foundation-Green-Darker, #0f3d24);
  padding: 10px 12px;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  ${(p) =>
    p.$active
      ? `
    background: var(--Foundation-Green-Light, #eaf7f0);
    border-color: var(--Foundation-Green-Normal, #2baf66);
    color: #0f3d24;
  `
      : ""}
`;
