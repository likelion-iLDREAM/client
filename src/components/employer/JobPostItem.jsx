import styled from "styled-components";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

export default function JobPostItem({
  id,
  title,
  paymentType,
  location,
  applyMethod,
  expiryDate,
  status,
  createdAt,
  updatedAt,
  employer,
}) {
  const navigate = useNavigate();

  const handleViewApplicants = () => {
    navigate("seekerlist/seekerlist");
    // navigate("seekerlist/${job.id}")
  };
  const { id: employerId, name, companyName, companyLocation } = employer;
  const parts = location.split(" ");
  const dong = parts.find((part) => part.endsWith("동"));
  const today = new Date();
  const expiryDate2 = new Date(expiryDate);
  const diffMs = expiryDate2.getTime() - today.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  const ddayStr =
    diffDays > 0
      ? `D-${diffDays}`
      : diffDays == 0
      ? "D-day"
      : `D+${Math.abs(diffDays)}`;
  const yyyy = expiryDate2.getFullYear();
  const mm = String(expiryDate2.getMonth() + 1).padStart(2, "0");
  const dd = String(expiryDate2.getDate()).padStart(2, "0");
  const hh = String(expiryDate2.getHours()).padStart(2, "0");
  const mi = String(expiryDate2.getMinutes()).padStart(2, "0");

  return (
    <ItemWrapper>
      <TextWrapper>
        <Information>
          <div>{companyName}</div>
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
              🛒판매
            </Filter>
            <span>
              [{dong}] {title}
            </span>
          </div>
          <div>{location}</div>
          <div>
            ~{yyyy}.{mm}.{dd} {hh}:{mi} 마감
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
            {status === "OPEN" ? "채용중" : "채용마감"}
          </Filter>
        </div>
      </TextWrapper>
      <Button text="지원자 확인하기" onClick={handleViewApplicants} />
    </ItemWrapper>
  );
}
// {
// 	    "id": 1,
// 		  "title": "주 3일 카페 서빙 직원 모집",
// 		  "paymentType": "HOURLY",
// 		  "location": "서울 마포구 합정동 123-45",
// 		  "applyMethod": ["QUICK"],
// 		  "expiryDate": "2025-09-30T15:00:00Z",
// 		  "status": "OPEN",                         // OPEN | CLOSED
// 		  "createdAt": "2025-08-13T07:00:00Z",
// 		  "updatedAt": "2025-08-13T07:00:00Z",
// 		  "employer": {
// 		    "id": 44,
// 		    "name": "김사장",
// 		    "companyName": "해피카페",
// 		    "companyLocation": "서울 마포구 합정동 123-45"
// 			 }
// 	  },

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
  min-width: auto; /* 또는 width: auto; */
  box-sizing: border-box; /* 패딩 포함 */
  text-align: center;
  border-radius: 10px;
  font-size: 15px;
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
