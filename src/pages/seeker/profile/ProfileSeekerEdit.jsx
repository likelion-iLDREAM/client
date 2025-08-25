// pages/seeker/profile/ProfileSeekerEdit.jsx
import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import Enter from "../../../components/common/Enter";
import { Icons } from "../../../components/icons/index";
import styled from "styled-components";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const workerToken = import.meta.env.VITE_WORKER_TOKEN;
const serverUrl = import.meta.env.VITE_ILDREAM_URL;

/** ===== 직군 옵션 (라벨/서버용 값 분리) ===== */
const JOB_OPTIONS = [
  { id: 1, label: "🌱농사·원예·어업", api: "농사,원예,어업" },
  { id: 2, label: "🚚운전·배달", api: "운전,배달" },
  { id: 3, label: "🥬식품·옷·환경 가공", api: "식품,옷,환경 가공" },
  { id: 4, label: "📄사무·금융", api: "사무,금융" },
  { id: 5, label: "🛒판매", api: "판매" },
  { id: 6, label: "❤️돌봄", api: "돌봄" },
  { id: 7, label: "🧹청소·미화", api: "청소,미화" },
  { id: 8, label: "🍲음식·서비스", api: "음식,서비스" },
  { id: 9, label: "🪚목공·공예·제조", api: "목공,공예,제조" },
  { id: 10, label: "🎨문화·연구·기술", api: "문화,연구,기술" },
  { id: 11, label: "🏗️건설·시설 관리", api: "건설,시설 관리" },
  { id: 12, label: "🔌전기·전자 수리", api: "전기,전자 수리" },
  { id: 13, label: "⚙️기계·금속 제작·수리", api: "기계,금속 제작,수리" },
];

// 빠른 탐색용 맵
const idToLabel = Object.fromEntries(JOB_OPTIONS.map((o) => [o.id, o.label]));
const idToApi = Object.fromEntries(JOB_OPTIONS.map((o) => [o.id, o.api]));
const apiToLabel = Object.fromEntries(JOB_OPTIONS.map((o) => [o.api, o.label]));
const labelToId = Object.fromEntries(JOB_OPTIONS.map((o) => [o.label, o.id]));

/** ===== 유틸: UI ⇄ API 변환 ===== */
// (견고해졌지만, 폴백으로 유지)
const stripEmoji = (s = "") =>
  s.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\uFE0F\u200D]/gu, "");
const toApiBirth = (s = "") => s.replaceAll(".", "-"); // "YYYY.MM.DD" → "YYYY-MM-DD"
const toUiBirth = (s = "") => s.replaceAll("-", "."); // "YYYY-MM-DD" → "YYYY.MM.DD"
const uiJobToApiFallback = (s = "") =>
  stripEmoji(s).replace(/\s+/g, "").replace(/·/g, ","); // 라벨만 있는 경우 폴백 변환
const apiBLGToUi = (s = "") => (s.endsWith("구") ? s : `${s}구`); // "마포" → "마포구"
const uiGuToApi = (s = "") => s.replace(/구$/, ""); // "마포구" → "마포"

/** ===== 메인 컴포넌트 ===== */
export default function ProfileSeekerEdit() {
  const navigate = useNavigate();

  /** 서버에서 현재 로그인 사용자 불러오기 */
  useEffect(() => {
    if (!serverUrl || !workerToken) return;

    fetch(`${serverUrl}/workers/me`, {
      method: "GET",
      headers: { token: `${workerToken}` },
      mode: "cors",
    })
      .then(async (res) => {
        const json = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(json?.message || `HTTP_${res.status}`);
        return json;
      })
      .then((data) => {
        console.log("받아온 구직자 정보:", data);
        if (data?.success && data?.data) {
          const me = data.data;

          // 기본 프로필 필드 동기화
          sessionStorage.setItem("signup.name", (me.name || "").trim());
          sessionStorage.setItem("signup.birth", toUiBirth(me.birthday || ""));
          sessionStorage.setItem("signup.gender", me.gender || "");
          sessionStorage.setItem("signup.address", me.residence || "");

          const gusUi = Array.isArray(me.BLG) ? me.BLG.map(apiBLGToUi) : [];
          sessionStorage.setItem("signup.gus", JSON.stringify(gusUi));

          // 서버 jobInterest(api값 배열) → 화면 라벨/서버값 동시 저장
          const apiArr = Array.isArray(me.jobInterest) ? me.jobInterest : [];
          const labelArr = apiArr.map((api) => apiToLabel[api] || api); // 매핑 없으면 그대로 표시
          sessionStorage.setItem("signup.interests", JSON.stringify(labelArr));
          sessionStorage.setItem("signup.interestsApi", JSON.stringify(apiArr));

          // 선택 id도 복원(하나만 표시하는 UI라 첫 번째만)
          const firstLabel = labelArr[0];
          const firstId = firstLabel ? labelToId[firstLabel] || null : null;
          sessionStorage.setItem(
            "signup.interestIds",
            JSON.stringify(firstId ? [firstId] : [])
          );

          // 화면 상태 갱신
          setAddress(me.residence || "");
          setGus(gusUi);
        }
      })
      .catch((err) => console.error("[/workers/me] 실패:", err));
  }, []);

  /** 화면 상태 */
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

  // 상세 주소 불러오기/동기화(서버로는 아직 미전송)
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

  useEffect(() => {
    sessionStorage.setItem("signup.addressDetail", addressDetail);
  }, [addressDetail]);

  /** 저장 (PATCH /workers/me) — 서버용 값 우선 사용 */
  const handleSave = async () => {
    try {
      // 서버용 값(apis) 우선
      let apis = [];
      try {
        apis = JSON.parse(
          sessionStorage.getItem("signup.interestsApi") || "[]"
        );
        if (!Array.isArray(apis)) apis = [];
      } catch {
        apis = [];
      }

      // 폴백: 화면 라벨 → 변환 또는 매핑
      if (apis.length === 0) {
        try {
          const labels = JSON.parse(
            sessionStorage.getItem("signup.interests") || "[]"
          );
          apis = (Array.isArray(labels) ? labels : [])
            .map((label) => {
              const id = labelToId[label];
              if (id && idToApi[id]) return idToApi[id];
              // 매핑 실패 시 폴백 변환
              return uiJobToApiFallback(label);
            })
            .filter(Boolean);
        } catch {
          apis = [];
        }
      }

      const payload = {
        name: (sessionStorage.getItem("signup.name") || "").trim(),
        birthday: toApiBirth(sessionStorage.getItem("signup.birth") || ""),
        gender: sessionStorage.getItem("signup.gender") || "",
        residence: address || "",
        RLG: "서울특별시", // 현재 UI는 서울 고정
        BLG: (Array.isArray(gus) ? gus : []).map(uiGuToApi).filter(Boolean),
        jobInterest: apis, // ✅ 서버용 값만 보냄
      };

      const phoneRaw =
        sessionStorage.getItem("signup.phoneNumber") ||
        sessionStorage.getItem("signup.phone") ||
        "";
      if (phoneRaw) payload.phoneNumber = phoneRaw;

      // 비어있는 값 제거
      Object.keys(payload).forEach((k) => {
        const v = payload[k];
        if (
          v === undefined ||
          v === null ||
          (typeof v === "string" && !v.trim()) ||
          (Array.isArray(v) && v.length === 0)
        ) {
          delete payload[k];
        }
      });

      console.log("PATCH /workers/me 요청 바디:", payload);

      if (!serverUrl || !workerToken) {
        alert("환경변수(serverUrl/workerToken)가 설정되지 않았습니다.");
        return;
      }

      const res = await fetch(`${serverUrl}/workers/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          token: `${workerToken}`,
        },
        body: JSON.stringify(payload),
        mode: "cors",
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json?.success) {
        throw new Error(json?.message || `HTTP_${res.status}`);
      }

      console.log("PATCH /workers/me 응답:", json);

      // 성공 시 응답 데이터로 세션 갱신
      const d = json.data || {};
      sessionStorage.setItem("signup.name", (d.name || "").trim());
      sessionStorage.setItem("signup.birth", toUiBirth(d.birthday || ""));
      sessionStorage.setItem("signup.gender", d.gender || "");
      sessionStorage.setItem("signup.address", d.residence || "");
      sessionStorage.setItem(
        "signup.gus",
        JSON.stringify(Array.isArray(d.BLG) ? d.BLG.map(apiBLGToUi) : [])
      );

      // 서버 응답의 jobInterest(api값) → 라벨/서버값 동기화
      const apiArr2 = Array.isArray(d.jobInterest) ? d.jobInterest : [];
      const labelArr2 = apiArr2.map((api) => apiToLabel[api] || api);
      sessionStorage.setItem("signup.interests", JSON.stringify(labelArr2));
      sessionStorage.setItem("signup.interestsApi", JSON.stringify(apiArr2));
      const firstLabel2 = labelArr2[0];
      const firstId2 = firstLabel2 ? labelToId[firstLabel2] || null : null;
      sessionStorage.setItem(
        "signup.interestIds",
        JSON.stringify(firstId2 ? [firstId2] : [])
      );

      navigate("/homeseeker/profile");
    } catch (err) {
      console.error("프로필 저장 실패:", err);
      alert(`저장에 실패했습니다.\n${err?.message || err}`);
    }
  };

  return (
    <>
      <Header text="내 정보 수정" />
      <ProfileWrapper>
        <ProfileImage color="var(--Foundation-Green-Normal)" size={55} />
        <SmallButton>내 사진 변경하기</SmallButton>

        <ContentWrapper>
          <SubWrapper style={{ fontWeight: "700" }}>{name}</SubWrapper>
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

/** ===== 스타일 ===== */
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

/** ===== 구직분야: 1개만 선택 (라벨/서버값 동시 저장) ===== */
function Section() {
  // 2열/3열 배치 유지
  const rows = [
    [1, 2],
    [3, 4],
    [5, 6, 7],
    [8, 9],
    [10, 11],
    [12, 13],
  ];

  const [selectedId, setSelectedId] = useState(() => {
    try {
      const arr = JSON.parse(
        sessionStorage.getItem("signup.interestIds") || "[]"
      );
      return Array.isArray(arr) && arr.length ? arr[0] : null;
    } catch {
      return null;
    }
  });

  const toggle = (id) => setSelectedId((prev) => (prev === id ? null : id));

  useEffect(() => {
    const ids = selectedId ? [selectedId] : [];
    const labels = ids.map((id) => idToLabel[id]).filter(Boolean);
    const apis = ids.map((id) => idToApi[id]).filter(Boolean);
    sessionStorage.setItem("signup.interestIds", JSON.stringify(ids));
    sessionStorage.setItem("signup.interests", JSON.stringify(labels)); // 화면용
    sessionStorage.setItem("signup.interestsApi", JSON.stringify(apis)); // 서버용
  }, [selectedId]);

  return (
    <SectionContainer>
      <p className="p">구직분야</p>

      {rows.map((row, i) => (
        <div className="group" key={i}>
          {row.map((id) => (
            <IntButton
              key={id}
              text={idToLabel[id]}
              selected={selectedId === id}
              onClick={() => toggle(id)}
            />
          ))}
        </div>
      ))}

      <div className="helper">{selectedId ? 1 : 0} / 1 선택됨</div>
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
    white-space: nowrap;
    cursor: pointer;
  }

  > .IntButton_Select {
    background-color: var(--Foundation-Green-Light, #eaf7f0);
    border-color: var(--Foundation-Green-Normal, #2baf66);
    color: var(--Foundation-Green-Darker, #0f3d24);
  }
`;

/** ===== 희망 근무지 (기존 유지) ===== */
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
