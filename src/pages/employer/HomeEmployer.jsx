import ildream from "../../assets/ildream.svg";
import TapBar from "../../components/common/TapBar";
import Search from "../../components/employer/Search";
import JobPostItem from "../../components/employer/JobPostItem";
import FilterTab from "../../components/employer/FilterTab";
import { useEffect, useState } from "react";
import styled from "styled-components";

const employerToken = import.meta.env.VITE_EMPLOYER_TOKEN;
const serverUrl = import.meta.env.VITE_ILDREAM_URL;

export default function HomeEmployer() {
  const [jobPosts, setJobPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("모집 중"); // 기본: OPEN
  // const employerId = jobPosts[0].id;
  // console.log(jobPosts[0].id);
  // 필터링 함수 수정
  const getFilteredData = () => {
    return jobPosts.filter((jobPost) => {
      // const isEmployerMatch = jobPost.employer?.id === employerId;
      // console.log(isEmployerMatch);
      const isStatusMatch = statusFilter
        ? jobPost.status === statusFilter
        : true;
      const isSearchMatch = search === "" || jobPost.title.includes(search);

      // 아래는 employerId 없이 필터링
      return isStatusMatch && isSearchMatch;
    });
  };

  useEffect(() => {
    fetch(`${serverUrl}/employers/me/jobPosts`, {
      headers: {
        token: `${employerToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("네트워크 응답 실패");
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setJobPosts(data.data);
          console.log(data.data);
        } else {
          console.error("API 에러", data.message);
        }
      })
      .catch((err) => console.error("Fetch 에러", err));
  }, []);

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredjobPosts = getFilteredData();
  // const isEmployerPostsExist = jobPosts.some(
  //   (jobPost) => jobPost.employer?.id === employerId
  // );

  return (
    <>
      <HeaderImg />
      <FilterTab onChange={(newStatus) => setStatusFilter(newStatus)} />
      <Search text="검색어를 입력하세요." onChange={onChangeSearch} />
      <JobPostsWrapper>
        {filteredjobPosts.length > 0 ? (
          filteredjobPosts.map((jobPost) => (
            <JobPostItem key={jobPost.jobPostId} {...jobPost} />
          ))
        ) : (
          <EmptyMessage>
            아직 채용중인 공고가 없어요.🥲 <br />
            하단 중앙에 있는 공고 등록하기로 <br />
            채용을 시작할 수 있어요!
          </EmptyMessage>
          //    (
          //   <EmptyMessage>
          //     검색어에 맞는 공고가 없어요.🥲 <br />
          //     검색어를 바꿔서 다시 찾아보세요!
          //   </EmptyMessage>
          // ) :
        )}
      </JobPostsWrapper>
      <TapBar />
    </>
  );
}

// 스타일 그대로 유지

function HeaderImg() {
  return (
    <HeaderImgContainer>
      <img src={ildream} />
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

const JobPostsWrapper = styled.div`
  display: flex;
  padding: 15px;
  flex-direction: column;
  gap: 16px;
  flex: 1 0 0;
  background-color: white;
`;

const EmptyMessage = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: center;
  margin-top: 50%;
`;
