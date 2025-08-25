import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import Enter from "../../../components/common/Enter";
import ProgressBar from "../../../components/common/Progressbar";
import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Alert_post from "../../../components/employer/Alert_post";
import { BiSolidMap } from "react-icons/bi";

const paymentOptions = [
  { label: "시급", value: "HOURLY" },
  { label: "월급", value: "MONTHLY" },
  { label: "일급", value: "DAILY" },
  { label: "건당", value: "PER_TASK" },
];
const extractGu = (location) => {
  if (!location) return "";

  // 주소에서 '구' 단위만 추출
  // 예: '서울특별시 서대문구 연희동 여니' -> '서대문구'
  // 단, '중구'는 예외 처리하여 '중구' 그대로 반환

  // '구'가 붙은 단어 찾기
  const guMatch = location.match(/(\S+구)/);
  if (!guMatch) return "";

  const gu = guMatch[1];
  if (gu === "중구") {
    return gu; // 중구는 그대로
  }

  // '구'를 뺀 나머지 부분 (예: '서대문')
  return gu.replace("구", "");
};

export default function PayLocation() {
  const navigate = useNavigate();
  const location = useLocation();
  const prevState = location.state || {};
  console.log("prevState입니다. ", prevState);

  const minPayment = 10030;

  const handleNext = () => {
    const workPlace = extractGu(workPlaceAddress);
    const fullLocation = workPlaceDetail
      ? `${workPlaceAddress} ${workPlaceDetail}`
      : workPlaceAddress;
    console.log(workPlace);
    navigate("/employer/postjobs/requirementtype", {
      state: {
        ...prevState, // 이전 단계에서 넘겨온 누적 state
        paymentType, // 현재 선택한 급여 종류
        payment: Number(payInput) || Number(minPayment), // 숫자로 변환한 금액
        location: fullLocation, // 근무지 주소
        workPlace,
      },
    });
  };

  const [paymentType, setPaymentType] = useState(paymentOptions[0].label);
  const [payInput, setPayInput] = useState("");
  const formatNumberWithComma = (value) => {
    if (!value) return "";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const [workPlaceAddress, setWorkPlaceAddress] = useState("");
  const [workPlaceDetail, setWorkPlaceDetail] = useState("");

  const [backAlertOpen, setBackAlertOpen] = useState(false);

  const handleInputChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, "").replace(/[^0-9]/g, "");
    setPayInput(rawValue);
  };
  const handleChange = (field, value) => {
    if (field === "address") {
      setWorkPlaceAddress(value);
    } else if (field === "addressDetail") {
      setWorkPlaceDetail(value);
    }
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
                  <option key={option.value} value={option.label}>
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
              2025년 최저시급은 {formatNumberWithComma(minPayment)}원입니다.
            </div>
          </Tag>
          <Section
            address={workPlaceAddress}
            addressDetail={workPlaceDetail}
            onAddressChange={(addr) => handleChange("address", addr)}
            onAddressDetailChange={(detail) =>
              handleChange("addressDetail", detail)
            }
          />
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
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid #d9d9d9;
  padding: 10px;
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

function Section({
  address,
  addressDetail,
  onAddressChange,
  onAddressDetailChange,
}) {
  const sectionInfoRef = useRef(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSelect = (addr) => {
    onAddressChange(addr);
    setIsSearchOpen(false);
  };

  const SEOUL_GU = [
    "강남구",
    "강동구",
    "강북구",
    "강서구",
    "관악구",
    "광진구",
    "구로구",
    "금천구",
    "노원구",
    "도봉구",
    "동대문구",
    "동작구",
    "마포구",
    "서대문구",
    "서초구",
    "성동구",
    "성북구",
    "송파구",
    "양천구",
    "영등포구",
    "용산구",
    "은평구",
    "종로구",
    "중구",
    "중랑구",
  ];

  useEffect(() => {
    const root = sectionInfoRef.current;
    if (!root) return;
    const icon = root.querySelector("svg");
    if (!icon) return;
    icon.style.cursor = "pointer";
    const open = () => setIsSearchOpen(true);
    icon.addEventListener("click", open);
    return () => icon.removeEventListener("click", open);
  }, []);

  return (
    <SectionContainer>
      <p className="p">근무지</p>

      <SectionInfo ref={sectionInfoRef}>
        {/* 대표주소 입력 필드, 읽기 전용 또는 클릭 시 주소검색 */}
        <Enter text={address || "아이콘으로 주소 검색하기"} readOnly />
        <BiSolidMap />

        {/* 상세주소 입력 필드 (수정 가능) */}
        <Inputtitle
          type="text"
          placeholder="상세 주소를 입력해주세요"
          value={addressDetail}
          onChange={(e) => onAddressDetailChange(e.target.value)}
        />
      </SectionInfo>

      <p className="limit">아직은 서울특별시에서만 이용 가능해요.🥺</p>

      {isSearchOpen && (
        <AddressSearchModal
          onClose={() => setIsSearchOpen(false)}
          onSelect={handleSelect}
        />
      )}
    </SectionContainer>
  );
}

const SectionInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;

  > svg {
    position: absolute;
    right: 14px;
    top: 20px;
    width: 24px;
    height: 24px;
    color: #2fa96b;
  }
`;

const SectionContainer = styled.div`
  > .p {
    color: #000;
    font-size: 20px;
    font-weight: 700;
    margin: 0;
  }

  .limit {
    margin: 8px 2px 0 2px;
    color: #de4b4b;
    font-size: 15px;
  }

  .wishTitle {
    margin-top: 30px;
    color: #000;
    font-size: 20px;
    font-weight: 400;
  }

  .selectors {
    margin-top: 10px;
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .sido {
    padding: 5px 10px;
    border-radius: 8px;
    border: none;
    background: #e9e9e9;
    color: #9f9f9f;
    font-size: 20px;
  }

  .selectWrap {
    position: relative;
    display: inline-flex;
    align-items: center;
  }

  .selectWrap select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding: 5px 35px 5px 12px;
    border-radius: 8px;
    border: 1px solid #bfbfbf;
    background: #fff;
    font-size: 20px;
    color: #333;
    min-width: 120px;
  }

  .selectWrap .caret {
    position: absolute;
    right: 10px;
    pointer-events: none;
    font-size: 20px;
    color: #6e6e6e;
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 10px;
    border-radius: 8px;
    background: #eaf7f0;
    color: #0f3d24;
    font-size: 20px;
    border: 1px solid rgba(0, 0, 0, 0.06);
  }

  .chipX {
    border: none;
    background: transparent;
    font-size: 14px;
    line-height: 1;
    color: #5b6b62;
    cursor: pointer;
  }
`;

function AddressSearchModal({ onClose, onSelect }) {
  const [q, setQ] = useState("");
  const SAMPLES = [
    "서울특별시 마포구 연남동",
    "서울특별시 서대문구 연희동",
    "서울특별시 중구 을지로1가",
    "서울특별시 용산구 이태원동",
    "서울특별시 강남구 역삼동",
  ];
  const list = SAMPLES.filter((s) => s.includes(q));

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <div className="head">주소 검색</div>
        <input
          className="search"
          placeholder="도로명 또는 동 이름으로 검색"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="list">
          {list.map((addr) => (
            <button key={addr} className="row" onClick={() => onSelect(addr)}>
              {addr}
            </button>
          ))}
          {list.length === 0 && (
            <div className="empty">검색 결과가 없어요.</div>
          )}
        </div>
        <div className="actions">
          <button className="cancel" onClick={onClose}>
            닫기
          </button>
        </div>
      </ModalBox>
    </ModalBackdrop>
  );
}

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(20, 20, 20, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 40;
`;

const ModalBox = styled.div`
  width: 92%;
  max-width: 420px;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);

  .head {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 12px;
  }

  .search {
    width: 100%;
    height: 42px;
    border-radius: 8px;
    border: 1px solid #bfbfbf;
    padding: 0 12px;
    font-size: 14px;
    box-sizing: border-box;
  }

  .list {
    margin-top: 10px;
    max-height: 220px;
    overflow-y: auto;
    border: 1px solid #efefef;
    border-radius: 8px;
  }

  .row {
    width: 100%;
    text-align: left;
    padding: 10px 12px;
    background: #fff;
    border: none;
    border-bottom: 1px solid #f4f4f4;
    font-size: 14px;
    cursor: pointer;
  }
  .row:last-child {
    border-bottom: none;
  }
  .row:hover {
    background: #f7f7f7;
  }

  .empty {
    padding: 14px;
    color: #777;
    font-size: 13px;
    text-align: center;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 12px;
  }
  .cancel {
    border: none;
    background: #e9e9e9;
    color: #333;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 13px;
  }
`;
