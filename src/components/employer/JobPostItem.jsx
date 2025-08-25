import styled from "styled-components";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

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

export default function JobPostItem({
  id,
  title,
  paymentType,
  location,
  applyMethod, // 만약 배열이라면 applyMethods로 받을 수도 있음
  startDate,
  expiryDate,
  status,
  createdAt,
  updatedAt,
  employer,
  jobField,
  workPlace,
}) {
  const navigate = useNavigate();
  console.log("jobpostid욜시다", id);
  const handleViewApplicants = () => {
    navigate("/employer/seekerlist/seekerlist", { state: { id } });
  };

  // employer 객체 구조 분해
  const { name: employerName, companyName, companyLocation } = employer || {};

  const parts = location ? location.split(" ") : [];
  const today = new Date();
  const expiryDateObj = new Date(expiryDate);

  const ddayStr =
    expiryDate === null
      ? "채용시마감"
      : (() => {
          const diffMs = expiryDateObj.getTime() - today.getTime();
          const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
          return diffDays > 0
            ? `D-${diffDays}`
            : diffDays === 0
            ? "D-day"
            : `D+${Math.abs(diffDays)}`;
        })();

  // const today = new Date();
  // const expiryDateObj = new Date(expiryDate);
  // const diffMs = expiryDateObj.getTime() - today.getTime();
  // const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  // const ddayStr =
  //   diffDays > 0
  //     ? `D-${diffDays}`
  //     : diffDays === 0
  //     ? "D-day"
  //     : `D+${Math.abs(diffDays)}`;

  const formattedExpiryDate = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(expiryDateObj);

  return (
    <ItemWrapper>
      <TextWrapper>
        <Information>
          <div>{companyName || employerName}</div>
          <div>
            <Filter
              style={{
                display: "inline-block",
                marginRight: "4px",
                color: "var(--Foundation-Black-Black-13)",
                border: "1px solid #000",
                backgroundColor: "transparent",
                padding: "2px 5px",
                fontSize: "13px",
                fontWeight: "400",
              }}
            >
              {mapDbToLabels(jobField)}{" "}
              {/* 필요시 다른 텍스트나 아이콘으로 교체 */}
            </Filter>
            <span>
              [{workPlace}] {title}
            </span>
          </div>
          <div>{location}</div>
          <div>
            ~{expiryDate === null ? "채용시 " : formattedExpiryDate} 마감
          </div>
        </Information>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "5px",
          }}
        >
          <Filter
            status={status}
            style={{
              padding: "4px 5px",
            }}
          >
            {ddayStr}
          </Filter>
          <Filter
            status={status}
            style={{
              fontSize: "13px",
            }}
          >
            {status === "모집 중" ? "채용중" : "채용마감"}
          </Filter>
        </div>
      </TextWrapper>
      <Button text="지원자 확인하기" onClick={handleViewApplicants} />
    </ItemWrapper>
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

// 스타일 정의 (기존대로 유지)
const ItemWrapper = styled.div`
  display: flex;
  padding: 10px 20px;
  flex-direction: column;
  align-items: center;
  gap: 9px;
  align-self: stretch;
  border-radius: 7px;
  background: var(--Foundation-Green-Light, #eaf7f0);
`;
const Information = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex: 1 0 0;
`;

const Filter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 10px;
  background: #fff;
  font-size: 15px;
  min-width: auto;
  box-sizing: border-box;
  text-align: center;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  border: ${({ status }) =>
    status === "모집 중"
      ? "1px solid #ff5858"
      : "1px solid var(--Foundation-Black-black-7, #8C8C8C)"};
  color: ${({ status }) =>
    status === "모집 중"
      ? "#e05e5e"
      : "var(--Foundation-Black-black-7, #8C8C8C)"};
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  align-self: stretch;
`;
