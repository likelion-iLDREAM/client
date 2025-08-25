// pages/seeker/jobs/JobsDetails.jsx
import styled from "styled-components";
import Header from "../../../components/common/Header";
import Employername from "../../../components/employer/Employername";
import EmployerTitle from "../../../components/employer/EmployTitle";
import ButtonSmall from "../../../components/common/ButtonSmall";
import { IoShareSocial } from "react-icons/io5";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../../../components/seeker/quickapply/Alert";

const workerToken = import.meta.env.VITE_WORKER_TOKEN;
const serverUrl = import.meta.env.VITE_ILDREAM_URL;

/** 서버 응답의 questionList.items → UI용으로 변환 */
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
      type: uiType, // "TEXT" | "CHOICE"
      title: q?.text ?? "",
      options:
        uiType === "CHOICE"
          ? ensured.map((label, idx) => ({ id: idx + 1, label }))
          : [],
      multiple: false,
    };
  });
}

function fmtMoney(n) {
  if (typeof n !== "number") return "-";
  try {
    return n.toLocaleString("ko-KR") + "원";
  } catch {
    return `${n}원`;
  }
}
function fmtTime(hms) {
  // "09:30:00" -> "09:30"
  if (!hms) return "-";
  const [hh, mm] = String(hms).split(":");
  return hh && mm ? `${hh}:${mm}` : hms;
}

export default function JobsDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [callAlertOpen, setCallAlertOpen] = useState(false);

  // 데이터 로드
  useEffect(() => {
    if (!serverUrl || !id) {
      setErr("잘못된 접근입니다.");
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const res = await fetch(`${serverUrl}/jobPosts/${id}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            ...(workerToken ? { token: workerToken } : {}),
          },
          mode: "cors",
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || json?.success === false) {
          throw new Error(json?.message || `HTTP_${res.status}`);
        }
        setJob(json?.data ?? null);
        setErr("");
      } catch (e) {
        setErr(e?.message || String(e));
        setJob(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // UI 표시용 파생값들
  const companyName = job?.employerName || "구인업체명";
  const title = job?.title || "공고 제목";
  const region = useMemo(() => {
    // location에서 대략 첫 토큰을 지역으로 사용 (없으면 "서울")
    const loc = job?.location || "";
    return (loc.split(" ")[0] || "서울").replace(/,$/, "");
  }, [job?.location]);
  const questions = useMemo(
    () => toUiQuestions(job?.questionList?.items),
    [job?.questionList?.items]
  );

  const paymentTitle = job?.paymentType || "급여";
  const paymentValue = fmtMoney(job?.payment);
  const workTime = `${fmtTime(job?.workStartTime)} ~ ${fmtTime(
    job?.workEndTime
  )}`.trim();
  const workDays =
    Array.isArray(job?.workDays) && job.workDays.length
      ? job.workDays.join(", ")
      : "-";

  // ▼ 간편지원: application 생성 → QuickApply로 이동(state 전달)
  const handleQuickApply = async () => {
    try {
      if (!job?.jobPostId) throw new Error("jobPostId를 확인할 수 없습니다.");

      const res = await fetch(
        `${serverUrl}/applications/${job.jobPostId}/apply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            token: workerToken, // ✅ JWT (명세: token 헤더)
          },
          body: JSON.stringify({
            applyMethod: "간편지원",
            isCareerIncluding: true,
          }),
        }
      );

      const json = await res.json().catch(() => ({}));
      if (!res.ok || json?.success === false) {
        throw new Error(json?.message || `HTTP_${res.status}`);
      }

      const applicationId =
        json?.data?.applicationId ?? json?.data?.id ?? json?.data;
      if (!applicationId) throw new Error("applicationId가 응답에 없습니다.");

      // ✅ QuickApply로 이동 + 필요한 모든 정보 state로 전달
      navigate(`/homeseeker/quickapply/${applicationId}`, {
        state: {
          applicationId,
          jobPostId: job.jobPostId,
          employerName: companyName,
          region: job.workPlace || region, // workPlace가 있으면 우선, 없으면 region(가공값)
          title,
          // 원본/가공 둘 다 넘겨주면 이후 화면에서 탄력적으로 사용 가능
          questionList: job?.questionList ?? { items: [] }, // 원본
          questions, // 가공(VOICE/CHOICE용)
        },
      });
    } catch (e) {
      alert(`간편 지원을 시작할 수 없습니다.\n${e?.message || e}`);
    }
  };

  if (loading) {
    return (
      <JobsContainer>
        <Headersection>
          <Header text={"공고 정보"} showBack />
        </Headersection>
        <Content style={{ padding: 20 }}>불러오는 중…</Content>
      </JobsContainer>
    );
  }
  if (err) {
    return (
      <JobsContainer>
        <Headersection>
          <Header text={"공고 정보"} showBack />
        </Headersection>
        <Content style={{ padding: 20, color: "crimson" }}>
          공고를 불러오지 못했어요. {err}
        </Content>
      </JobsContainer>
    );
  }
  if (!job) {
    return (
      <JobsContainer>
        <Headersection>
          <Header text={"공고 정보"} showBack />
        </Headersection>
        <Content style={{ padding: 20 }}>공고가 없습니다.</Content>
      </JobsContainer>
    );
  }

  return (
    <JobsContainer>
      <Headersection>
        <Header text={"공고 정보"} showBack />
        <ShareButton type="button" aria-label="공유하기">
          <IoShareSocial />
        </ShareButton>
      </Headersection>

      <Content>
        <Name>
          <Employername text={companyName} />
          <EmployerTitle region={region} title={title} />
        </Name>
      </Content>

      <Divider />

      <Section>
        <SectionTitle>{paymentTitle}</SectionTitle>
        <InfoList>
          <InfoRow>{paymentValue}</InfoRow>
        </InfoList>
      </Section>

      <Divider />

      <Section>
        <SectionTitle>근무 예정지</SectionTitle>
        <InfoList>
          <InfoRow>{job.location || "-"}</InfoRow>
        </InfoList>
      </Section>

      <Divider />

      <Section>
        <SectionTitle>모집 내용</SectionTitle>
        <InfoList>
          <InfoRow2 label="근무시간">
            {workDays !== "-" ? `${workDays}\n` : ""}
            {workTime}
          </InfoRow2>
          <InfoRow2 label="경력조건">
            {job.careerRequirement ? "경력 요구" : "경력 무관"}
          </InfoRow2>
          <InfoRow2 label="학력">{job.educationRequirement || "무관"}</InfoRow2>
          <InfoRow2 label="고용형태">{job.employmentType || "-"}</InfoRow2>
        </InfoList>
      </Section>

      <Divider />

      <Section>
        <SectionTitle>직무 내용</SectionTitle>
        <InfoList>
          <InfoRow>{job.content || "-"}</InfoRow>
        </InfoList>
      </Section>

      <Divider />

      <Section>
        <SectionTitle>제출 마감일</SectionTitle>
        <InfoList>
          <InfoRow>
            {job.expiryDate ? `~ ${job.expiryDate}` : "~ 채용시까지"}
          </InfoRow>
        </InfoList>
      </Section>

      <Divider />

      <Section>
        <SectionTitle>채용담당자 정보</SectionTitle>
        <InfoList>
          <InfoRow>{companyName}</InfoRow>
          <InfoRow>{job.employerPhone || "-"}</InfoRow>
        </InfoList>
      </Section>

      <Tap>
        <ButtonSmall
          type={"White"}
          text={"전화 지원"}
          onClick={() => setCallAlertOpen(true)}
        />
        <ButtonSmall text={"간편 지원"} onClick={handleQuickApply} />
      </Tap>

      <Alert
        open={callAlertOpen}
        companyName={companyName}
        onConfirm={() => setCallAlertOpen(false)}
        onCancel={() => setCallAlertOpen(false)}
        onClose={() => setCallAlertOpen(false)}
      />
    </JobsContainer>
  );
}

/** ===== 프리젠테이션 컴포넌트 ===== */
function InfoRow2({ children, label }) {
  return (
    <Row>
      <Label>{label}</Label>
      <Value>{children || "-"}</Value>
    </Row>
  );
}
function InfoRow({ children }) {
  return <Value>{children || "-"}</Value>;
}

const JobsContainer = styled.div``;

const Headersection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--Foundation-Black-black-5, #d9d9d9);
`;
const ShareButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  background: transparent;
  border: 0;
  padding: 10px;
  cursor: pointer;
  svg {
    width: 32px;
    height: 32px;
  }
`;

const Content = styled.div`
  padding: 10px 20px;
`;
const Name = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 5px;
`;

const Divider = styled.hr`
  border: 0;
  border-top: 1px solid var(--Foundation-Black-black-5, #d9d9d9);
  margin: 0;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px 20px;
`;
const SectionTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
`;
const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: start;
`;
const Label = styled.span`
  font-size: 18px;
  font-weight: 700;
  white-space: nowrap;
`;
const Value = styled.span`
  font-size: 18px;
  overflow-wrap: anywhere;
  word-break: break-word;
  white-space: pre-line;
`;

const Tap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 10px 20px;
  border-top: 1px solid var(--Foundation-Black-black-5, #d9d9d9);
`;
