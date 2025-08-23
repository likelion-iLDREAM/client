// pages/terms/Address.jsx
import styled from "styled-components";
import Header from "../../../components/common/Header";
import ProgressBar from "../../../components/common/Progressbar";
import Button from "../../../components/common/Button";
import Enter from "../../../components/common/Enter";
import { BiSolidMap } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const HEADER_H = 56; // 헤더 높이
const BOTTOM_H = 90; // 하단 버튼 영역 높이

export default function Address() {
  const navigate = useNavigate();
  return (
    <AddressContainer>
      {/* 헤더 고정 */}
      <HeaderWrap>
        <Header text={"회원가입"} />
      </HeaderWrap>

      <Info>
        <ProgressBar value={"60"} max={"100"} />

        <h2 className="Text1">
          주소와
          <br />
          희망 근무지역을
          <br />
          선택해주세요.
        </h2>
        <Section />
      </Info>

      {/* 하단 버튼 고정 */}
      <div className="Bottom">
        <Button
          text={"다음"}
          type={"White"}
          onClick={() => navigate("/terms/interest")}
        />
      </div>
    </AddressContainer>
  );
}

const Info = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 4dvh;
`;

const AddressContainer = styled.div`
  background-color: #fff;
  width: 400px;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;

  /* 고정된 헤더/하단 버튼에 가려지지 않도록 패딩 확보 */
  padding-top: ${HEADER_H}px;
  padding-bottom: ${BOTTOM_H}px;
  box-sizing: border-box;

  > .Text1 {
    margin-left: 45px;
    margin-right: auto;
    margin-top: 30px;
  }

  /* 하단 버튼 고정 */
  > .Bottom {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    width: 400px;
    height: ${BOTTOM_H}px;
    background: #fff;
    border-top: 1px solid #d9d9d9;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 10px;
    box-sizing: border-box;
    z-index: 50;
  }
`;

/* 헤더 고정 래퍼 */
const HeaderWrap = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  height: ${HEADER_H}px;
  background: #fff;
  z-index: 50;
  display: flex;
  align-items: center;

  > * {
    width: 100%;
  }
`;

function Section() {
  const sectionInfoRef = useRef(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [address, setAddress] = useState(
    () => sessionStorage.getItem("signup.address") || ""
  );

  // 상세주소 상태(세션 동기화)
  const [addressDetail, setAddressDetail] = useState(
    () => sessionStorage.getItem("signup.addressDetail") || ""
  );

  const [guSelect, setGuSelect] = useState("");
  const [selectedGus, setSelectedGus] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("signup.gus") || "[]");
    } catch {
      return [];
    }
  });

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

  // 첫 번째 입력칸(대표주소) placeholder 반영
  useEffect(() => {
    if (!sectionInfoRef.current) return;
    const inputs = sectionInfoRef.current.querySelectorAll("input");
    if (inputs && inputs[0]) {
      inputs[0].placeholder = address || "아이콘으로 주소 검색하기";
    }
  }, [address]);

  // 두 번째 입력칸(상세주소) 값/동기화
  useEffect(() => {
    if (!sectionInfoRef.current) return;
    const inputs = sectionInfoRef.current.querySelectorAll("input");
    const detail = inputs && inputs[1];
    if (!detail) return;

    // 초기값 주입
    if (addressDetail && detail.value !== addressDetail) {
      detail.value = addressDetail;
    }

    const onInput = (e) => {
      const v = e.target.value;
      setAddressDetail(v);
      sessionStorage.setItem("signup.addressDetail", v);
    };
    detail.addEventListener("input", onInput);
    return () => detail.removeEventListener("input", onInput);
  }, [addressDetail]);

  // 세션 저장 (대표 주소 / 희망 근무지)
  useEffect(() => {
    sessionStorage.setItem("signup.address", address);
  }, [address]);

  useEffect(() => {
    sessionStorage.setItem("signup.gus", JSON.stringify(selectedGus));
  }, [selectedGus]);

  const addGu = (gu) => {
    if (!gu) return;
    if (selectedGus.includes(gu)) {
      setGuSelect("");
      return;
    }
    if (selectedGus.length >= 3) {
      setGuSelect("");
      return;
    }
    setSelectedGus((prev) => [...prev, gu]);
    setGuSelect("");
  };

  const removeGu = (gu) => {
    setSelectedGus((prev) => prev.filter((g) => g !== gu));
  };

  return (
    <SectionContainer>
      <p className="p">주소입력</p>

      <SectionInfo ref={sectionInfoRef}>
        <Enter text={"아이콘으로 주소 검색하기"} />
        <BiSolidMap />
        <Enter text={"상세 주소"} />
      </SectionInfo>

      <p className="limit">아직은 서울특별시에서만 이용 가능해요.🥺</p>

      <div className="wishTitle">희망 근무지(최대 3개)</div>
      <div className="selectors">
        <button className="sido" type="button" disabled>
          서울특별시
        </button>

        <div className="selectWrap">
          <select
            value={guSelect}
            onChange={(e) => addGu(e.target.value)}
            disabled={selectedGus.length >= 3}
          >
            <option value="" hidden>
              시/군/구
            </option>
            {SEOUL_GU.map((gu) => (
              <option key={gu} value={gu}>
                {gu}
              </option>
            ))}
          </select>
          <span className="caret">▾</span>
        </div>
      </div>

      <div className="chips">
        {selectedGus.map((gu) => (
          <span className="chip" key={gu}>
            {gu}
            <button className="chipX" onClick={() => removeGu(gu)}>
              ×
            </button>
          </span>
        ))}
      </div>

      {isSearchOpen && (
        <AddressSearchModal
          onClose={() => setIsSearchOpen(false)}
          onSelect={(addr) => {
            setAddress(addr);
            setIsSearchOpen(false);
          }}
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
  padding: 80px 0;
  margin-bottom: 50px;

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
