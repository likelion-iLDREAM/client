import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import Enter from "../../../components/common/Enter";
import { Icons } from "../../../components/icons/index";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileEmployerEdit() {
  const navigate = useNavigate();
  const handleSave = () => {
    navigate("/employer/profile");
  };
  const tags = ["돌봄", "식품·옷·환경 가공", "목공·공예·제조"];

  // 직무 분야
  const mainTags = [
    { id: "farm", label: "🌱 농사·원예·어업" },
    { id: "drive", label: "🚚 운전·배달" },
    { id: "craft", label: "🪵 목공·공예·제조" },
  ];
  const otherTags = [
    "요리·주방",
    "청소·미화",
    "경비·보안",
    "간병·돌봄",
    "판매·서비스",
    "사무·행정",
  ];

  const [selectedTags, setSelectedTags] = useState([]);
  const [showOther, setShowOther] = useState(false);
  const toggleTag = (key) =>
    setSelectedTags((prev) =>
      prev.includes(key) ? prev.filter((t) => t !== key) : [...prev, key]
    );

  return (
    <>
      <Header text="내 기업 수정" showBack />
      <ProfileWrapper>
        <ProfileImage>
          <Icons.Building color="var(--Foundation-Green-Normal)" size={55} />
        </ProfileImage>
        <SmallButton>내 사진 변경하기</SmallButton>

        <ContentWrapper>
          <SubWrapper style={{ fontWeight: "700" }}>{"기업명"}</SubWrapper>
          <SubWrapper>
            구인분야
            <TagRow>
              {tags.slice(0, 3).map((t, i) => (
                <Tag key={i}>{t}</Tag>
              ))}
            </TagRow>
          </SubWrapper>
        </ContentWrapper>
      </ProfileWrapper>
      <Menu>
        <Submenu>
          기업명
          <span>기업명입니다.</span>
        </Submenu>
        <Submenu>
          이메일
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Enter text={"000000@gmail.com"} />
            <button>인증</button>
          </div>
          <span className="alert">인증이 완료되었습니다.</span>
        </Submenu>
        <Submenu>
          대표자명
          <span>강길동</span>
        </Submenu>
        <Submenu>
          대표자 연락처
          <EnterWrapper>
            <input readOnly placeholder="010-1234-5678" />
          </EnterWrapper>
        </Submenu>
        <Submenu>
          사업자 등록번호
          <EnterWrapper>
            <input readOnly placeholder="000-00-0000" />
          </EnterWrapper>
          <span className="alert">사업자 인증이 완료되었습니다.</span>
        </Submenu>
        <Submenu>
          주소
          <InputWrapper>
            <Inputaddress>{"서울특별시 00구 00동 00로 0000"} </Inputaddress>
            <Icons.Map
              color="var(--Foundation-Green-Normal)"
              size={24}
              cursor={"pointer"}
              onClick={() => console.log("주소버튼")}
            />
          </InputWrapper>
          <Inputtitle placeholder={"000아파트 1004호"} />
        </Submenu>
        <Submenu>
          구인분야
          <TagList>
            {mainTags.map((t) => (
              <TagPill
                key={t.id}
                data-selected={selectedTags.includes(t.id)}
                onClick={() => toggleTag(t.id)}
              >
                {t.label}
              </TagPill>
            ))}
            <TagPill
              data-variant="outline"
              onClick={() => setShowOther((s) => !s)}
            >
              다른 분야 ▾
            </TagPill>
          </TagList>
          {showOther && (
            <OtherWrap>
              {otherTags.map((label) => (
                <TagPill
                  key={label}
                  data-selected={selectedTags.includes(label)}
                  onClick={() => toggleTag(label)}
                >
                  {label}
                </TagPill>
              ))}
            </OtherWrap>
          )}
          <span className="alert">구인 분야는 최대 3개만 선택 가능합니다.</span>
        </Submenu>
      </Menu>
      <Footer>
        <Button text="저장하기" type="White" onClick={handleSave} />
      </Footer>
    </>
  );
}

const TagRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
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
