import styled from "styled-components";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

export default function JobPostItem({
  jobPostId,
  title,
  paymentType,
  location,
  applyMethod, // 만약 배열이라면 applyMethods로 받을 수도 있음
  expiryDate,
  status,
  createdAt,
  updatedAt,
  employer,
}) {
  const navigate = useNavigate();

  const handleViewApplicants = () => {
    navigate("/employer/seekerlist/seekerlist", { state: jobPostId });
  };

  // employer 객체 구조 분해
  const { name: employerName, companyName, companyLocation } = employer || {};

  const parts = location ? location.split(" ") : [];
  const dong = parts.find((part) => part.endsWith("동"));

  const today = new Date();
  const expiryDateObj = new Date(expiryDate);
  const diffMs = expiryDateObj.getTime() - today.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  const ddayStr =
    diffDays > 0
      ? `D-${diffDays}`
      : diffDays === 0
      ? "D-day"
      : `D+${Math.abs(diffDays)}`;

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
              🛒판매 {/* 필요시 다른 텍스트나 아이콘으로 교체 */}
            </Filter>
            <span>
              [{dong}] {title}
            </span>
          </div>
          <div>{location}</div>
          <div>~{formattedExpiryDate} 마감</div>
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
            {status === "OPEN" ? "채용중" : "채용마감"}
          </Filter>
        </div>
      </TextWrapper>
      <Button text="지원자 확인하기" onClick={handleViewApplicants} />
    </ItemWrapper>
  );
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
    status === "OPEN"
      ? "1px solid #ff5858"
      : "1px solid var(--Foundation-Black-black-7, #8C8C8C)"};
  color: ${({ status }) =>
    status === "OPEN" ? "#e05e5e" : "var(--Foundation-Black-black-7, #8C8C8C)"};
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  align-self: stretch;
`;
