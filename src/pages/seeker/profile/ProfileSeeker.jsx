import styled from "styled-components";
import Header from "../../../components/common/Header";
import ButtonSmall from "../../../components/common/ButtonSmall";
import { Icons } from "../../../components/icons/index";
import { IoPersonCircleOutline } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import TapBarSeeker from "../../../components/common/TapBarSeeker";
import { useEffect, useState } from "react";

/* =========================
 * ENV (서버/토큰)
 * ========================= */
const workerToken = import.meta.env.VITE_WORKER_TOKEN;
const serverUrl = import.meta.env.VITE_ILDREAM_URL;

const JOB_OPTIONS = [
  { api: "농사,원예,어업", label: "🌱농사·원예·어업" },
  { api: "운전,배달", label: "🚚운전·배달" },
  { api: "식품,옷,환경가공", label: "🥬식품·옷·환경 가공" },
  { api: "사무,금융", label: "📄사무·금융" },
  { api: "판매", label: "🛒판매" },
  { api: "돌봄", label: "❤️돌봄" },
  { api: "청소,미화", label: "🧹청소·미화" },
  { api: "음식,서비스", label: "🍲음식·서비스" },
  { api: "목공,공예,제조", label: "🪚목공·공예·제조" },
  { api: "문화,연구,기술", label: "🎨문화·연구·기술" },
  { api: "건설,시설관리", label: "🏗️건설·시설 관리" },
  { api: "전기,전자수리", label: "🔌전기·전자 수리" },
  { api: "기계,금속제작,수리", label: "⚙️기계·금속 제작·수리" },
];

const apiToLabel = Object.fromEntries(JOB_OPTIONS.map((o) => [o.api, o.label]));

/* =========================
 * 공통 Fetch 헬퍼 (콘솔 로깅 포함)
 * ========================= */
async function fetchWithLog(url, options = {}) {
  console.log("[FETCH] →", url, options);
  const res = await fetch(url, options);
  const raw = await res
    .clone()
    .text()
    .catch(() => "");
  console.log("[FETCH RAW] ←", res.status, res.url, raw);
  let json = {};
  try {
    json = JSON.parse(raw);
  } catch {
    // not json
  }
  console.log("[FETCH JSON] ←", res.status, res.url, json);
  if (!res.ok) {
    const msg = json?.message || `HTTP_${res.status}`;
    throw new Error(msg);
  }
  return json;
}

/* =========================
 * 안전 파서 + Mock 어댑터 (API 실패시 폴백)
 * ========================= */
const safeParse = (key, fallback) => {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return fallback;
    const v = JSON.parse(raw);
    return v ?? fallback;
  } catch {
    return fallback;
  }
};

// 지원서 목록 불러오기 (Mock)
function loadResumesFromStorage() {
  return safeParse("resume.list", []);
}

// 진행 중인 근로(계약) 목록 불러오기 (Mock)
function loadWorkingFromStorage() {
  return safeParse("working.list", []);
}

// 상단 배지 카운트
function countResumesForBadge(resumes) {
  return Array.isArray(resumes) ? resumes.length : 0;
}

// 상태별 분리
function partitionResumes(resumes = []) {
  const drafts = [];
  const progress = []; // 제출 이후 결과 대기
  const results = []; // 결과 확인 단계

  for (const r of resumes) {
    switch (r.status) {
      case "draft":
        drafts.push(r);
        break;
      case "submitted":
      case "in_review":
      case "interview":
        progress.push(r);
        break;
      case "rejected":
        results.push(r);
        break;
      default:
        break;
    }
  }
  return { drafts, progress, results };
}

// 초안 제거(“지원 포기하기”용, Mock only)
function deleteDraftsInStorage() {
  const list = loadResumesFromStorage();
  const filtered = list.filter((x) => x.status !== "draft");
  sessionStorage.setItem("resume.list", JSON.stringify(filtered));
  return filtered;
}

/* =========================
 * API 어댑터
 * ========================= */
// /workers/me → 상단 사용자 정보/태그용
async function fetchMeFromApi() {
  if (!serverUrl || !workerToken) throw new Error("ENV not ready");
  const json = await fetchWithLog(`${serverUrl}/workers/me`, {
    method: "GET",
    headers: { token: `${workerToken}` },
    mode: "cors",
  });

  // 예상 응답 형태:
  // { success, data: { name, jobInterest: ["농사,원예,어업", ...] } }
  const me = json?.data || {};
  const name = (me.name || "").trim();

  const jobInterest = Array.isArray(me.jobInterest) ? me.jobInterest : []; // UI 태그는 이모지 없는 텍스트 사용
  const tags = jobInterest.map(
    (api) => apiToLabel[api] || api.replace(/,/g, "·")
  );
  // 세션에도 반영(다른 화면 일관성)
  sessionStorage.setItem("signup.name", name);
  sessionStorage.setItem("signup.interests", JSON.stringify(tags));
  sessionStorage.setItem("signup.interestsApi", JSON.stringify(jobInterest));

  return { name, tags, raw: json };
}

// /workers/me/applications → 지원서 목록
async function fetchResumesFromApi() {
  if (!serverUrl || !workerToken) throw new Error("ENV not ready");
  const url = `${serverUrl}/workers/me/applications`;
  const json = await fetchWithLog(url, {
    method: "GET",
    headers: { token: `${workerToken}` },
    mode: "cors",
  });

  // 응답 적응형 매핑
  const list = Array.isArray(json?.data)
    ? json.data
    : Array.isArray(json?.data?.items)
    ? json.data.items
    : [];

  const mapped = list.map((r, i) => {
    const company =
      r.company?.name ||
      r.companyName ||
      r.employerName ||
      r.company ||
      "구인업체명";

    const title =
      r.title ||
      r.postTitle ||
      r.jobTitle ||
      r.titleText ||
      r.post?.title ||
      "[지역] 구인공고명";

    const addr =
      r.addr ||
      r.address ||
      r.location?.address ||
      r.location?.addr ||
      r.locationText ||
      "주소 정보 없음";

    const status =
      (r.status && String(r.status).toLowerCase()) ||
      (r.applicationStatus && String(r.applicationStatus).toLowerCase()) ||
      "submitted"; // 기본값

    return {
      id: r.id ?? i + 1,
      company,
      title,
      addr,
      status, // "draft" | "submitted" | "in_review" | "interview" | "rejected"
    };
  });

  console.log("[applications mapped]", mapped);
  return mapped;
}

// /workers/me/works → 진행중 근로 목록 (없으면 /contracts 시도)
async function fetchWorksFromApi() {
  if (!serverUrl || !workerToken) throw new Error("ENV not ready");

  // 1차 시도
  try {
    const json = await fetchWithLog(`${serverUrl}/workers/me/works`, {
      method: "GET",
      headers: { token: `${workerToken}` },
      mode: "cors",
    });

    const list = Array.isArray(json?.data)
      ? json.data
      : Array.isArray(json?.data?.items)
      ? json.data.items
      : [];

    const mapped = list.map((w, i) => {
      const company =
        w.company?.name ||
        w.companyName ||
        w.employerName ||
        w.company ||
        "구인업체명";

      const title =
        w.title ||
        w.jobTitle ||
        w.postTitle ||
        w.post?.title ||
        "[지역] 구인공고명";

      const addr =
        w.addr ||
        w.address ||
        w.location?.address ||
        w.location?.addr ||
        "주소 정보 없음";

      return {
        id: w.id ?? i + 1,
        company,
        title,
        addr,
      };
    });

    console.log("[works mapped]", mapped);
    return mapped;
  } catch (e) {
    console.warn("[/workers/me/works 실패, /contracts로 폴백]");
  }

  // 2차 폴백
  const json2 = await fetchWithLog(`${serverUrl}/workers/me/contracts`, {
    method: "GET",
    headers: { token: `${workerToken}` },
    mode: "cors",
  });

  const list2 = Array.isArray(json2?.data)
    ? json2.data
    : Array.isArray(json2?.data?.items)
    ? json2.data.items
    : [];

  const mapped2 = list2.map((w, i) => {
    const company =
      w.company?.name ||
      w.companyName ||
      w.employerName ||
      w.company ||
      "구인업체명";
    const title =
      w.title ||
      w.jobTitle ||
      w.postTitle ||
      w.post?.title ||
      "[지역] 구인공고명";
    const addr =
      w.addr ||
      w.address ||
      w.location?.address ||
      w.location?.addr ||
      "주소 정보 없음";
    return { id: w.id ?? i + 1, company, title, addr };
  });

  console.log("[contracts mapped]", mapped2);
  return mapped2;
}

/* =========================
 * 컴포넌트
 * ========================= */
export default function ProfileSeeker() {
  const navigate = useNavigate();

  // 상단 사용자/태그/카운트
  const [name, setName] = useState(() =>
    (sessionStorage.getItem("signup.name") || "").trim()
  );
  const [tags, setTags] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("signup.interests") || "[]");
    } catch {
      return [];
    }
  });
  const [resumeCount, setResumeCount] = useState(0);

  // 리스트 상태
  const [hasDraft, setHasDraft] = useState(false);
  const [appliedProgressList, setAppliedProgressList] = useState([]);
  const [appliedResultList, setAppliedResultList] = useState([]);
  const [workingList, setWorkingList] = useState([]);

  // 스토리지 → 화면 동기화
  const syncFromStorage = () => {
    setName((sessionStorage.getItem("signup.name") || "").trim());
    try {
      const nextTags = JSON.parse(
        sessionStorage.getItem("signup.interests") || "[]"
      );
      setTags(Array.isArray(nextTags) ? nextTags : []);
    } catch {
      setTags([]);
    }

    const resumes = loadResumesFromStorage();
    const works = loadWorkingFromStorage();
    const { drafts, progress, results } = partitionResumes(resumes);

    setHasDraft(drafts.length > 0);
    setAppliedProgressList(progress);
    setAppliedResultList(results);
    setWorkingList(works);
    setResumeCount(countResumesForBadge(resumes));
  };

  // API → 화면 동기화
  const syncFromApi = async () => {
    try {
      // 사용자/태그
      const me = await fetchMeFromApi();
      console.log("[/workers/me OK]", me.raw);
      setName(me.name);
      setTags(me.tags);

      // 지원서 목록
      const resumes = await fetchResumesFromApi();
      // 콘솔 테이블 출력(가독성)
      console.table(resumes);
      const { drafts, progress, results } = partitionResumes(resumes);
      setHasDraft(drafts.length > 0);
      setAppliedProgressList(progress);
      setAppliedResultList(results);
      setResumeCount(countResumesForBadge(resumes));

      // 진행중 근로
      const works = await fetchWorksFromApi();
      console.table(works);
      setWorkingList(works);
    } catch (err) {
      console.error("[API 동기화 실패 → Mock로 표시]", err);
      // 실패 시 Mock로 유지
    }
  };

  useEffect(() => {
    // 1) 먼저 로컬 표시
    syncFromStorage();
    // 2) 그 다음 서버 동기화(성공 시 화면 업데이트 + 콘솔 출력)
    syncFromApi();

    // 포커스/스토리지 변경 시에도 로컬 동기화
    const onFocus = () => syncFromStorage();
    const onStorage = () => syncFromStorage();
    window.addEventListener("focus", onFocus);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  // 초안 포기 (Mock 데이터 기준)
  const handleDiscardDraft = () => {
    if (!hasDraft) return;
    if (!confirm("작성 중인 지원서를 모두 삭제할까요?")) return;
    const next = deleteDraftsInStorage();
    const { progress, results } = partitionResumes(next);
    setHasDraft(false);
    setAppliedProgressList(progress);
    setAppliedResultList(results);
    setResumeCount(countResumesForBadge(next));
  };

  // 초안 이어서 작성
  const handleContinueDraft = () => {
    navigate("/homeseeker/resume");
  };

  return (
    <ProfileContainer>
      <Header text={"내 정보"} />
      <Section>
        <TopCard>
          <Avatar>
            <IoPersonCircleOutline size={83} />
          </Avatar>
          <TopRight>
            <Name>{name || "고객님"}</Name>
            <TagRow>
              {tags.slice(0, 3).map((t, i) => (
                <Tag key={i}>{t}</Tag>
              ))}
            </TagRow>
            <EditRow>
              <SmallButton onClick={() => navigate("./edit")}>
                <Icons.UserEdit />내 정보 수정
              </SmallButton>
            </EditRow>
          </TopRight>
        </TopCard>

        {/* 작성 중 지원서 알림 */}
        {hasDraft && (
          <DraftCard>
            <DraftBody>
              <DraftText>
                <DraftIcon>
                  <AiOutlineEdit size={50} />
                </DraftIcon>
                현재 작성하던 지원서가 있어요!
                <br />
                계속 진행하시겠어요?
              </DraftText>
              <TwoCols>
                <ButtonSmall
                  type="White"
                  text={"지원 포기하기"}
                  onClick={handleDiscardDraft}
                />
                <ButtonSmall
                  text={"지원 계속하기"}
                  onClick={handleContinueDraft}
                />
              </TwoCols>
            </DraftBody>
          </DraftCard>
        )}

        {/* 지원한 공고 */}
        {(appliedProgressList.length > 0 || appliedResultList.length > 0) && (
          <>
            <SectionTitle>지원한 공고</SectionTitle>

            {/* 진행중 */}
            {appliedProgressList.map((item) => (
              <Card key={`p-${item.id}`}>
                <CardHeader>
                  <CompanyLabel>{item.company || "구인업체명"}</CompanyLabel>
                  <IoIosArrowForward />
                </CardHeader>
                <JobTitle>{item.title || "[지역] 구인공고명"}</JobTitle>
                <Address>{item.addr || "주소 정보 없음"}</Address>
                <DisabledButton disabled>채용 진행중</DisabledButton>
              </Card>
            ))}

            {/* 결과 확인(불합격 등) */}
            {appliedResultList.map((item) => (
              <Card key={`r-${item.id}`}>
                <CardHeader>
                  <CompanyLabel>{item.company || "구인업체명"}</CompanyLabel>
                  <IoIosArrowForward />
                </CardHeader>
                <JobTitle>{item.title || "[지역] 구인공고명"}</JobTitle>
                <Address>{item.addr || "주소 정보 없음"}</Address>
                <SingleButtonRow>
                  <ButtonSmall
                    onClick={() => navigate("/homeseeker/result/fail")}
                    text={"채용 결과 확인하기"}
                  />
                </SingleButtonRow>
              </Card>
            ))}
          </>
        )}

        {/* 진행 중인 근로 */}
        {workingList.length > 0 && (
          <>
            <SectionTitle>진행 중인 근로</SectionTitle>
            {workingList.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <CompanyLabel>{item.company || "구인업체명"}</CompanyLabel>
                  <IoIosArrowForward />
                </CardHeader>
                <JobTitle>{item.title || "[지역] 구인공고명"}</JobTitle>
                <Address>{item.addr || "주소 정보 없음"}</Address>
                <TwoCols>
                  <ButtonSmall
                    onClick={() => navigate("/homeseeker/result/summary")}
                    type="White"
                    text={"계약서 관리"}
                  />
                  <ButtonSmall
                    text={"고용주 후기 작성"}
                    onClick={() => navigate("/homeseeker/review")}
                  />
                </TwoCols>
              </Card>
            ))}
          </>
        )}

        {/* 지원 현황 */}
        <Submenu onClick={() => navigate("/homeseeker/resume")}>
          <div>
            내 이력 확인하기<span>{resumeCount}회</span>
          </div>
          <IoIosArrowForward />
        </Submenu>
      </Section>
      <Homebar />
    </ProfileContainer>
  );
}

/* =========================
 * 스타일 (기존 유지)
 * ========================= */
const Homebar = styled(TapBarSeeker)``;

const Section = styled.div`
  padding: 20px 30px;
`;

const SmallButton = styled.button`
  display: flex;
  padding: 5px 10px;
  align-items: center;
  gap: 5px;
  border-radius: 7px;
  background: var(--Foundation-Green-Normal, #2baf66);
  border: none;
  color: var(--Foundation-surface-White, #fff);
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
`;

const ProfileContainer = styled.div``;

const TopCard = styled.div`
  display: flex;
  gap: 12px;
  padding-bottom: 20px;
  background: #fff;
  border-bottom: 1px solid #bfbfbf;
`;

const Avatar = styled.div`
  display: flex;
  align-items: center;
  color: var(--Foundation-Green-Normal);
`;

const TopRight = styled.div`
  flex: 1;
`;

const Name = styled.p`
  margin: 2px 0 6px;
  font-weight: 700;
  font-size: 20px;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding-top: 10px;
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #000;
  font-size: 15px;
`;

const EditRow = styled.div`
  margin-top: 10px;
  width: 140px;

  .edit-label {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const DraftCard = styled.div`
  display: flex;
  gap: 12px;
  padding: 10px;
  margin-top: 16px;
  background: var(--Foundation-Green-Light, #eaf7f0);
  border: 1px solid var(--Foundation-Green-Normal);
  border-radius: 7px;
`;

const DraftIcon = styled.div`
  display: flex;
  align-items: flex-start;
  color: var(--Foundation-Green-Normal);
`;

const DraftBody = styled.div`
  flex: 1;
`;

const DraftText = styled.p`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  margin: 0 0 12px;
  font-weight: 600;
  line-height: 1.4;
  font-size: 20px;
`;

const TwoCols = styled.div`
  display: flex;
  gap: 10px;

  > div {
    flex: 1;
  }
`;

const SingleButtonRow = styled.div`
  margin-top: 10px;

  > div {
    width: 100%;
  }
`;

const SectionTitle = styled.p`
  margin: 24px 4px 14px;
  font-size: 20px;
  font-weight: 700;
`;

const Card = styled.div`
  padding: 10px 20px;
  background: var(--Foundation-Green-Light, #eaf7f0);
  border-radius: 7px;
  margin-bottom: 14px;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  > svg {
    width: 20px;
    height: 20px;
    fill: #000;
  }
`;

const CompanyLabel = styled.span`
  display: inline-block;
  border-radius: 6px;
  font-size: 15px;
  color: #000;
`;

const JobTitle = styled.p`
  margin: 10px 0 10px;
  font-weight: 700;
  font-size: 20px;
`;

const Address = styled.p`
  margin: 0 0 12px;
  font-size: 15px;
  font-weight: 400;
  color: #000;
`;

const DisabledButton = styled.button`
  width: 100%;
  height: 45px;
  border: none;
  border-radius: 10px;
  background: var(--Foundation-Black-black-6, #bfbfbf);
  color: #fff;
  font-weight: 700;
  font-size: 18px;
`;

const Submenu = styled.div`
  display: flex;
  padding: 10px 20px;
  align-items: center;
  gap: 15px;
  margin-bottom: 100px;
  align-self: stretch;
  border-radius: 7px;
  background: var(--Foundation-Green-Light, #eaf7f0);
  cursor: pointer;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    flex: 1 0 0;
    align-self: stretch;
    color: #000;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    height: 78px;
  }

  span {
    align-self: stretch;
    color: var(--Foundation-Green-Normal, #2baf66);
  }
`;
