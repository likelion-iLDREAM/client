// pages/seeker/profile/ProfileSeekerEdit.jsx
import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import Enter from "../../../components/common/Enter";
import { Icons } from "../../../components/icons/index";
import styled from "styled-components";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileSeekerEdit() {
  const navigate = useNavigate();

  const [name] = useState(() =>
    (sessionStorage.getItem("signup.name") || "").trim()
  );
  const [birth] = useState(() => sessionStorage.getItem("signup.birth") || "");
  const [gender] = useState(
    () => sessionStorage.getItem("signup.gender") || ""
  );
  const [address, setAddress] = useState(
    () => sessionStorage.getItem("signup.address") || ""
  );

  // 상세 주소 불러오기/동기화
  const [addressDetail, setAddressDetail] = useState(
    () => sessionStorage.getItem("signup.addressDetail") || ""
  );

  const [gus, setGus] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("signup.gus") || "[]");
    } catch {
      return [];
    }
  });
  const interests = useMemo(() => {
    try {
      return JSON.parse(sessionStorage.getItem("signup.interests") || "[]");
    } catch {
      return [];
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("signup.address", address);
  }, [address]);

  useEffect(() => {
    sessionStorage.setItem("signup.gus", JSON.stringify(gus));
  }, [gus]);

  // 상세주소 세션 저장
  useEffect(() => {
    sessionStorage.setItem("signup.addressDetail", addressDetail);
  }, [addressDetail]);

  const handleSave = () => {
    sessionStorage.setItem("signup.address", address);
    sessionStorage.setItem("signup.addressDetail", addressDetail);
    sessionStorage.setItem("signup.gus", JSON.stringify(gus));
    // interests는 하위 Section에서 이미 sessionStorage에 동기화됨
    navigate("/homeseeker/profile");
  };

  return (
    <>
      <Header text="내 정보 수정" />
      <ProfileWrapper>
        <ProfileImage>
          <IoPersonCircleOutline
            color="var(--Foundation-Green-Normal)"
            size={55}
          />
        </ProfileImage>
        <SmallButton>내 사진 변경하기</SmallButton>

        <ContentWrapper>
          <SubWrapper style={{ fontWeight: "700" }}>{"기업명"}</SubWrapper>
          <SubWrapper>
            관심분야
            {interests.length > 0 && (
              <div style={{ fontWeight: 400, marginTop: 6, fontSize: 16 }}>
                {interests.join(", ")}
              </div>
            )}
          </SubWrapper>
        </ContentWrapper>
      </ProfileWrapper>
      <Menu>
        <Submenu>
          이름
          <span>{name || "홍길동"}</span>
        </Submenu>
        <Submenu>
          생년월일
          <span>{birth || "YYYY.MM.DD"}</span>
        </Submenu>
        <Submenu>
          성별
          <span>{gender || "성별"}</span>
        </Submenu>
        <Submenu>
          주소
          <InputWrapper>
            <Inputaddress>{address || "주소를 입력해주세요"}</Inputaddress>
            <Icons.Map
              color="var(--Foundation-Green-Normal)"
              size={24}
              cursor={"pointer"}
              onClick={() => console.log("주소버튼")}
            />
          </InputWrapper>
          {/* 상세 주소를 Address.jsx에서 가져온 값으로 표시/편집 */}
          <Inputtitle
            placeholder={"상세 주소를 입력해주세요"}
            value={addressDetail}
            onChange={(e) => setAddressDetail(e.target.value)}
          />
        </Submenu>
        <Submenu>
          <Section2 onChange={(next) => setGus(next)} initial={gus} />
        </Submenu>
        <Submenu>
          <Section />
        </Submenu>
      </Menu>
      <Footer>
        <Button text="저장하기" type="White" onClick={handleSave} />
      </Footer>
    </>
  );
}

const ProfileWrapper = styled.div`
  display: flex;
  width: 360px;
  padding: 20px 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid #bfbfbf;
`;

const ProfileImage = styled(IoPersonCircleOutline)`
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  fill: var(--Foundation-Green-Normal, #2baf66);
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 220px;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const SubWrapper = styled.div`
  display: flex;
  width: 220px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  align-self: stretch;
  color: #000;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
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
`;

const Text = styled.div``;

const Menu = styled.div`
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  flex: 1 0 0;
`;

const InputWrapper = styled.div`
  display: flex;
  padding: 7px;
  gap: 10px;
  border-radius: 7px;
  border: 1px solid var(--Foundation-Black-black-6, #bfbfbf);
  background: var(--Foundation-surface-White, #fff);
  width: 100%;
  box-sizing: border-box;
  height: 46px;
  align-items: center;
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
  width: 100%;
  box-sizing: border-box;
  align-self: stretch;
  color: var(--Foundation-Black-black-7, #8c8c8c);
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  align-items: center;
`;

const Inputaddress = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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

const Footer = styled.div`
  background-color: White;
  display: flex;
  padding: 10px 0;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

// 구직분야 (프로필에서도 세션과 동기화)
function Section() {
  const rows = [
    [
      { id: 1, label: "농사·원예·어업" },
      { id: 2, label: "운전·배달" },
    ],
    [
      { id: 3, label: "식품·옷·환경 가공" },
      { id: 4, label: "사무·금융" },
    ],
    [
      { id: 5, label: "판매" },
      { id: 6, label: "돌봄" },
      { id: 7, label: "청소·미화" },
    ],
    [
      { id: 8, label: "음식·서비스" },
      { id: 9, label: "목공·공예·제조" },
    ],
    [
      { id: 10, label: "문화·연구·기술" },
      { id: 11, label: "건설·시설 관리" },
    ],
    [
      { id: 12, label: "전기·전자 수리" },
      { id: 13, label: "기계·금속 제작·수리" },
    ],
  ];
  const idToLabel = {};
  rows.flat().forEach((o) => (idToLabel[o.id] = o.label));

  const [selected, setSelected] = useState(() => {
    try {
      return new Set(
        JSON.parse(sessionStorage.getItem("signup.interestIds") || "[]")
      );
    } catch {
      return new Set();
    }
  });

  const toggle = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (next.size >= 3) return next;
        next.add(id);
      }
      return next;
    });
  };

  useEffect(() => {
    const ids = Array.from(selected);
    const labels = ids.map((id) => idToLabel[id]).filter(Boolean);
    sessionStorage.setItem("signup.interestIds", JSON.stringify(ids));
    sessionStorage.setItem("signup.interests", JSON.stringify(labels));
  }, [selected]);

  return (
    <SectionContainer>
      <p className="p">구직분야</p>

      {rows.map((row, i) => (
        <div className="group" key={i}>
          {row.map((opt) => (
            <IntButton
              key={opt.id}
              text={opt.label}
              selected={selected.has(opt.id)}
              onClick={() => toggle(opt.id)}
            />
          ))}
        </div>
      ))}

      <div className="helper">{selected.size} / 3 선택됨</div>
    </SectionContainer>
  );
}

const SectionContainer = styled.div`
  padding-top: 30px;
  padding-bottom: 100px;
  width: 300px;

  > .p {
    color: #000;
    font-size: 20px;
    font-weight: 700;
    margin: 0;
  }
  > .group {
    display: flex;
    gap: 10px;
  }
  .helper {
    font-weight: 400;
    margin-top: 8px;
    font-size: 20px;
    color: var(--Foundation-Black-black-7, #8c8c8c);
  }
`;

function IntButton({ onClick, text, selected }) {
  return (
    <IntButtonContainer>
      <button
        type="button"
        aria-pressed={selected}
        onClick={onClick}
        className={`IntButton ${selected ? "IntButton_Select" : ""}`}
      >
        {text}
      </button>
    </IntButtonContainer>
  );
}

const IntButtonContainer = styled.div`
  margin-top: 10px;

  > .IntButton {
    display: flex;
    height: 44px;
    padding: 5px 10px;
    align-items: center;
    border-radius: 7px;
    border: 1.3px solid var(--Foundation-Green-Darker, #0f3d24);
    background-color: #fff;
    color: var(--Foundation-Black-black-13, #000);
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0.2px;
    cursor: pointer;
  }

  > .IntButton_Select {
    background-color: var(--Foundation-Green-Light, #eaf7f0);
    border-color: var(--Foundation-Green-Normal, #2baf66);
    color: var(--Foundation-Green-Darker, #0f3d24);
  }
`;

// 희망 근무지 (세션과 동기화 + 초기값 반영)
function Section2({ initial = [], onChange }) {
  const [guSelect, setGuSelect] = useState("");
  const [selectedGus, setSelectedGus] = useState(initial || []);

  useEffect(() => {
    onChange && onChange(selectedGus);
    sessionStorage.setItem("signup.gus", JSON.stringify(selectedGus));
  }, [selectedGus, onChange]);

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
    <SectionContainer2>
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
    </SectionContainer2>
  );
}

const SectionContainer2 = styled.div`
  .wishTitle {
    color: #000;
    font-size: 20px;
    font-weight: 700;
  }

  .selectors {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    display: flex;
    gap: 8px;
    align-items: center;
  }

  button {
    margin: 0;
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
    padding: 5px 34px 5px 12px;
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
