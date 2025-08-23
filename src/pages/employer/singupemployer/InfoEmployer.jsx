import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import Enter from "../../../components/common/Enter";
import ProgressBar from "../../../components/common/Progressbar";
import styled from "styled-components";
import { BiSolidMap } from "react-icons/bi";
import { Icons } from "../../../components/icons/index";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function InfoEmployer() {
  const navigate = useNavigate();

  // 상태값 선언
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bossName: "",
    phoneNumber: "",
    companyName: "",
    companyLocation: "",
    companyNumber: "",
    jobFields: [],
  });
  // 변경 핸들러
  const handleChange = (key, value) => {
    console.log(value);
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const handleNext = () => {
    console.log(formData, "formData입니다!!");
    navigate("/signupemployer/hiringfields", { state: formData });
  };

  return (
    <>
      <Header text="새공고" />
      <ApplyWrapper>
        <ProgressBar value={"25"} max={"100"} />
        <Question>
          기업 정보를 <br />
          입력해 주세요
        </Question>
        <OptionsWrapper>
          <SubWrapper>
            이름
            <Enter
              text="이름을 입력해주세요"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </SubWrapper>
          <SubWrapper>
            전화번호
            <EnterWrapper>
              <input
                readOnly
                placeholder={formData.phoneNumber}
                value={formData.phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
              />
            </EnterWrapper>
          </SubWrapper>
          <SubWrapper>
            이메일
            <Enter
              text="이메일을 입력해주세요"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </SubWrapper>
          <SubWrapper>
            대표자명
            <Enter
              text="대표자명을 입력해주세요"
              value={formData.bossName}
              onChange={(e) => handleChange("bossName", e.target.value)}
            />
          </SubWrapper>
          <SubWrapper>
            기업명
            <Enter
              text="회사명을 입력해주세요"
              value={formData.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
            />
          </SubWrapper>
          <Section
            address={formData.companyLocation}
            onAddressChange={(addr) => handleChange("companyLocation", addr)}
          />

          <SubWrapper>
            사업자 등록번호
            <Enter
              text="예)000-00-0000"
              value={formData.companyNumber}
              onChange={(e) => handleChange("companyNumber", e.target.value)}
            />
          </SubWrapper>
        </OptionsWrapper>
      </ApplyWrapper>
      <Footer>
        <Button text="다음" type="White" onClick={handleNext} />
      </Footer>
    </>
  );
}

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

const SubWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 20px;

  .alert {
    color: #ff5858;
    font-size: 15px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  padding: 7px;
  gap: 10px;
  border-radius: 7px;
  border: 1px solid var(--Foundation-Black-black-6, #bfbfbf);
  background: var(--Foundation-surface-White, #fff);
  width: 100%; /* 화면 너비(부모) 100%로 채움 */
  box-sizing: border-box; /* 패딩/보더 포함 너비 계산 */
  height: 46px;
  align-items: center;
  margin-top: 10px;
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
  width: 100%; /* 화면 너비(부모) 100%로 채움 */
  box-sizing: border-box; /* 패딩/보더 포함 너비 계산 */
  align-self: stretch;
  color: var(--Foundation-Black-black-7, #8c8c8c);
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  align-items: center;
`;

const Inputaddress = styled.div`
  border-radius: 7px;
  background: var(--Foundation-surface-White, #fff);
  font-size: 1rem;
  border: none;
  outline: none;
  flex: 1 0 0;
  align-self: stretch;
  color: var(--Foundation-Black-black-7, #8c8c8c);
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  align-items: center;
  justify-content: center;
`;

const EnterWrapper = styled.div`
  display: flex;
  width: 294px;
  height: 44px;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  border: 1px solid #bfbfbf;
  background: var(--Foundation-Black-black-5, #d9d9d9);
  margin-top: 10px;

  > input {
    border: none;
    font-size: 20px;
    font-weight: 400;
    background: var(--Foundation-Black-black-5, #d9d9d9);
    pointerevent: none;

    &:focus {
      outline: none;
    }
  }
`;

function Section({ address, onAddressChange }) {
  const sectionInfoRef = useRef(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // const [address, setAddress] = useState(
  //   () => sessionStorage.getItem("signup.address") || ""
  // );
  // 주소 변경 시 부모 호출
  const handleSelect = (addr) => {
    // setAddress(addr); // 상태 삭제 후 부모에 전달만
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

  useEffect(() => {
    if (!sectionInfoRef.current) return;
    const inputs = sectionInfoRef.current.querySelectorAll("input");
    if (inputs && inputs[0]) {
      inputs[0].placeholder = address || "아이콘으로 주소 검색하기";
    }
  }, [address]);

  useEffect(() => {
    sessionStorage.setItem("signup.address", address);
  }, [address]);

  return (
    <SectionContainer>
      <p className="p">주소입력</p>

      <SectionInfo ref={sectionInfoRef}>
        <Enter text={"아이콘으로 주소 검색하기"} />
        <BiSolidMap />
        <Enter text={"상세 주소"} />
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
    font-weight: 400;
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
