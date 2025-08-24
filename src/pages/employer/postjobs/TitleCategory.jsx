import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import Enter from "../../../components/common/Enter";
import ProgressBar from "../../../components/common/Progressbar";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Icons } from "../../../components/icons/index";
import Alert_post from "../../../components/employer/Alert_post";

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

export default function TitleCategory() {
  const navigate = useNavigate();
  const location = useLocation();
  const prevState = location.state || {};

  const [title, setTitle] = useState("");

  // 오늘 날짜 YYYY-MM-DD 형식 구하는 함수
  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [startDate, setStartDate] = useState(getTodayDateString());
  const [endDate, setEndDate] = useState("");
  const [selectedoptions, setSelectedoptions] = useState({
    date: true,
    count: false,
  });

  const toggleOption = (key) => {
    setSelectedoptions((prev) => {
      const isSelected = prev[key];

      if (key === "count" && !isSelected) {
        // '채용시 마감' 선택 시 endDate 초기화
        setEndDate("");
      }

      if (isSelected) {
        return {};
      } else {
        return { [key]: !prev[key] };
      }
    });
  };

  const [selectedTag, setSelectedTag] = useState(null);
  const toggleTag = (key) => {
    setSelectedTag((prev) => (prev === key ? null : key));
  };

  const [backAlertOpen, setBackAlertOpen] = useState(false);
  const handleNext = () => {
    // 근무 시작/종료 시간 UTC ISO 문자열 변환
    const workStartTimeUTC = convertDateToLocalISOString(startDate);
    const workEndTimeUTC = selectedoptions.count
      ? null
      : convertDateToLocalISOString(endDate);
    const dbJobFields = selectedTag ? labelToDbString(selectedTag) : null;

    navigate("/employer/postjobs/paylocation", {
      state: {
        ...prevState,
        title,
        startDate: workStartTimeUTC,
        expiryDate: workEndTimeUTC,
        jobField: dbJobFields ? dbJobFields : null,
      },
    });
  };
  return (
    <>
      <Headersection>
        <Header text={"지원자 현황"} showBack />
      </Headersection>

      <Alert_post
        open={backAlertOpen}
        onConfirm={() => {
          setBackAlertOpen(false);
          navigate("/employer");
        }}
        onCancel={() => setBackAlertOpen(false)}
        onClose={() => setBackAlertOpen(false)}
      />
      <ApplyWrapper>
        <ProgressBar value={"25"} max={"100"} />
        <Question>
          공고 제목과 <br />
          구인분야와 <br />
          구인기간을 알려주세요.
        </Question>
        <OptionsWrapper>
          <Tag>
            <p>공고제목</p>
            <Enter
              text="제목을 입력해주세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Tag>
          <Tag>
            <p>구인기간</p>
            <Period>
              <Inputdate
                type="date"
                placeholder="Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              ~
              <Inputdate
                type="date"
                placeholder="Date"
                value={selectedoptions.count ? "" : endDate}
                onChange={(e) => setEndDate(e.target.value)}
                disabled={selectedoptions.count} // 채용시마감이 선택되면 비활성화
              />
            </Period>
            <Selectcheckbox onClick={() => toggleOption("count")}>
              {selectedoptions.count ? (
                <Icons.CheckboxActive
                  color="var(--Foundation-Green-Normal)"
                  size={18}
                />
              ) : (
                <Icons.CheckboxInactive
                  color="var(--Foundation-Green-Normal)"
                  size={18}
                />
              )}
              채용시 마감
            </Selectcheckbox>
          </Tag>
          <Tag>
            <p>구인분야</p>
            <TagList>
              {categoryMap.map((item) => (
                <TagPill
                  key={item.label} // label을 키로 사용
                  data-selected={selectedTag === item.label}
                  onClick={() => toggleTag(item.label)}
                >
                  {item.label}
                </TagPill>
              ))}
            </TagList>
          </Tag>
        </OptionsWrapper>
      </ApplyWrapper>
      <Footer>
        <Button text="다음" type="White" onClick={handleNext} />
      </Footer>
    </>
  );
}
function convertDateToLocalISOString(dateStr) {
  if (!dateStr) return "";

  // dateStr 예: "2025-08-22"
  // 시간은 자정 00:00으로 고정하거나 필요 시 수정 가능
  return `${dateStr}T00:00`;
}

function labelToDbString(label) {
  const category = categoryMap.find((cat) => cat.label === label);
  if (!category) return "";

  // keys 배열을 쉼표로 연결한 문자열 반환
  return category.keys.join(",");
}

const Headersection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--Foundation-Black-black-5, #d9d9d9);
`;

const Tag = styled.div`
  p {
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 8px 0;
  }
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TagPill = styled.button`
  all: unset;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  border: 1px solid #bfbfbf;
  background: #ffffff;

  &[data-selected="true"] {
    background: var(--Foundation-Green-Light, #eaf7f0);
    border-color: #7cc9a5;
    font-weight: 600;
  }

  &[data-variant="outline"] {
    background: #ffffff;
  }
`;

const ApplyWrapper = styled.div`
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 45px;
  flex: 1 0 0;
  align-self: stretch;
  background-color: var(--Foundation-Black-black-1);
`;

const Question = styled.div`
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid #d9d9d9;
  padding: 10px;
`;

const Inputdate = styled.input`
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  // align-self: stretch;
  border-radius: 7px;
  border: 1px solid var(--Foundation-Black-black-6, #bfbfbf);
  background: var(--Foundation-surface-White, #fff);
`;

const Period = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const Selectcheckbox = styled.button`
  display: flex;
  padding: 0;
  align-items: center;
  gap: 5px;
  border: none;
  background-color: transparent;
  font-size: 15px;
`;
