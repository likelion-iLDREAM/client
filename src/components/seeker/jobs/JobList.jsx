// JobList.jsx (drop-in)

import styled from "styled-components";
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import Alert from "../quickapply/Alert";
import { useNavigate } from "react-router-dom";

const serverUrl = import.meta.env.VITE_ILDREAM_URL;
const workerToken = import.meta.env.VITE_WORKER_TOKEN;

/** 서버 응답의 questionList.items → UI용으로 변환 */
function toUiQuestions(items = []) {
  const TYPE_MAP = { 서술형: "TEXT", "예/아니요": "CHOICE", 객관식: "CHOICE" };
  return (Array.isArray(items) ? items : []).map((q, i) => {
    const uiType = TYPE_MAP[q?.type] || "TEXT";
    const raw = Array.isArray(q?.options) ? q.options : [];
    const ensured =
      uiType === "CHOICE" && raw.length === 0 ? ["예", "아니요"] : raw;
    return {
      id: Number(q?.id ?? i + 1),
      type: uiType,
      title: q?.text ?? "",
      options:
        uiType === "CHOICE"
          ? ensured.map((label, idx) => ({ id: idx + 1, label }))
          : [],
      multiple: false,
    };
  });
}

export default function JobList({
  JobPostId,
  companyName = "구인업체명",
  workPlace,
  title = "[지역] 구인공고명",
  location = "주소 정보 없음",
  applyMethods = [], // ["간편지원","전화지원"]
  expiryDate,
  jobField,
  status,
}) {
  const navigate = useNavigate();
  const [callAlertOpen, setCallAlertOpen] = useState(false);

  const labels = Array.isArray(applyMethods) ? applyMethods : [];
  const canQuick = labels.includes("간편지원");
  const canPhone = labels.includes("전화지원");

  const addr = location || "주소 정보 없음";

  const handleQuickApply = async () => {
    try {
      // 1) 지원서 초안 생성
      const res = await fetch(`${serverUrl}/applications/${JobPostId}/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          token: workerToken,
        },
        body: JSON.stringify({
          applyMethod: "간편지원",
          isCareerIncluding: true,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json?.success === false) {
        throw new Error(json?.message || `HTTP_${res.status}`);
      }
      const applicationId =
        json?.data?.applicationId ?? json?.data?.id ?? json?.data;
      if (!applicationId) throw new Error("applicationId가 응답에 없습니다.");

      // 2) 공고 상세 조회 (질문/고용주/지역 확보)
      let detail = null;
      try {
        const r2 = await fetch(`${serverUrl}/jobPosts/${JobPostId}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            ...(workerToken ? { token: workerToken } : {}),
          },
        });
        const j2 = await r2.json().catch(() => ({}));
        if (r2.ok && j2?.success) detail = j2.data;
      } catch {
        // 상세 조회 실패 시에도 최소 정보로 진행
      }

      const employerName = detail?.employerName ?? companyName;
      const region =
        detail?.workPlace ||
        (detail?.location ? String(detail.location).split(" ")[0] : "") ||
        workPlace ||
        "";
      const titleToUse = detail?.title ?? title;
      const questionList = detail?.questionList ?? { items: [] };
      const questions = toUiQuestions(questionList.items);

      // 3) QuickApply로 이동 (JobsDetails와 동일한 payload)
      navigate(`/homeseeker/quickapply/${applicationId}`, {
        state: {
          applicationId,
          jobPostId: JobPostId,
          employerName,
          region,
          title: titleToUse,
          questionList, // 원본
          questions, // UI용
        },
      });
    } catch (e) {
      alert(`간편 지원을 시작할 수 없습니다.\n${e?.message || e}`);
    }
  };

  return (
    <RecommendContainer>
      <div>
        <Section12>
          <div className="Section1">
            <div className="Text1">{companyName}</div>
            <div className="Title">{`[${workPlace ?? ""}] ${title}`}</div>
            <div className="Address">{addr}</div>
          </div>
          <Arrow
            onClick={() => navigate(`/homeseeker/jobsdetail/${JobPostId}`)}
          />
        </Section12>

        <Section3>
          {expiryDate && <div className="Tag">~채용시마감</div>}
          {jobField && <div className="Tag">{jobField}</div>}
          {status && <div className="Tag">{status}</div>}
        </Section3>
      </div>

      <div>
        <div className="Tip"></div>
        <Apply>
          {canPhone && (
            <button className="Call" onClick={() => setCallAlertOpen(true)}>
              전화 지원
            </button>
          )}
          {canQuick && (
            <button className="Simple" onClick={handleQuickApply}>
              간편 지원
            </button>
          )}
        </Apply>
      </div>

      <Alert
        open={callAlertOpen}
        companyName={companyName}
        onConfirm={() => setCallAlertOpen(false)}
        onCancel={() => setCallAlertOpen(false)}
        onClose={() => setCallAlertOpen(false)}
      />
    </RecommendContainer>
  );
}

const Apply = styled.div`
  display: flex;
  padding: 10px;
  margin: 5px 0 5px 0;
  gap: 10px;

  > .Call {
    background-color: white;
    cursor: pointer;
    border: none;
    border-radius: 7px;
    border: 1px solid var(--Foundation-Green-Normal);
    padding: 10px 20px;
    text-wrap: nowrap;
    color: var(--Foundation-Green-Normal);
    display: flex;
    width: 140px;
    height: 45px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-weight: 700;
    font-size: 20px;
  }
  > .Simple {
    background-color: var(--Foundation-Green-Normal);
    cursor: pointer;
    border: none;
    border-radius: 7px;
    padding: 10px 20px;
    text-wrap: nowrap;
    color: white;
    display: flex;
    width: 140px;
    height: 45px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-weight: 700;
    font-size: 20px;
  }
`;

const Section3 = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 15px 10px 0 10px;
  margin-bottom: 5px;

  > .Tag {
    padding: 0 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 31px;
    background-color: #fff;
    border-radius: 8px;
    white-space: nowrap;
  }
`;

const Arrow = styled(IoIosArrowForward)`
  display: flex;
  align-items: flex-start;
  gap: 5px;
  align-self: stretch;
  width: 25px;
  height: 25px;
  margin-top: 10px;
  cursor: pointer;
`;

const Section12 = styled.div`
  display: flex;
  align-items: baseline;

  > .Section1 {
    display: flex;
    padding: 0 10px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    flex: 1 0 0;
    margin-top: 10px;
  }
  > .Section1 > .Text1 {
    font-size: 18px;
  }
  > .Section1 > .Title {
    font-weight: 700;
    font-size: 25px;
  }
  > .Section1 > .Address {
    font-size: 18px;
  }
`;

const RecommendContainer = styled.div`
  width: 330px;
  min-height: 228px;
  background-color: var(--Foundation-Green-Light, #eaf7f0);
  border-radius: 8px;
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .Tip {
    margin: 0;
    font-size: 15px;
  }
  .Tip p {
    margin: 2px 0;
  }
`;
