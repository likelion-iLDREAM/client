// pages/seeker/quickapply/Question.jsx
import styled from "styled-components";
import Header from "../../../components/common/Header";
import Employername from "../../../components/employer/Employername";
import EmployerTitle from "../../../components/employer/EmployTitle";
import Button from "../../../components/common/Button";
import Voice from "../../../components/seeker/quickapply/Voice";
import Choice from "../../../components/seeker/quickapply/Choice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";

/** ===== ENV ===== */
const serverUrl = import.meta.env.VITE_ILDREAM_URL;
const workerToken = import.meta.env.VITE_WORKER_TOKEN;

/** ===== API helpers ===== */
async function patchAnswer({ applicationId, body }) {
  const url = `${serverUrl}/applications/${applicationId}/answers`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      token: workerToken,
    },
    body: JSON.stringify(body),
    mode: "cors",
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json?.success === false) {
    throw new Error(json?.message || `HTTP_${res.status}`);
  }
  return json;
}

async function submitApplication(applicationId) {
  const url = `${serverUrl}/applications/${applicationId}/submit`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      token: workerToken,
    },
    mode: "cors",
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json?.success === false) {
    throw new Error(json?.message || `HTTP_${res.status}`);
  }
  return json;
}

/** ===== 페이지 ===== */
export default function Question() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  // applicationId 확보(라우트 파라미터 → state)
  const applicationId =
    params.applicationId || location.state?.applicationId || null;

  // 질문 목록(QuickApply/JobsDetails에서 state로 전달된 포맷 사용)
  const questions = useMemo(() => {
    const fromState = Array.isArray(location.state?.questions)
      ? location.state.questions
      : [];
    return fromState.map((q, i) => {
      const isChoice = q.type === "CHOICE";
      const opts = Array.isArray(q.options) ? q.options : [];
      const normalized =
        isChoice && typeof opts[0] === "string"
          ? opts.map((label, idx) => ({ id: idx + 1, label }))
          : opts;
      return {
        id: Number(q.id ?? i + 1),
        type: q.type === "CHOICE" ? "CHOICE" : "TEXT",
        title: q.title ?? q.text ?? "",
        options: isChoice ? normalized : [],
        multiple: !!q.multiple,
      };
    });
  }, [location.state]);

  const employerName = location.state?.employerName || "구인업체명";
  const postRegion = location.state?.region || "서울";
  const postTitle = location.state?.title || "공고 제목";

  // 진행/답변 상태
  const [idx, setIdx] = useState(0); // 현재 질문 인덱스
  const [isCareerIncluding, setIsCareerIncluding] = useState(true);

  // 질문별 임시 저장된 답변(로컬). { [questionId]: { text, optionIds:number[] } }
  const [answers, setAnswers] = useState({});

  // 현재 질문용 제어 상태
  const q = questions[idx];
  const [textAnswer, setTextAnswer] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  // 인덱스 변경 시 입력값 복원
  useEffect(() => {
    if (!q) return;
    const saved = answers[q.id];
    if (saved) {
      setTextAnswer(saved.text ?? "");
      setSelectedIds(Array.isArray(saved.optionIds) ? saved.optionIds : []);
    } else {
      setTextAnswer("");
      setSelectedIds([]);
    }
  }, [idx, q, answers]);

  const total = questions.length;
  const isLast = idx === total - 1;

  const handlePrev = useCallback(() => {
    setIdx((n) => Math.max(0, n - 1));
  }, []);

  const handleNext = useCallback(async () => {
    if (!q || !applicationId) return;

    // 현재 질문 답변 구성
    const isText = q.type === "TEXT";
    const body = isText
      ? {
          isCareerIncluding,
          answer: {
            questionId: q.id,
            text: textAnswer || "",
            optionIds: null,
          },
        }
      : {
          isCareerIncluding,
          answer: {
            questionId: q.id,
            text: null,
            optionIds: (selectedIds || []).join(","), // "1,3"
          },
        };

    try {
      // 서버 임시 저장(덮어쓰기)
      await patchAnswer({ applicationId, body });

      // 로컬에도 반영(수정 반영)
      setAnswers((prev) => ({
        ...prev,
        [q.id]: {
          text: isText ? textAnswer || "" : "",
          optionIds: isText ? [] : selectedIds || [],
        },
      }));

      if (isLast) {
        // ✅ 마지막 질문이면 제출
        await submitApplication(applicationId);
        // 완료 페이지로 이동(뷰 헤더용 상태 전달)
        navigate("/homeseeker/quickapply/end", {
          replace: true,
          state: { employerName, region: postRegion, title: postTitle },
        });
      } else {
        // 다음 질문
        setIdx((n) => n + 1);
      }
    } catch (err) {
      alert(`답변 저장 또는 제출에 실패했습니다.\n${err?.message || err}`);
      console.error(err);
    }
  }, [
    q,
    isLast,
    textAnswer,
    selectedIds,
    isCareerIncluding,
    applicationId,
    employerName,
    postRegion,
    postTitle,
    navigate,
  ]);

  // 방어 렌더링
  if (!applicationId) {
    return (
      <div style={{ padding: 20 }}>
        <p>지원서를 찾을 수 없습니다. 처음부터 다시 시도해주세요.</p>
        <button onClick={() => navigate(-1)}>뒤로가기</button>
      </div>
    );
  }
  if (!questions.length) {
    return (
      <div style={{ padding: 20 }}>
        <p>표시할 질문이 없습니다.</p>
        <button onClick={() => navigate(-1)}>뒤로가기</button>
      </div>
    );
  }

  return (
    <QuickApplyContainer>
      <Header text={"간편 지원"} showBack />

      <Section>
        <Content>
          <Name>
            <Employername text={employerName} />
            <EmployerTitle region={postRegion} title={postTitle} />
          </Name>
          <p style={{ marginTop: 6, fontSize: 16 }}>
            질문 {idx + 1} / {total}
          </p>
        </Content>

        {/* 질문 제목 */}
        <QuestionTitle>
          <p>{q?.title || ""}</p>
        </QuestionTitle>

        {/* 경력 포함 여부 */}
        <CareerRow>
          <label>
            <input
              type="checkbox"
              checked={isCareerIncluding}
              onChange={(e) => setIsCareerIncluding(e.target.checked)}
            />
            경력 포함해서 지원하기
          </label>
        </CareerRow>

        {/* 질문 입력 */}
        <QuestionBox>
          {q?.type === "TEXT" && (
            <Voice
              value={textAnswer}
              onChange={setTextAnswer}
              placeholder="이곳에 질문에 대한 답변을 남겨주세요."
            />
          )}
          {q?.type === "CHOICE" && (
            <Choice
              options={q.options || []}
              multiple={!!q.multiple}
              selectedIds={selectedIds}
              onChange={setSelectedIds}
            />
          )}
        </QuestionBox>
      </Section>

      <Footer>
        <Button
          type="White"
          text="이전"
          onClick={handlePrev}
          disabled={idx === 0}
        />
        <Button
          type="White"
          text={isLast ? "제출" : "다음"}
          onClick={handleNext}
        />
      </Footer>
    </QuickApplyContainer>
  );
}

/** ===== 스타일 ===== */
const QuickApplyContainer = styled.div``;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 10px 20px;
`;

const Content = styled.div`
  padding: 10px 10px 0;
  > p {
    margin: 0;
  }
`;

const Name = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 5px;
  p {
    margin: 0;
    font-weight: 400;
  }
`;

const QuestionTitle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  p {
    font-size: 26px;
    font-weight: 700;
    margin: 0;
    overflow-wrap: anywhere;
    word-break: break-word;
    white-space: pre-line;
  }
`;

const CareerRow = styled.div`
  padding: 0 10px;
  font-size: 16px;
  > label {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const QuestionBox = styled.div``;

const Footer = styled.div`
  border-top: 1px solid #bbb;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  align-items: center;
  padding: 10px 20px;

  Button {
    width: 100%;
  }
`;
