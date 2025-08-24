import { useEffect, useState } from "react";
import styled from "styled-components";

const mockhistory = [
  {
    id: 2,
    workerId: 1,
    title: "근무이력",
    companyName: "회사이름",
    startDate: "2025-08-11",
    endDate: "2025-08-22",
    workplace: "마포",
    mainDuties: "일한내용",
    isOpening: true,
    jobField: "음식,서비스",
  },
  {
    id: 3,
    workerId: 1,
    title: "22근무이력",
    companyName: "회사이름",
    startDate: "2025-08-11",
    endDate: "2025-10-30",
    workplace: "용산",
    mainDuties: "일한내용",
    isOpening: true,
    jobField: "판매",
  },
];

export default function JobHistory({ workerId, savedCategory = null }) {
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    // 백엔드 연결 예정 (주석)
    /*
    async function fetchHistory() {
      try {
        const res = await fetch(`/api/workers/${workerId}/history`);
        const json = await res.json();
        if (json.success) setHistories(json.data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchHistory();
    */

    // mockdata 필터 (workerId, isOpening)
    setHistories(
      mockhistory.filter((h) => h.workerId === workerId && h.isOpening)
    );
  }, [workerId]);

  return (
    <ItemWrapper>
      {histories.map((history) => {
        const isCategoryMatch = savedCategory
          ? history.jobField === savedCategory
          : false;

        return (
          <TextWrapper key={history.id} isCategoryMatch={isCategoryMatch}>
            <span className="Information">
              <div>{history.companyName}</div>
              <div>
                <span className="title">{history.mainDuties}</span>
              </div>
              <div>
                서울특별시 {history.workplace}구 {history.workplace}로
              </div>
              <div>
                {history.startDate.replace(/-/g, ".")} ~{" "}
                {history.endDate.replace(/-/g, ".")} (
                {getMonthDiff(history.startDate, history.endDate)}개월 이상)
              </div>
            </span>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "5px",
              }}
            >
              <Filter isCategoryMatch={isCategoryMatch}>
                {history.jobField}
              </Filter>
            </div>
          </TextWrapper>
        );
      })}
    </ItemWrapper>
  );
}

function getMonthDiff(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return (
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth()) +
    1
  );
}

/* 스타일 컴포넌트는 이전 그대로 사용 */
const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  align-self: stretch;
  border-radius: 7px;
  color: #fff;
`;

const Filter = styled.div`
  display: flex;
  padding: 2px 5px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  border: ${(props) =>
    props.isCategoryMatch
      ? "1px solid var(--Foundation-Green-Normal, #fff)"
      : "1px solid var(--Foundation-Black-black-13, #000)"};
  // border: 1px solid var(--Foundation-surface-White);
  background: var(--Foundation-Green-Light);
  color: var(--Foundation-Black-black-13, #000);
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.15px;
`;

const TextWrapper = styled.div`
  display: flex;
  padding: 15px 20px;
  align-items: flex-start;
  gap: 5px;
  align-self: stretch;
  border-radius: 8px;
  // background: var(--Foundation-Green-Normal, #2baf66);
  background: ${(props) =>
    props.isCategoryMatch
      ? "var(--Foundation-Green-Normal, #2baf66)"
      : "var(--Foundation-Green-Light, #EAF7F0)"};

  .Information {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px; /* gap 줄임 (기존 10px → 6px) */
    flex: 1 0 0;
    font-weight: 400;

    /* 업체명, 주소, 기간 등 일반 텍스트 */
    > div:not(.title) {
      font-family: "Pretendard Variable";
      font-size: 15px; /* 폰트 사이즈 작게 */
      line-height: normal;
      color: ${(props) =>
        props.isCategoryMatch
          ? "#fff"
          : "var(--Foundation-Black-black-13, #000)"};
    }

    /* 직무 설명 (title 클래스) */
    .title {
      font-weight: 700;
      font-size: 20px; /* 기존 크기 유지 또는 약간 크게 */
      // color: #fff;
    }
  }
`;
