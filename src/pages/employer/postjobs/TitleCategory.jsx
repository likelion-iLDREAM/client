import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import Enter from "../../../components/common/Enter";
import ProgressBar from "../../../components/common/Progressbar";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Icons } from "../../../components/icons/index";
import { IoIosArrowBack } from "react-icons/io";
import Alert_post from "../../../components/employer/Alert_post";

export default function TitleCategory() {
  const navigate = useNavigate();
  const location = useLocation();
  const prevState = location.state || {};

  const [title, setTitle] = useState("");

  // 오늘 날짜 YYYY-MM-DD 형식 구하는 함수
  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [startDate, setStartDate] = useState(getTodayDateString());
  const [endDate, setEndDate] = useState("");
  const [selectedoptions, setSelectedoptions] = useState({
    date: true,
    count: false,
  });

  const toggleOption = (key) => {
    setSelectedoptions((prev) => {
      const isSelected = prev[key];

      if (key === "count" && !isSelected) {
        // '채용시 마감' 선택 시 endDate 초기화
        setEndDate("");
      }

      if (isSelected) {
        return {};
      } else {
        return { [key]: !prev[key] };
      }
    });
  };

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

  const [selectedTag, setSelectedTag] = useState(null);
  const [showOther, setShowOther] = useState(false);
  const toggleTag = (key) => {
    setSelectedTag((prev) => (prev === key ? null : key));
  };

  const [backAlertOpen, setBackAlertOpen] = useState(false);
  const handleNext = () => {
    navigate("/employer/postjobs/paylocation", {
      state: {
        ...prevState,
        title,
        startDate,
        expiryDate: selectedoptions.count ? null : endDate, // 채용시마감 시 null 처리
        jobFields: selectedTag ? selectedTag : null,
      },
    });
  };
  return (
    <>
      <Headersection>
        <Header text={"지원자 현황"} showBack />
      </Headersection>
      {/* <Headersection>
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
      </Headersection> */}
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
        <ProgressBar value={"25"} max={"100"} />
        <Question>
          공고 제목과 <br />
          구인분야와 <br />
          구인기간을 알려주세요.
        </Question>
        <OptionsWrapper>
          <Tag>
            <p>공고제목</p>
            <Enter
              text="제목을 입력해주세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Tag>
          <Tag>
            <p>구인기간</p>
            <Period>
              <Inputdate
                type="date"
                placeholder="Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              ~
              <Inputdate
                type="date"
                placeholder="Date"
                value={selectedoptions.count ? "" : endDate}
                onChange={(e) => setEndDate(e.target.value)}
                disabled={selectedoptions.count} // 채용시마감이 선택되면 비활성화
              />
            </Period>
            <Selectcheckbox onClick={() => toggleOption("count")}>
              {selectedoptions.count ? (
                <Icons.CheckboxActive
                  color="var(--Foundation-Green-Normal)"
                  size={18}
                />
              ) : (
                <Icons.CheckboxInactive
                  color="var(--Foundation-Green-Normal)"
                  size={18}
                />
              )}
              채용시 마감
            </Selectcheckbox>
          </Tag>
          <Tag>
            <p>구인분야</p>
            <TagList>
              {mainTags.map((t) => (
                <TagPill
                  key={t.id}
                  data-selected={selectedTag === t.id}
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
                    data-selected={selectedTag === label}
                    onClick={() => toggleTag(label)}
                  >
                    {label}
                  </TagPill>
                ))}
              </OtherWrap>
            )}
          </Tag>
        </OptionsWrapper>
      </ApplyWrapper>
      <Footer>
        <Button text="다음" type="White" onClick={handleNext} />
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

const Tag = styled.div`
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

const TagPill = styled.button`
  all: unset;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  border: 1px solid #bfbfbf;
  background: #ffffff;

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
`;

const Selectcheckbox = styled.button`
  display: flex;
  padding: 0;
  align-items: center;
  gap: 5px;
  border: none;
  background-color: transparent;
  font-size: 15px;
`;
