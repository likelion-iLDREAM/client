import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import Enter from "../../../components/common/Enter";
import JobHistory from "../../../components/employer/JobHistory";
import styled from "styled-components";
import { Icons } from "../../../components/icons/index";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const employerToken = import.meta.env.VITE_EMPLOYER_TOKEN;
const serverUrl = import.meta.env.VITE_ILDREAM_URL;

export default function Resume() {
  const navigate = useNavigate("");
  const location = useLocation();
  const { applicationId, buttonText } = location.state || {};
  const [disabled_button, setDisabled_button] = useState(false);
  console.log("prevdata입니다.", applicationId);
  console.log("button", buttonText);
  // 실제 API 사용 시 아래 fetch 로직 주석 해제 후 사용
  const [applicationData, setApplicationData] = useState([]);

  useEffect(() => {
    if (!applicationId) return;

    async function fetchApplication() {
      try {
        const res = await fetch(`${serverUrl}/applications/${applicationId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: `${employerToken}`,
            // 필요한 경우 인증 헤더 추가
            // "Authorization": `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        setApplicationData(data.data);
        console.log("data...", data);
      } catch (err) {
        alert(err.message);
      }
    }

    fetchApplication();
  }, [applicationId]);
  console.log("applicationData입니다ㅣ", applicationData);
  // 날짜 포맷팅 (예: 생년월일)
  const birthDateFormatted = new Date(
    applicationData.workerBirthDate
  ).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  function formatPhoneNumber(phone) {
    // +82로 시작하는 경우 0으로 시작하도록 변환
    // +821012345678 → 01012345678
    let num = phone?.startsWith("+82") ? "0" + phone.slice(3) : phone;

    // 일반적인 010-1234-5678 형태로 변환
    // 0으로 시작하는 11자리 번호 포맷팅 예제
    const match = num?.match(/^(\d{3})(\d{4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phone; // 포맷에 맞지 않으면 원본 반환
  }

  const handleBack = () => {
    navigate("/employer/seekerlist/seekerlist"); //navigate("/employer/seekerlist/seekerlist/${joblist.id}");
  };
  const savedCategory = "음식,서비스"; // 예: 따로 저장해둔 정보

  const handleViewContract = async (e) => {
    e.stopPropagation();

    try {
      if (
        buttonText === "계약서 작성하기" ||
        buttonText === "계약서 확인하기"
      ) {
        navigate("/employer/seekerlist/writecontract", {
          state: { applicationId, buttonText },
        });
      } else if (buttonText === "전화 면접하기") {
        const phoneNumber = applicationData.workerPhoneNumber || "";

        // 3. 상태 "보류"로 변경 PATCH 요청
        const patchRes = await fetch(
          `${serverUrl}/applications/${applicationId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              token: `${employerToken}`,
            },
            body: JSON.stringify({ newStatus: "보류" }),
          }
        );

        if (!patchRes.ok) throw new Error("상태 변경 실패");
        if (phoneNumber) {
          // 2. 클립보드에 전화번호 복사
          await navigator.clipboard.writeText(
            applicationData.workerPhoneNumber
          );
          alert(
            "전화번호가 복사되었습니다: " + applicationData.workerPhoneNumber
          );
          setDisabled_button(true);
        } else {
          alert("전화번호가 없습니다.");
        }
        // alert("상태가 '보류'로 변경되었습니다.");
      } else if (buttonText === "채용 확정하기") {
        // "채용 확정하기" 버튼 클릭 시 상태를 "승인"으로 변경
        const patchRes = await fetch(
          `${serverUrl}/applications/${applicationId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              token: `${employerToken}`,
            },
            body: JSON.stringify({ newStatus: "승인" }),
          }
        );

        if (!patchRes.ok) throw new Error("상태 변경 실패");

        alert("상태가 '승인'으로 변경되었습니다.");
        setDisabled_button(true);
      }
    } catch (error) {
      alert("작업 중 오류 발생: " + error.message);
    }
  };

  return (
    <>
      <Headersection>
        <HeaderContainer>
          <BackButton type="button" aria-label="뒤로가기" onClick={handleBack}>
            <IoIosArrowBack />
          </BackButton>
          {"지원자 현황"}
        </HeaderContainer>
      </Headersection>
      {/* <Headersection>
        <Header text={"지원자 현황"} showBack />
      </Headersection> */}
      <Menu>
        <Submenu>
          이름
          <span>{applicationData.workerName}</span>
          생년월일
          <span>{birthDateFormatted}</span>
          성별
          <span>{applicationData.workerGender}</span>
          전화번호
          <span>{formatPhoneNumber(applicationData.workerPhoneNumber)}</span>
          주소
          <span>{applicationData.workerAddress}</span>
        </Submenu>
        <Submenu>
          추가질문
          {applicationData.question?.map((q, idx) => {
            const answer = applicationData.answers.find(
              (a) => a.questionId === q.id
            );
            const displayText =
              typeof answer?.optionIds === "string" &&
              answer.optionIds !== "null"
                ? answer.optionIds
                : answer?.text || "";

            return (
              <div className="singlequestion" key={q.id}>
                <span>
                  {idx + 1}. {q.text}
                </span>
                <EnterWrapper>
                  <textarea
                    readOnly
                    placeholder={displayText || q.text || ""}
                  />
                </EnterWrapper>
              </div>
            );
          })}
        </Submenu>
        {/* <Submenu>
          지원자 이력
          <ItemWrapper>
            <JobHistory
              workerId={applicationData.workerId}
              savedCategory={savedCategory}
            />
          </ItemWrapper>
        </Submenu> */}
      </Menu>
      <Footer>
        {buttonText ? (
          <Button
            text={buttonText}
            type="White"
            onClick={handleViewContract}
            disabled={disabled_button}
          ></Button>
        ) : null}
      </Footer>
    </>
  );
}

// 변경: position 추가
const HeaderContainer = styled.div`
  position: relative;
  width: 400px;
  height: 70px;
  background-color: #eaf7f0;
  font-size: 30px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// 추가: 뒤로가기 버튼 스타일
const BackButton = styled.button`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  background: transparent;
  border: 0;
  padding: 10px;
  cursor: pointer;

  svg {
    width: 32px;
    height: 32px;
  }
`;

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

  button {
    display: flex;
    padding: 0 10px;
    align-items: center;
    gap: 10px;
    border-radius: 6px;
    background: var(--Foundation-Green-Light, #eaf7f0);
    border: none;
    align-self: stretch;
    margin-top: 10px;
    cursor: pointer;
  }

  div.singlequestion {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const Menu = styled.div`
  display: flex;
  width: 360px;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  flex: 1 0 0;
`;

const EnterWrapper = styled.div`
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 6px;
  border: 1px solid #000;
  width: 340px;
  // box-sizing: border-box; /* 추가 */

  > textarea {
    flex: 1 0 0; /* 수정: flex-shrink 허용, flex-grow 유지 */
    min-width: 150px; /* 추가: 최소 넓이 지정 */
    color: #000;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border: none;
    resize: none;
    &:focus {
      outline: none;
    }
  }
`;

// const EnterWrapper = styled.div`
//   display: flex;
//   padding: 10px;
//   justify-content: center;
//   align-items: center;
//   gap: 10px;
//   align-self: stretch;
//   border-radius: 6px;
//   border: 1px solid #000;
//   width: 100%;
//   > input {
//     flex: 1 0 0;
//     color: #000;
//     font-family: "Pretendard Variable";
//     font-size: 18px;
//     font-style: normal;
//     font-weight: 400;
//     line-height: normal;
//     border: none;

//     &:focus {
//       outline: none;
//     }
//   }
// `;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  align-self: stretch;
  border-radius: 7px;
  color: #fff;
`;
