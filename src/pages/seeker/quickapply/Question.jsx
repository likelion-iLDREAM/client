// pages/seeker/quickapply/Question.jsx
import styled from "styled-components";
import Header from "../../../components/common/Header";
import Employername from "../../../components/employer/Employername";
import EmployerTitle from "../../../components/employer/EmployTitle";
import Button from "../../../components/common/Button";
import Voice from "../../../components/seeker/quickapply/Voice";
import Choice from "../../../components/seeker/quickapply/Choice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";

/** ===== ENV ===== */
const serverUrl = import.meta.env.VITE_ILDREAM_URL;
const workerToken = import.meta.env.VITE_WORKER_TOKEN;

/** ===== 공통 fetch 헬퍼 ===== */
async function patchAnswer({ applicationId, body }) {
  const url = `${serverUrl}/applications/${applicationId}/answers`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      token: workerToken, // 서버가 token 헤더 사용
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

/** ===== 페이지 ===== */
export default function Question() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  // /homeseeker/quickapply/:applicationId (가정)
  const applicationId =
    params.applicationId || location.state?.applicationId || 1;
  console.log("params", params);
  console.log("params.applicationId", params.applicationId);
  console.log("location", location);

  console.log("location", location.state);
  console.log("location", location.state.applicationId);
  // 질문 목록은 이전 단계에서 넘겨주는 구조를 권장
  const questions = useMemo(() => {
    // 예시 폴백
    return Array.isArray(location.state?.questions)
      ? location.state.questions
      : [
          {
            id: 1,
            type: "TEXT",
            title: "요양보호사 경력이 있으시면 말씀해주세요.",
          },
          {
            id: 2,
            type: "CHOICE",
            title: "(준)고령자(50세 이상)을 만족하시나요?",
            options: [
              { id: 1, label: "네" },
              { id: 2, label: "아니요" },
            ],
            multiple: false,
          },
        ];
  }, [location.state]);

  const employerName = location.state?.employerName || "구인업체명";
  const postRegion = location.state?.region || "서울";
  const postTitle = location.state?.title || "일로오세요";

  const [idx, setIdx] = useState(0); // 현재 질문 인덱스
  const [isCareerIncluding, setIsCareerIncluding] = useState(true);

  // 제어 상태(현재 질문용)
  const [textAnswer, setTextAnswer] = useState(""); // TEXT 답변
  const [selectedIds, setSelectedIds] = useState([]); // CHOICE 답변 (id 배열)

  const q = questions[idx];

  const handleNext = useCallback(async () => {
    if (!q) return;

    const body =
      q.type === "TEXT"
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
      await patchAnswer({ applicationId, body });

      // 다음 질문으로 이동
      const hasNext = idx + 1 < questions.length;
      if (hasNext) {
        setIdx((n) => n + 1);
        // 다음 질문을 위해 상태 초기화
        setTextAnswer("");
        setSelectedIds([]);
      } else {
        // 마지막 질문이면 완료 페이지로
        navigate("/homeseeker/quickapply/done", { replace: true });
      }
    } catch (err) {
      alert(`답변 저장에 실패했습니다.\n${err?.message || err}`);
      console.error(err);
    }
  }, [
    q,
    idx,
    textAnswer,
    selectedIds,
    isCareerIncluding,
    applicationId,
    questions.length,
    navigate,
  ]);

  return (
    <QuickApplyEndContainer>
      <Header text={"간편 지원"} showBack />

      <Section>
        <Content>
          <Name>
            <Employername text={employerName} />
            <EmployerTitle region={postRegion} title={postTitle} />
          </Name>
          <p>간편 지원중이에요.</p>
        </Content>

        {/* 질문 제목은 여기서 공통으로 표시 */}
        <End>
          <p>{q?.title || ""}</p>
        </End>

        {/* 경력 포함 여부 (필요없으면 제거 가능) */}
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

      <Tap>
        <Button
          type={"White"}
          text={idx + 1 < questions.length ? "다음" : "제출"}
          onClick={handleNext}
        />
      </Tap>
    </QuickApplyEndContainer>
  );
}

/** ===== 스타일 ===== */
const QuickApplyEndContainer = styled.div``;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px 20px;
`;

const Content = styled.div`
  padding: 10px 10px;
  > p {
    font-size: 30px;
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

const End = styled.div`
  display: flex;
  justify-content: left;
  flex-direction: column;
  padding: 0 10px;

  p {
    font-size: 30px;
    font-weight: 700;
    margin: 0 0;
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

const Tap = styled.div`
  border-top: 1px solid #bbb;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
  gap: 10px 0;
`;

const QuestionBox = styled.div``;
