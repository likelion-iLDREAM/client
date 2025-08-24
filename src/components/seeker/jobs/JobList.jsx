import styled from "styled-components";
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import Alert from "../quickapply/Alert";
import { useNavigate } from "react-router-dom";

export default function JobList({
  JobPostId,
  companyName = "구인업체명",
  workPlace,
  title = "[지역] 구인공고명",
  location = "주소 정보 없음",
  applyMethods = [], // ["간편지원","전화지원"]
  expiryDate,
  jobField,
  status,
}) {
  const navigate = useNavigate();
  const [callAlertOpen, setCallAlertOpen] = useState(false);

  const labels = Array.isArray(applyMethods) ? applyMethods : [];
  const canQuick = labels.includes("간편지원");
  const canPhone = labels.includes("전화지원");

  const addr = workPlace || location || "주소 정보 없음";

  return (
    <RecommendContainer>
      <div>
        <Section12>
          <div className="Section1">
            <div className="Text1">{companyName}</div>
            <div className="Title">{title}</div>
            <div className="Address">{addr}</div>
          </div>
          <Arrow
            onClick={() => navigate(`/homeseeker/jobsdetail/${JobPostId}`)}
          />
        </Section12>

        <Section3>
          {expiryDate && <div className="Tag">~채용시마감</div>}
          {canQuick && <div className="Tag">간편지원</div>}
          {canPhone && <div className="Tag">전화지원</div>}
          {jobField && <div className="Tag">{jobField}</div>}
          {status && <div className="Tag">{status}</div>}
        </Section3>
      </div>

      <div>
        <div className="Tip"></div>
        <Apply>
          {canPhone && (
            <button className="Call" onClick={() => setCallAlertOpen(true)}>
              전화 지원
            </button>
          )}
          {canQuick && (
            <button
              className="Simple"
              onClick={() => navigate("/homeseeker/quickapply")}
            >
              간편 지원
            </button>
          )}
        </Apply>
      </div>

      <Alert
        open={callAlertOpen}
        companyName={companyName}
        onConfirm={() => setCallAlertOpen(false)}
        onCancel={() => setCallAlertOpen(false)}
        onClose={() => setCallAlertOpen(false)}
      />
    </RecommendContainer>
  );
}

const Apply = styled.div`
  display: flex;
  padding: 10px;
  margin: 5px 0 5px 0;
  gap: 10px;

  > .Call {
    background-color: white;
    cursor: pointer;
    border: none;
    border-radius: 7px;
    border: 1px solid var(--Foundation-Green-Normal);
    padding: 10px 20px;
    text-wrap: nowrap;
    color: var(--Foundation-Green-Normal);
    display: flex;
    width: 140px;
    height: 45px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-weight: 700;
    font-size: 20px;
  }
  > .Simple {
    background-color: var(--Foundation-Green-Normal);
    cursor: pointer;
    border: none;
    border-radius: 7px;
    padding: 10px 20px;
    text-wrap: nowrap;
    color: white;
    display: flex;
    width: 140px;
    height: 45px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-weight: 700;
    font-size: 20px;
  }
`;

const Section3 = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 15px 10px 0 10px;
  margin-bottom: 5px;

  > .Tag {
    padding: 0 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 31px;
    background-color: #fff;
    border-radius: 8px;
    white-space: nowrap;
  }
`;

const Arrow = styled(IoIosArrowForward)`
  display: flex;
  align-items: flex-start;
  gap: 5px;
  align-self: stretch;
  width: 25px;
  height: 25px;
  margin-top: 10px;
  cursor: pointer;
`;

const Section12 = styled.div`
  display: flex;
  align-items: baseline;

  > .Section1 {
    display: flex;
    padding: 0 10px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    flex: 1 0 0;
    margin-top: 10px;
  }
  > .Section1 > .Text1 {
    font-size: 18px;
  }
  > .Section1 > .Title {
    font-weight: 700;
    font-size: 25px;
  }
  > .Section1 > .Address {
    font-size: 18px;
  }
`;

const RecommendContainer = styled.div`
  width: 330px;
  min-height: 228px;
  background-color: var(--Foundation-Green-Light, #eaf7f0);
  border-radius: 8px;
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .Tip {
    margin: 0;
    font-size: 15px;
  }
  .Tip p {
    margin: 2px 0;
  }
`;
