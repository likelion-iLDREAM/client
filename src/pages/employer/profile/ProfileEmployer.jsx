import Header from "../../../components/common/Header";
import TapBar from "../../../components/common/TapBar";
import styled from "styled-components";
import { Icons } from "../../../components/icons/index";
import { IoPersonCircleOutline } from "react-icons/io5";
import ButtonSmall from "../../../components/common/ButtonSmall";
import { AiOutlineEdit } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import Button from "../../../components/common/Button";
import { PiX } from "react-icons/pi";
import { BsAspectRatio } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const employerToken = import.meta.env.VITE_EMPLOYER_TOKEN;
const serverUrl = import.meta.env.VITE_ILDREAM_URL;

const categoryMap = [
  { keys: ["농사", "원예", "어업"], label: "🌱농사·원예·어업" },
  { keys: ["운전", "배달"], label: "🚚운전·배달" },
  { keys: ["식품", "옷", "환경 가공"], label: "🥬식품·옷·환경 가공" },
  { keys: ["사무", "금융"], label: "📄사무·금융" },
  { keys: ["판매"], label: "🛒판매" },
  { keys: ["돌봄"], label: "❤️돌봄" },
  { keys: ["청소", "미화"], label: "🧹청소·미화" },
  { keys: ["음식", "서비스"], label: "🍲음식·서비스" },
  { keys: ["목공", "공예", "제조"], label: "🪚목공·공예·제조" },
  { keys: ["문화", "연구", "기술"], label: "🎨문화·연구·기술" },
  { keys: ["건설", "시설 관리"], label: "🏗️건설·시설 관리" },
  { keys: ["전기", "전자 수리"], label: "🔌전기·전자 수리" },
  { keys: ["기계", "금속제작", "수리"], label: "⚙️기계·금속 제작·수리" },
  { keys: ["기타"], label: "💬기타" },
];

export default function ProfileEmployer() {
  const [id, setID] = useState(0);
  const [companyName, setCompanyName] = useState("");
  const [bossName, setBossName] = useState("");
  const [tags, setTags] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("employer.jobFields") || "[]");
    } catch {
      return [];
    }
  });
  const [questionList, setQuestionList] = useState([]);
  const [name, setName] = useState(() =>
    (sessionStorage.getItem("employer.name") || "").trim()
  );
  const [reviewCount, setReviewCount] = useState(0);

  const navigate = useNavigate();

  // const [tags, setTags] = useState(() => {
  //   try {
  //     return JSON.parse(sessionStorage.getItem("employer.jobFields") || "[]");
  //   } catch {
  //     return [];
  //   }
  // });

  // const [name, setName] = useState(() =>
  //   (sessionStorage.getItem("employer.name") || "").trim()
  // );

  // const [reviewCount, setReviewCount] = useState(0);

  // const navigate = useNavigate();
  // useEffect(() => {
  //   fetch(`${serverUrl}/employers/me`, {
  //     headers: { token: `${employerToken}` },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.success && data.data) {
  //         const emp = data.data;
  //         console.log("emp입니당", emp);
  //         const rawJobFields = emp.jobFields;
  //         setID(emp.id);
  //         console.log("id를 설정했나?", id);
  //         // mapDbToLabels 함수가 문자열 또는 배열 모두 처리하도록 되어야 함
  //         setTags(mapDbToLabels(rawJobFields));

  //         setName(emp.name || emp.Name || "");

  //         console.log(emp.reviewCount);
  //         // 기업 후기 개수 저장
  //         setReviewCount(emp.reviewCount || 0);
  //       }
  //     })
  //     .catch(console.error);
  // }, []);
  // useEffect(() => {
  //   fetchEmployerId();
  // }, []);
  const fetchEmployerData = () => {
    fetch(`${serverUrl}/employers/me`, {
      headers: { token: employerToken },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          const emp = data.data;
          setID(emp.id);
          setCompanyName(emp.companyName || "");
          setBossName(emp.bossName || "");
          setTags(mapDbToLabels(emp.jobFields));
          setQuestionList(emp.questionList?.items || []); // questionList가 없으면 빈 배열
          setName(emp.name || emp.Name || "");
          setReviewCount(emp.reviewCount || 0);
          // 필요하면 추가 필드 업데이트도 여기에
        }
      })
      .catch(console.error);
  };
  const goToQuestionList = async () => {
    try {
      const res = await fetch(`${serverUrl}/employers/me`, {
        headers: { token: employerToken },
      });
      const data = await res.json();
      if (data.success && data.data) {
        const emp = data.data;
        const newId = emp.id;
        const newCompanyName = emp.companyName || "";
        const newBossName = emp.bossName || "";
        const newTags = mapDbToLabels(emp.jobFields);
        const newQuestionList = emp.questionList?.items || [];

        // 상태 업데이트 (필요하다면)
        setID(newId);
        console.log("newid", newId);
        setCompanyName(newCompanyName);
        console.log("newcompanyname", newCompanyName);
        setBossName(newBossName);
        setTags(newTags);
        setQuestionList(newQuestionList);
        console.log("흠 원래 questionlist??", emp.questionList);
        console.log("newquestionlist라는데요", newQuestionList);
        // 데이터가 준비된 후에 navigate 호출
        navigate("/employer/questionlist", {
          state: {
            id: newId,
            companyName: newCompanyName,
            bossName: newBossName,
            jobFields: newTags,
            questionList: newQuestionList,
          },
        });
      }
    } catch (error) {
      console.error(error);
      alert("데이터를 불러오는 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchEmployerData();
  }, []);

  return (
    <>
      <Header text={"내 기업 정보"} />
      <Section>
        <TopCard>
          <Avatar>
            <Icons.Building color="var(--Foundation-Green-Normal)" size={45} />
          </Avatar>
          <TopRight>
            <Name>{name || "고객님"}</Name>
            <SubWrapper>
              구인분야
              <TagRow>
                {tags.slice(0, 3).map((t, i) => (
                  <Tag key={i}>{t}</Tag>
                ))}
              </TagRow>
            </SubWrapper>
            <EditRow>
              <SmallButton onClick={() => navigate("/employer/profile/edit")}>
                <Icons.UserEdit />내 기업 수정
              </SmallButton>
            </EditRow>
          </TopRight>
        </TopCard>
        <Menu>
          <Submenu onClick={() => navigate("/employer/checkreview")}>
            <div>
              기업 후기<span>{reviewCount}회</span>
            </div>
            <Icons.ArrowForward size={24} />
          </Submenu>
          <Submenu onClick={goToQuestionList}>
            <div>저장된 추가 질문</div>
            <Icons.ArrowForward size={24} />
          </Submenu>
        </Menu>
      </Section>
      <TapBar initialTab="emp_profile" />
    </>
  );
}

function mapDbToLabels(input) {
  if (!input) return [];

  let parts = [];

  if (Array.isArray(input)) {
    parts = input;
  } else if (typeof input === "string") {
    parts = input
      .split(/[,·\s]+/)
      .map((s) => s.trim())
      .filter(Boolean);
  } else {
    return [];
  }

  const labels = [];

  parts.forEach((part) => {
    for (const category of categoryMap) {
      if (category.keys.some((key) => part.includes(key))) {
        if (!labels.includes(category.label)) {
          labels.push(category.label);
        }
        break;
      }
    }
  });

  return labels;
}

const Section = styled.div`
  padding: 20px;
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
const ProfileWrapper = styled.div`
  display: flex;
  padding: 20px 10px;
  align-items: center;
  gap: 20px;
  align-self: stretch;
  border-bottom: 1px solid #bfbfbf;
`;

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
  width: 72px;
  align-self: stretch;
  justify-content: center;
`;

const ProfileImage = styled.div`
  display: flex;
  width: 60px;
  height: 60px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 1000px;
  border: 5px solid var(--Foundation-Green-Normal, #2baf66);
  background: var(--Foundation-surface-White, #fff);
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 220px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const SubWrapper = styled.div`
  font-size: 15px;
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

const Submenu = styled.div`
  display: flex;
  padding: 10px 20px;
  align-items: center;
  gap: 15px;
  align-self: stretch;
  border-radius: 7px;
  cursor: pointer;
  background: var(--Foundation-Green-Light, #eaf7f0);
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

const Text = styled.div``;

const Menu = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 19px;
  flex: 1 0 0;
  align-self: stretch;
`;
