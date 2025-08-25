// pages/seeker/profile/ProfileSeeker.jsx
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
 * ENV
 * ========================= */
const workerToken = import.meta.env.VITE_WORKER_TOKEN;
const serverUrl = import.meta.env.VITE_ILDREAM_URL;

/* =========================
 * 상태 매핑
 * ========================= */
const STATUS_BUCKET = {
  DRAFT: "draft",
  SUBMITTED: "submitted", // 진행중으로 취급
  NEEDINTERVIEW: "needinterview",
  PENDING: "pending",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
  HIRED: "hired",
};

function toBucket(status) {
  const key = String(status || "").toUpperCase();
  return STATUS_BUCKET[key] || "submitted";
}

/* =========================
 * 직무 태그 라벨
 * ========================= */
const JOB_OPTIONS = [
  { api: "농사,원예,어업", label: "🌱농사·원예·어업" },
  { api: "운전,배달", label: "🚚운전·배달" },
  { api: "식품,옷,환경 가공", label: "🥬식품·옷·환경 가공" },
  { api: "사무,금융", label: "📄사무·금융" },
  { api: "판매", label: "🛒판매" },
  { api: "돌봄", label: "❤️돌봄" },
  { api: "청소,미화", label: "🧹청소·미화" },
  { api: "음식,서비스", label: "🍲음식·서비스" },
  { api: "목공,공예,제조", label: "🪚목공·공예·제조" },
  { api: "문화,연구,기술", label: "🎨문화·연구·기술" },
  { api: "건설,시설 관리", label: "🏗️건설·시설 관리" },
  { api: "전기,전자 수리", label: "🔌전기·전자 수리" },
  { api: "기계,금속제작,수리", label: "⚙️기계·금속 제작·수리" },
];
const apiToLabel = Object.fromEntries(JOB_OPTIONS.map((o) => [o.api, o.label]));

/* =========================
 * 공통 fetch 도우미
 * ========================= */
async function fetchJSON(url, options = {}) {
  const res = await fetch(url, options);
  const raw = await res.text().catch(() => "");
  let json = {};
  try {
    json = raw ? JSON.parse(raw) : {};
  } catch {}
  if (!res.ok) {
    throw new Error(json?.message || `HTTP_${res.status}`);
  }
  return json;
}

/* =========================
 * API
 * ========================= */
async function fetchMe() {
  const json = await fetchJSON(`${serverUrl}/workers/me`, {
    method: "GET",
    headers: { token: workerToken },
    mode: "cors",
  });
  const me = json?.data || {};
  const name = (me.name || "").trim();

  const jobInterest = Array.isArray(me.jobInterest) ? me.jobInterest : [];
  const tags = jobInterest.map(
    (api) => apiToLabel[api] || api.replace(/,/g, "·")
  );

  // 다른 화면 일관성 위해 세션에도 저장
  sessionStorage.setItem("signup.name", name);
  sessionStorage.setItem("signup.interests", JSON.stringify(tags));
  sessionStorage.setItem("signup.interestsApi", JSON.stringify(jobInterest));

  return { name, tags };
}

async function fetchApplications() {
  const json = await fetchJSON(`${serverUrl}/applications/me`, {
    method: "GET",
    headers: { token: workerToken, Accept: "application/json" },
    mode: "cors",
  });

  const list = Array.isArray(json?.data)
    ? json.data
    : Array.isArray(json?.data?.items)
    ? json.data.items
    : [];

  // 적응형 매핑
  return list.map((r, i) => {
    const id = r.applicationId ?? r.id ?? r.application?.id ?? r.appId ?? i + 1;
    const company =
      r.companyName || r.company?.name || r.employerName || "구인업체명";
    const title =
      r.title ||
      r.postTitle ||
      r.jobTitle ||
      r.jobPostTitle ||
      r.post?.title ||
      "[지역] 구인공고명";
    const addr =
      r.address ||
      r.addr ||
      r.location?.address ||
      r.location ||
      "주소 정보 없음";
    const status = toBucket(r.status || r.applicationStatus || "SUBMITTED");
    return { id, company, title, addr, status };
  });
}

/* =========================
 * 컴포넌트
 * ========================= */
export default function ProfileSeeker() {
  const navigate = useNavigate();

  // 상단 사용자/태그
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

  // 지원 리스트
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [progressList, setProgressList] = useState([]); // 진행중
  const [resultList, setResultList] = useState([]); // 결과(합/불)

  useEffect(() => {
    (async () => {
      try {
        const me = await fetchMe();
        setName(me.name);
        setTags(me.tags);

        const apps = await fetchApplications();

        // 진행/결과 분리
        const progress = [];
        const results = [];
        for (const a of apps) {
          if (a.status === "accepted" || a.status === "rejected") {
            results.push(a);
          } else {
            // submitted / needinterview / pending / hired 등은 진행중으로
            progress.push(a);
          }
        }

        setProgressList(progress);
        setResultList(results);
        setErr("");
      } catch (e) {
        console.error(e);
        setErr(e?.message || String(e));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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

        {/* 에러/로딩 */}
        {loading && <p style={{ padding: 16 }}>불러오는 중…</p>}
        {!loading && err && (
          <p style={{ padding: 16, color: "crimson" }}>
            지원 목록을 불러오지 못했어요. {err}
          </p>
        )}

        {/* 지원한 공고 */}
        {!loading &&
          !err &&
          (progressList.length > 0 || resultList.length > 0) && (
            <>
              <SectionTitle>지원한 공고</SectionTitle>

              {/* 진행중: SUBMITTED / NEEDINTERVIEW / PENDING / HIRED ... */}
              {progressList.map((item) => (
                <Card key={`p-${item.id}`}>
                  <CardHeader>
                    <CompanyLabel>{item.company}</CompanyLabel>
                    <IoIosArrowForward />
                  </CardHeader>
                  <JobTitle>{item.title}</JobTitle>
                  <Address>{item.addr}</Address>
                  <DisabledButton disabled>채용 진행중</DisabledButton>
                </Card>
              ))}

              {/* 결과: ACCEPTED / REJECTED */}
              {resultList.map((item) => (
                <Card key={`r-${item.id}`}>
                  <CardHeader>
                    <CompanyLabel>{item.company}</CompanyLabel>
                    <IoIosArrowForward />
                  </CardHeader>
                  <JobTitle>{item.title}</JobTitle>
                  <Address>{item.addr}</Address>
                  <SingleButtonRow>
                    <ButtonSmall
                      onClick={() =>
                        navigate(
                          item.status === "accepted"
                            ? "/homeseeker/result/sucess"
                            : "/homeseeker/result/fail"
                        )
                      }
                      text={"채용 결과 확인하기"}
                    />
                  </SingleButtonRow>
                </Card>
              ))}
            </>
          )}

        {/* 지원 현황 요약 */}
      </Section>

      <Homebar />
    </ProfileContainer>
  );
}

/* =========================
 * 스타일
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
  font-weight: 700;
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

const SingleButtonRow = styled.div`
  margin-top: 10px;
  > div {
    width: 100%;
  }
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
    color: #000;
    font-size: 20px;
    font-weight: 700;
    height: 78px;
  }

  span {
    color: var(--Foundation-Green-Normal, #2baf66);
  }
`;
