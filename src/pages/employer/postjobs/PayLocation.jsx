import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import Enter from "../../../components/common/Enter";
import ProgressBar from "../../../components/common/Progressbar";
import styled from "styled-components";
import { Icons } from "../../../components/icons/index";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import Alert_post from "../../../components/employer/Alert_post";

const paymentOptions = [
  { label: "시급", value: "HOURLY" },
  { label: "월급", value: "MONTHLY" },
  { label: "일급", value: "DAILY" },
  { label: "건별", value: "PER_TASK" },
];

export default function PayLocation() {
  const navigate = useNavigate();
  const handleNext = () => {
    navigate("../RequirementType");
  };
  const [paymentType, setPaymentType] = useState(paymentOptions[0].value);
  const [payInput, setPayInput] = useState("");
  const formatNumberWithComma = (value) => {
    if (!value) return "";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const [backAlertOpen, setBackAlertOpen] = useState(false);

  const handleInputChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, "").replace(/[^0-9]/g, "");
    setPayInput(rawValue);
  };
  return (
    <>
      <Headersection>
        <HeaderContainer>
          <BackButton
            type="button"
            aria-label="뒤로가기"
            onClick={() => setBackAlertOpen(true)}
          >
            <IoIosArrowBack />
          </BackButton>
          {"새 공고"}
        </HeaderContainer>
      </Headersection>
      <Alert_post
        open={backAlertOpen}
        onConfirm={() => {
          setBackAlertOpen(false);
        }}
        onCancel={() => setBackAlertOpen(false)}
        onClose={() => setBackAlertOpen(false)}
      />
      <ApplyWrapper>
        <ProgressBar value={"37.5"} max={"100"} />
        <Question>
          급여와 <br /> 근무예정지를 <br /> 알려주세요.
        </Question>
        <OptionsWrapper>
          <Tag>
            <p>급여</p>
            <PayWrapper>
              <PaymentType
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
              >
                {paymentOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </PaymentType>
              <Inputtitle
                placeholder="10,030"
                style={{ textAlign: "right" }}
                value={formatNumberWithComma(payInput)}
                onChange={handleInputChange}
              />
              원
            </PayWrapper>
            <div style={{ fontSize: "15px" }}>
              {" "}
              2025년 최저시급은 10,030원입니다.
            </div>
          </Tag>

          <Tag>
            <p>근무지</p>
            <InputWrapper>
              <Inputaddress placeholder="주소 입력" />
              <Icons.Map color="var(--Foundation-Green-Normal)" size={24} />
            </InputWrapper>
            <Enter text="상세주소" />
          </Tag>
        </OptionsWrapper>
      </ApplyWrapper>
      <Footer>
        <Button text="다음" type="White" onClick={handleNext} />
      </Footer>
    </>
  );
}
const Tag = styled.div`
  p {
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 8px 0;
  }
`;
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
  background-color: White;
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const SubWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 20px;
  flex: 1;
  width: 100%; /* 화면 너비(부모) 100%로 채움 */
  box-sizing: border-box; /* 패딩/보더 포함 너비 계산 */
`;

const PaymentType = styled.select`
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

const PayWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
`;

const InputWrapper = styled.div`
  padding: 0 10px;
  display: flex;
  width: 80%;
  height: 44px;
  justify-content: flex-start; /* 왼쪽 정렬 */
  align-items: center;
  border-radius: 7px;
  border: 1px solid #bfbfbf;
  background-color: #fff;
  margin-top: 10px;

  > input {
    border: none;
    font-size: 20px;
    font-weight: 400;
    flex: 1; /* 남은 공간 차지 */
    min-width: 0; /* 줄어들 수 있음 */
    outline: none;
  }

  > svg {
    flex-shrink: 0; /* 축소 방지 */
    margin-left: 10px; /* input과 아이콘 사이 여백 */
  }
`;

const Inputtitle = styled.input`
  border-radius: 7px;
  background: var(--Foundation-surface-White, #fff);
  font-size: 1rem;
  border: 1px solid var(--Foundation-Black-black-6, #bfbfbf);
  padding: 10px;
  outline: none;
  flex: 1;
  display: flex;
`;

const Inputaddress = styled.input`
  border-radius: 7px;
  background: var(--Foundation-surface-White, #fff);
  font-size: 1rem;
  border: none;
  outline: none;
  flex: 1;
`;
