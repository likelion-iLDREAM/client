import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import styled from "styled-components";
import { Icons } from "../../../components/icons/index";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const mockData = {
  applicationId: 2,
  jobPostId: 2,
  workerId: 1,
  status: "임시저장",
  submissionTime: "2025-08-23T21:05:05.084545",
  applyMethod: "간편지원",
  workerName: "이현서",
  workerBirthDate: "2025-08-22",
  workerGender: "여성",
  workerPhoneNumber: "+821012345678",
  workerAddress: "서강대학교",
  answers: [
    {
      questionId: 2,
      text: "이것은 답변입니다",
      optionIds: null,
    },
    {
      questionId: 1,
      text: "이것은 답변입니다",
      optionIds: null,
    },
  ],
  question: [
    {
      id: 1,
      text: "이름이뭐에요",
      type: "예/아니요",
      options: ["ㅇㅖ", "아니요"],
    },
    {
      id: 2,
      text: "전화번호뭐에요",
      type: "서술형",
      options: [],
    },
  ],
};
const mockApplicationData = {
  applicationId: 2,
  workerName: "홍길동",
  workerBirthDate: "1970-01-20",
  workerGender: "남성",
  workerPhoneNumber: "010-2345-6789",
  workerAddress: "서울특별시 00구 00동 00로",
};

const mockWorkContractData = {
  id: 1,
  workerId: 1,
  isWorking: true,
  jobTitle: "근로 제목",
  workPlace: "마포",
  contractUrl: null,
  contractCore: null,
};

export default function WriteContract() {
  const location = useLocation();
  const navigate = useNavigate();
  const { applicationId, buttonText } = location.state || {};

  const isWriteMode = buttonText === "계약서 작성하기";
  const headerTitle = isWriteMode ? "계약서 작성" : "계약서";
  const contentText = isWriteMode ? (
    <>
      해당 지원자의
      <br />
      근로계약서를 추가할까요?
    </>
  ) : (
    <>
      해당 지원자의 <br />
      근로계약서입니다.
    </>
  );

  const footerButtonText = isWriteMode ? "계약서 전달하기" : "확인";
  const [applicationData, setApplicationData] = useState(mockApplicationData);
  const [workContractData, setWorkContractData] =
    useState(mockWorkContractData);
  // 실제 API 호출 예시 (주석 처리)
  /*
  useEffect(() => {
    if (!applicationId) return;
    fetch(`/api/applications/${applicationId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setApplicationData(data.data);
      })
      .catch(console.error);

    fetch(`/api/workContracts/${applicationId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setWorkContractData(data.data);
      })
      .catch(console.error);
  }, [applicationId]);
  */
  const handleBack = () => {
    navigate(-1);
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  // 버튼 텍스트를 상태로 관리
  const [footerBtnText, setFooterBtnText] = useState(footerButtonText);

  const handleFooterButtonClick = () => {
    if (isWriteMode & (footerBtnText === "계약서 전달하기")) {
      alert("계약서를 전달했습니다.");
      setFooterBtnText("확인");
    } else {
      navigate("/employer/seekerlist/seekerlist");
    }
  };
  return (
    <>
      <Headersection>
        <Header text={headerTitle} showBack onBack={handleBack} />
      </Headersection>
      <Menu>
        <div className="title">{contentText}</div>
        <Submenu>
          이름
          <span>{applicationData.workerName}</span>
          생년월일
          <span>{formatDate(applicationData.workerBirthDate)}</span>
          성별
          <span>{applicationData.workerGender}</span>
          전화번호
          <span>{applicationData.workerPhoneNumber}</span>
          주소
          <span>{applicationData.workerAddress}</span>
          <div style={{ marginTop: "10px", fontWeight: "700" }}>근로계약서</div>
          <div>
            {workContractData.contractCore ||
              (isWriteMode
                ? "첨부된 계약서가 없습니다."
                : "계약서가 없습니다.")}
          </div>
        </Submenu>
        {isWriteMode && (
          <Submenu>
            근로계약서 첨부하기
            <div className="addfile">
              추가할 이력서를 여기에 끌어다 놓거나, <br />
              파일 선택 버튼을 선택해주세요.
              <SmallButton>
                <Icons.Upload />
                파일선택
              </SmallButton>
            </div>
          </Submenu>
        )}
      </Menu>
      <Footer>
        <Button
          text={footerBtnText}
          type="White"
          onClick={handleFooterButtonClick}
        />
      </Footer>
    </>
  );
}

const Headersection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--Foundation-Black-black-5, #d9d9d9);
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid #d9d9d9;
  padding: 10px;
`;

const Menu = styled.div`
  display: flex;
  width: 360px;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  flex: 1 0 0;

  .title {
    align-self: stretch;
    color: #000;
    font-family: "Pretendard Variable";
    font-size: 25px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

const Submenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  span {
    font-weight: 400;
  }

  .alert {
    color: #ff5858;
    font-size: 15px;
  }

  .addfile {
    display: flex;
    padding: 15px 10px;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border-radius: 10px;
    border: 1px dashed var(--Foundation-Green-Normal, #2baf66);
    color: #000;
    text-align: center;
    font-family: "Pretendard Variable";
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
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
