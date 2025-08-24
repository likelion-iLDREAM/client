import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import Enter from "../../../components/common/Enter";
import { Icons } from "../../../components/icons/index";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const employerToken = import.meta.env.VITE_EMPLOYER_TOKEN;
const serverUrl = import.meta.env.VITE_ILDREAM_URL;

export default function ProfileEmployerEdit() {
  const navigate = useNavigate();

  // sessionStorage에서 저장된 필드 불러오기 (초기값 세팅)
  const [companyName, setCompanyName] = useState(() =>
    (sessionStorage.getItem("employer.companyName") || "").trim()
  );
  const [email, setEmail] = useState(() =>
    (sessionStorage.getItem("employer.email") || "").trim()
  );
  const [bossName, setbossName] = useState(() =>
    (sessionStorage.getItem("employer.bossName") || "").trim()
  );
  const [phone, setPhone] = useState(() =>
    (sessionStorage.getItem("signup.phone") || "").trim()
  );
  const [companyNumber, setcompanyNumber] = useState(() =>
    (sessionStorage.getItem("employer.companyNumber") || "").trim()
  );
  const [address, setAddress] = useState(() =>
    (sessionStorage.getItem("signup.address") || "").trim()
  );
  const [addressDetail, setAddressDetail] = useState(() =>
    (sessionStorage.getItem("signup.addressDetail") || "").trim()
  );
  // const [jobFields, setJobFields] = useState(() => {
  //   try {
  //     return JSON.parse(sessionStorage.getItem("employer.jobFields") || "[]");
  //   } catch {
  //     return [];
  //   }
  // });
  // 구인분야 태그 (sessionStorage 저장된 배열 불러오기)
  const [selectedTags, setSelectedTags] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("employer.jobFields")) || [];
    } catch {
      return [];
    }
  });
  // console.log("employerToken:", employerToken);

  // 필드 값 저장 (sessionStorage 동기화 + 페이지 이동)
  const handleSave = () => {
    sessionStorage.setItem("employer.companyName", companyName);
    sessionStorage.setItem("employer.email", email);
    sessionStorage.setItem("employer.bossName", bossName);
    sessionStorage.setItem("signup.phone", phone);
    sessionStorage.setItem("employer.companyNumber", companyNumber);
    sessionStorage.setItem("signup.address", address);
    sessionStorage.setItem("signup.addressDetail", addressDetail);
    sessionStorage.setItem("employer.jobFields", JSON.stringify(selectedTags));
    navigate("/employer/profile");
  };
  // fetch("/api/employer/me")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data);
  //     // data 구조 확인 가능
  //   })
  //   .catch((error) => console.error(error));

  // fetch(`${serverUrl}/employers/me`, {
  //   headers: {
  //     token: `${employerToken}`,
  //   },
  // })
  //   .then((res) => {
  //     if (!res.ok) {
  //       throw new Error(`HTTP error, status = ${res.status}`);
  //     }
  //     console.log(res);
  //     return res.json();
  //   })
  //   .then((data) => {
  //     console.log("데이터 받아옴", data);
  //   })
  //   .catch((err) => {
  //     console.error("API 요청 실패 에러:", err);
  //   });

  useEffect(() => {
    fetch(`${serverUrl}/employers/me`, {
      headers: {
        token: `${employerToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("받아온 고용주 정보:", data);
        if (data.success && data.data) {
          const emp = data.data;

          // companyLocation 분리
          const locationParts = (emp.companyLocation || "").split(" ");
          const address = locationParts.slice(0, 2).join(" ");
          const addressDetail = locationParts.slice(2).join(" ");

          setCompanyName(emp.companyName || "");
          setEmail(emp.email || "");
          setbossName(emp.bossName || "");
          setPhone(convertPhoneNumber(emp.phoneNumber || ""));
          setcompanyNumber(emp.companyNumber || "");
          setAddress(address);
          setAddressDetail(addressDetail);
          // setJobFields(emp.jobFields || []);
          setSelectedTags(emp.jobFields || []);
          // 필요한 필드 추가로 초기화
        }
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <Header text="내 기업 수정" showBack />
      <ProfileWrapper>
        <ProfileImage>
          <Icons.Building color="var(--Foundation-Green-Normal)" size={55} />
        </ProfileImage>
        <SmallButton>내 사진 변경하기</SmallButton>

        <ContentWrapper>
          <SubWrapper style={{ fontWeight: "700" }}>{companyName}</SubWrapper>
          <SubWrapper>
            구인분야
            <TagRow>
              {selectedTags.slice(0, 3).map((t, i) => (
                <Tag key={i}>{t}</Tag>
              ))}
            </TagRow>
          </SubWrapper>
        </ContentWrapper>
      </ProfileWrapper>
      <Menu>
        <Submenu>
          기업명
          <span>{companyName}</span>
        </Submenu>
        <Submenu>
          이메일
          <div>
            <Enter text={email} />
            <button>인증</button>
          </div>
          <span className="alert">인증이 완료되었습니다.</span>
        </Submenu>
        <Submenu>
          대표자명
          <span>{bossName}</span>
        </Submenu>
        <Submenu>
          대표자 연락처
          <EnterWrapper>
            <input readOnly placeholder={phone} />
          </EnterWrapper>
        </Submenu>
        <Submenu>
          사업자 등록번호
          <EnterWrapper>
            <input readOnly placeholder={companyNumber} />
          </EnterWrapper>
          <span className="alert">사업자 인증이 완료되었습니다.</span>
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
            placeholder={addressDetail}
            value={addressDetail}
            onChange={(e) => setAddressDetail(e.target.value)}
          />
        </Submenu>
        <Section jobFields={selectedTags} setJobFields={setSelectedTags} />
      </Menu>
      <Footer>
        <Button text="저장하기" type="White" onClick={handleSave} />
      </Footer>
    </>
  );
}
function convertPhoneNumber(phoneNumber) {
  if (!phoneNumber) return "";

  // +82로 시작하면 010으로 변경
  let converted = phoneNumber.startsWith("+82")
    ? "0" + phoneNumber.slice(3)
    : phoneNumber;

  // 숫자만 추출
  converted = converted.replace(/[^0-9]/g, "");

  // 010-XXXX-XXXX 형태로 포맷팅 (휴대폰 번호일 경우)
  if (converted.length === 11 && converted.startsWith("010")) {
    return converted.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  }

  // 그 밖의 경우는 원본 리턴
  return phoneNumber;
}

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  //   padding-top: 10px;
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #000;
  font-size: 15px;
  white-space: nowrap;
  font-weight: 400;
`;
const TagWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
  p {
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 8px 0;
  }
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TagPill = styled.span`
  all: unset;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  border: 1px solid #bfbfbf;
  background: #ffffff;
  font-weight: 400;

  &[data-selected="true"] {
    background: var(--Foundation-Green-Light, #eaf7f0);
    border-color: #7cc9a5;
    font-weight: 600;
  }

  &[data-variant="outline"] {
    background: #ffffff;
  }
`;

const OtherWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

const ProfileWrapper = styled.div`
  display: flex;
  width: 360px;
  padding: 20px 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid #bfbfbf;
`;

const ProfileImage = styled.div`
  display: flex;
  width: 60px;
  height: 60px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 1000px;
  border: 5px solid var(--Foundation-Green-Normal, #2baf66);
  background: var(--Foundation-surface-White, #fff);
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 360px;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  justify-content: center;
`;

const SubWrapper = styled.div`
  display: flex;
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
  cursor: pointer;
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

  div {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  span {
    font-weight: 400;
  }

  .alert {
    color: #ff5858;
    font-size: 15px;
  }

  button {
    display: flex;
    // flex-direction: row;
    width: 15%;
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
  width: 360px;
  padding: 20px;
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
  width: 100%; /* 화면 너비(부모) 100%로 채움 */
  box-sizing: border-box; /* 패딩/보더 포함 너비 계산 */
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
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid #d9d9d9;
  padding: 10px;
`;

// 구직분야 (프로필에서도 세션과 동기화)
function Section({ jobFields, setJobFields }) {
  const rows = [
    [
      { id: 1, label: "🌱농사·원예·어업" },
      { id: 2, label: "🚚운전·배달" },
    ],
    [
      { id: 3, label: "🥬식품·옷·환경 가공" },
      { id: 4, label: "📄사무·금융" },
    ],
    [
      { id: 5, label: "🛒판매" },
      { id: 6, label: "❤️돌봄" },
      { id: 7, label: "🧹청소·미화" },
    ],
    [
      { id: 8, label: "🍲음식·서비스" },
      { id: 9, label: "🪚목공·공예·제조" },
    ],
    [
      { id: 10, label: "🎨문화·연구·기술" },
      { id: 11, label: "🏗️건설·시설 관리" },
    ],
    [
      { id: 12, label: "🔌전기·전자 수리" },
      { id: 13, label: "⚙️기계·금속 제작·수리" },
    ],
  ];
  const idToLabel = {};
  rows.flat().forEach((o) => (idToLabel[o.id] = o.label));

  const selectedSet = new Set(jobFields);

  const toggle = (id) => {
    const label = idToLabel[id];
    if (!label) return;

    let updated = [...jobFields];
    if (selectedSet.has(label)) {
      updated = updated.filter((t) => t !== label);
    } else {
      if (jobFields.length >= 3) return; // 최대 3개 제한
      updated.push(label);
    }
    setJobFields(updated);
  };
  // // jobFields 상태가 바뀔 때마다 세션스토리지에 반영
  // useEffect(() => {
  //   // 선택된 id 리스트가 아닌 label 리스트를 저장하므로 jobFields 자체 저장하면 됨
  //   sessionStorage.setItem("employer.jobFields", JSON.stringify(jobFields));
  // }, [jobFields]);

  return (
    <SectionContainer>
      <p className="p">구인분야</p>

      {rows.map((row, i) => (
        <div className="group" key={i}>
          {row.map((opt) => (
            <IntButton
              key={opt.id}
              text={opt.label}
              selected={selectedSet.has(opt.label)}
              onClick={() => toggle(opt.id)}
            />
          ))}
        </div>
      ))}

      <div className="helper">{jobFields.length} / 3 선택됨</div>
    </SectionContainer>
  );
}

const SectionContainer = styled.div`
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
