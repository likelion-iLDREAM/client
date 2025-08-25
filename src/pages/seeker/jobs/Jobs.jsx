// pages/seeker/jobs/Jobs.jsx
import { useEffect, useState } from "react";
import ildream from "../../../assets/ildream.svg";
import styled from "styled-components";
import TapBarSeeker from "../../../components/common/TapBarSeeker";
import JobList from "../../../components/seeker/jobs/JobList";
import Search from "../../../components/seeker/jobs/Search";

/** ===== ENV ===== */
const serverUrl = import.meta.env.VITE_ILDREAM_URL;
const workerToken = import.meta.env.VITE_WORKER_TOKEN;
const employerToken = import.meta.env.VITE_EMPLOYER_TOKEN;
const AUTH_TOKEN = workerToken || employerToken;

/** ===== 응답 → UI 매핑 (JobList 시그니처에 맞춤) ===== */
function mapJob(item) {
  return {
    JobPostId: item.jobPostId ?? item.id,
    companyName: item.companyName || "구인업체명",
    workPlace: item.workPlace ?? null,
    title: item.title || "[지역] 구인공고명",
    location: item.location || "주소 정보 없음",
    applyMethods: Array.isArray(item.applyMethods) ? item.applyMethods : [],
    expiryDate: item.expiryDate || null,
    jobField: item.jobField || "",
    status: item.status || "",
  };
}

/** GET 우선 → 바디 요구시 POST {} + X-HTTP-Method-Override: GET 폴백 */
async function fetchJobPosts() {
  if (!serverUrl) throw new Error("서버 주소가 설정되지 않았습니다.");

  const baseHeaders = {
    Accept: "application/json",
    ...(AUTH_TOKEN ? { token: `${AUTH_TOKEN}` } : {}),
  };

  // 1) GET (명세)
  try {
    const res = await fetch(`${serverUrl}/jobPosts`, {
      method: "GET",
      headers: baseHeaders, // GET에는 body/Content-Type 절대 넣지 않음
      mode: "cors",
    });
    const text = await res.text();
    const json = text ? JSON.parse(text) : {};
    if (res.ok && json?.success) return json;

    // 목록 없음 케이스 처리
    if (json?.code === "E404" || res.status === 404) {
      return { success: true, data: [] };
    }

    // 바디 요구로 추정되는 경우에만 폴백 진행
    const msg = (json?.message || "").toLowerCase();
    const requiresBody =
      /required request body is missing/.test(msg) ||
      res.status === 400 || // Bad Request
      res.status === 415 || // Unsupported Media Type
      res.status === 405; // Method Not Allowed

    if (!requiresBody) {
      throw new Error(json?.message || `HTTP_${res.status}`);
    }
    // 아래에서 폴백 진행
  } catch (e) {
    // 네트워크/파싱 오류도 폴백 시도
  }

  // 2) 폴백: POST {} + X-HTTP-Method-Override: GET
  const res2 = await fetch(`${serverUrl}/jobPosts`, {
    method: "POST",
    headers: {
      ...baseHeaders,
      "Content-Type": "application/json",
      "X-HTTP-Method-Override": "GET", // ← 서버가 허용해야 함
    },
    body: JSON.stringify({}), // 서버가 요구하는 빈 바디
    mode: "cors",
  });
  const text2 = await res2.text();
  const json2 = text2 ? JSON.parse(text2) : {};
  if (res2.ok && json2?.success) return json2;

  // 폴백도 실패하면 에러 전파
  throw new Error(json2?.message || `HTTP_${res2.status}`);
}

/** ===== 메인 컴포넌트 ===== */
export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const json = await fetchJobPosts();
  //       const list = Array.isArray(json.data) ? json.data.map(mapJob) : [];
  //       setJobs(list);
  //       setErrMsg("");
  //     } catch (err) {
  //       console.error("[/jobPosts] 실패:", err);
  //       setErrMsg(err?.message || String(err));
  //     } finally {
  //       setLoading(false);
  //     }
  //   })();
  // }, []);
  useEffect(() => {
    async function fetchJobPosts() {
      try {
        const res = await fetch(`${serverUrl}/jobPosts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: `${workerToken}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setJobs(data);
        } else {
          alert("모집공고를 불러오는데 실패했습니다.");
        }
      } catch (error) {
        console.error("모집공고 목록 불러오기 오류", error);
      }
    }
    fetchJobPosts();
  }, [serverUrl]);

  return (
    <JobsContainer>
      <HeaderImg />
      <Search />

      <List>
        {loading && <p>불러오는 중…</p>}

        {!loading && errMsg && (
          <p style={{ color: "crimson" }}>
            공고 목록을 불러오지 못했어요. {errMsg}
          </p>
        )}

        {!loading && !errMsg && jobs.length === 0 && (
          <p>표시할 공고가 없어요.</p>
        )}

        {!loading &&
          !errMsg &&
          jobs.map((job) => (
            <JobList
              key={job.JobPostId}
              JobPostId={job.JobPostId}
              companyName={job.companyName}
              workPlace={job.workPlace}
              title={job.title}
              location={job.location}
              applyMethods={job.applyMethods}
              expiryDate={job.expiryDate}
              jobField={job.jobField}
              status={job.status}
            />
          ))}
      </List>

      <Homebar />
    </JobsContainer>
  );
}

/** ===== 스타일 ===== */
const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  gap: 16px;
`;

const Homebar = styled(TapBarSeeker)``;

const JobsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function HeaderImg() {
  return (
    <HeaderImgContainer>
      <img src={ildream} alt="일드림" />
    </HeaderImgContainer>
  );
}

const HeaderImgContainer = styled.div`
  width: 400px;
  height: 70px;
  background-color: #eaf7f0;
  font-size: 30px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > img {
    width: 93px;
    height: 57px;
    flex-shrink: 0;
  }
`;
