import ildream from "../../assets/ildream.svg";
import TapBar from "../../components/common/TapBar";
import Search from "../../components/employer/Search";
import JobPostItem from "../../components/employer/JobPostItem";
import FilterTab from "../../components/employer/FilterTab";
import { useEffect, useState } from "react";
import styled from "styled-components";

const mockdata = [
  {
    id: 1,
    title: "주 3일 카페 서빙 직원 모집",
    paymentType: "HOURLY",
    location: "서울 마포구 합정동 123-45",
    applyMethod: ["QUICK"],
    expiryDate: "2025-09-30T15:00:00Z",
    status: "OPEN", // OPEN | CLOSED
    createdAt: "2025-08-13T07:00:00Z",
    updatedAt: "2025-08-13T07:00:00Z",
    employer: {
      id: 44,
      name: "김사장",
      companyName: "해피카페",
      companyLocation: "서울 마포구 합정동 123-45",
    },
  },
  {
    id: 2,
    title: "학원 등하차 도우미 모집",
    content: "성실하고 아이를 좋아하시는 분 모집합니다. 초보자 환영",
    paymentType: "HOURLY",
    payment: 12000,
    location: "서울 마포구 합정동 123-45",
    info: "아이들 학원 등하차할 때 애들 케어해주시면 됩니다",
    applyMethod: ["QUICK", "PHONE"],
    questionList: [
      "본인의 경력에 대해 간단히 설명해주세요.",
      "희망 근무 요일과 시간을 알려주세요.",
    ],
    expiryDate: "2025-08-30T15:00:00Z",
    status: "OPEN", // OPEN | CLOSED
    createdAt: "2025-08-13T07:00:00Z",
    updatedAt: "2025-08-13T07:00:00Z",
    employer: {
      id: 44,
      name: "김사장",
      companyName: "해피카페",
      companyLocation: "서울 마포구 합정동 123-45",
    },
  },
  {
    id: 3,
    title: "학원 마감된 더미",
    content: "성실하고 아이를 좋아하시는 분 모집합니다. 초보자 환영",
    paymentType: "HOURLY",
    payment: 12000,
    location: "서울 마포구 대흥동 123-45",
    info: "아이들 학원 등하차할 때 애들 케어해주시면 됩니다",
    applyMethod: ["QUICK", "PHONE"],
    questionList: [
      "본인의 경력에 대해 간단히 설명해주세요.",
      "희망 근무 요일과 시간을 알려주세요.",
    ],
    expiryDate: "2025-07-30T15:00:00Z",
    status: "CLOSED", // OPEN | CLOSED
    createdAt: "2025-07-13T07:00:00Z",
    updatedAt: "2025-07-13T07:00:00Z",
    employer: {
      id: 44,
      name: "김사장",
      companyName: "해피카페",
      companyLocation: "서울 마포구 대흥동 123-45",
    },
  },
];

export default function HomeEmployer() {
  const [jobPosts, setJobPosts] = useState(mockdata);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("OPEN"); // 기본은 채용중
  const employerId = 44; // 예시, 실제는 props 또는 auth context에서 받음
  const employerPosts = jobPosts.filter(
    (jobPost) => jobPost.employer.id === employerId
  );

  const getFilteredData = () => {
    return jobPosts.filter((jobPost) => {
      // 1) 본인 employer id 여부 필터링
      const isEmployerMatch = jobPost.employer.id === employerId;

      // 2) 상태 필터링 (채용중 or 마감)
      const isStatusMatch = statusFilter
        ? jobPost.status === statusFilter
        : true;

      // 3) 검색어 필터링
      const isSearchMatch = search === "" || jobPost.title.includes(search);

      return isEmployerMatch && isStatusMatch && isSearchMatch;
    });
  };

  useEffect(() => {
    fetch("")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setJobPosts(data.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  const filteredjobPosts = getFilteredData();

  const isEmployerPostsExist = employerPosts.length > 0;

  return (
    <>
      <HeaderImg />
      <FilterTab onChange={(newStatus) => setStatusFilter(newStatus)} />

      <Search text="검색어를 입력하세요." onChange={onChangeSearch} />
      <JobPostsWrapper>
        {filteredjobPosts.length > 0 ? (
          filteredjobPosts.map((jobPost) => (
            <JobPostItem key={jobPost.id} {...jobPost} />
          ))
        ) : isEmployerPostsExist ? (
          <EmptyMessage>
            검색어에 맞는 공고가 없어요.🥲 <br />
            검색어를 바꿔서 다시 찾아보세요!
          </EmptyMessage>
        ) : (
          <EmptyMessage>
            아직 채용중인 공고가 없어요.🥲 <br />
            하단 중앙에 있는 공고 등록하기로 <br />
            채용을 시작할 수 있어요!
          </EmptyMessage>
        )}
      </JobPostsWrapper>

      <TapBar />
    </>
  );
}

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
