// pages/seeker/jobs/Jobs.jsx
import { useState, useCallback } from "react";
import ildream from "../../../assets/ildream.svg";
import styled from "styled-components";
import TapBarSeeker from "../../../components/common/TapBarSeeker";
import JobList from "../../../components/seeker/jobs/JobList";
import Search from "../../../components/seeker/jobs/Search";

const workerToken = import.meta.env.VITE_WORKER_TOKEN;
const serverUrl = import.meta.env.VITE_ILDREAM_URL;

// 응답 → JobList 시그니처로 매핑
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

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const fetchFilter = useCallback(async (raw) => {
    const keyword = (raw ?? "").trim();

    // 빈 검색어면 호출하지 않고 UI만 리셋
    if (!keyword) {
      setErrMsg("");
      setJobs([]);
      return;
    }

    if (!serverUrl) {
      setErrMsg("서버 주소가 설정되지 않았습니다.");
      return;
    }

    setLoading(true);
    setErrMsg("");

    try {
      const url = `${serverUrl}/api/jobPosts/search?keyword=${encodeURIComponent(
        keyword
      )}`;
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(workerToken ? { token: `${workerToken}` } : {}),
      };

      const res = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({ q: keyword }),
      });

      const text = await res.text();
      const json = text ? JSON.parse(text) : {};

      if (!res.ok) {
        if (json?.code === "E404" || res.status === 404) {
          setJobs([]);
          setErrMsg("");
          return;
        }
        throw new Error(json?.message || `HTTP_${res.status}`);
      }

      const list = Array.isArray(json)
        ? json
        : Array.isArray(json?.data)
        ? json.data
        : [];
      setJobs(list.map(mapJob));
      console.log(json.data);
    } catch (e) {
      console.error("[POST /api/jobPosts/search] 실패:", e);
      setErrMsg(e?.message || "검색 중 오류가 발생했습니다.");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <JobsContainer>
      <HeaderImg />
      <Search onSearch={fetchFilter} />

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
