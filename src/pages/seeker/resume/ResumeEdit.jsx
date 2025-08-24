import styled from "styled-components";
import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResumeEdit() {
  const navigate = useNavigate();
  const location = useLocation();

  // 어떤 항목을 수정할지 식별 (Resume.jsx에서 state로 넘김)
  const editId = location?.state?.id ?? null;

  // 세션에서 전체 리스트 로드
  const [list, setList] = useState(() => {
    try {
      const raw = sessionStorage.getItem("resume.list");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // 편집 대상 찾기 (id 없으면 마지막 항목 fallback)
  const target = useMemo(() => {
    if (!Array.isArray(list) || list.length === 0) return null;
    if (editId == null) return list[list.length - 1];
    return list.find((it) => it.id === editId) ?? list[list.length - 1];
  }, [list, editId]);

  // ====== UI 상태 ======
  const [company, setCompany] = useState("");
  const [duty, setDuty] = useState("");
  const [selectedTag, setSelectedTag] = useState(""); // 1개 선택
  const [showOther, setShowOther] = useState(false);

  // 근무지역
  const [sido] = useState("서울특별시");
  const [gu, setGu] = useState("");

  // 근무기간
  const [startDate, setStartDate] = useState(""); // yyyy-mm-dd
  const [endDate, setEndDate] = useState(""); // yyyy-mm-dd

  // 초기화: target에서 상태로 주입
  useEffect(() => {
    if (!target) {
      alert("수정할 이력이 없습니다.");
      navigate("/homeseeker/resume");
      return;
    }
    setCompany(target.company || "");
    setDuty(target.duty || "");
    setSelectedTag(target.jobTag || "");

    // 주소에서 구 추출 (Add에서 addr은 `${sido} ${gu}`)
    const m = (target.addr || "").match(/([가-힣]+구)/);
    setGu(m ? m[1] : "");

    // 날짜 복원
    // 1순위: 새로 저장된 startIso/endIso가 있으면 그대로 사용
    if (target.startIso && target.endIso) {
      setStartDate(target.startIso);
      setEndDate(target.endIso);
    } else {
      // 2순위: "YYYY.MM ~ YYYY.MM ..." 형태에서 대략 복원(일자는 01로)
      // 예: "2020.01 ~ 2021.06 (1년 5개월)"
      const dm = (target.date || "").match(
        /\s*(\d{4})\.(\d{2})\s*~\s*(\d{4})\.(\d{2})/
      );
      if (dm) {
        setStartDate(`${dm[1]}-${dm[2]}-01`);
        setEndDate(`${dm[3]}-${dm[4]}-01`);
      } else {
        setStartDate("");
        setEndDate("");
      }
    }
  }, [target, navigate]);

  // 직무 분야
  const mainTags = [
    { id: "farm", label: "🌱 농사·원예·어업" },
    { id: "drive", label: "🚚 운전·배달" },
    { id: "craft", label: "🪵 목공·공예·제조" },
  ];
  const otherTags = [
    "🎨문화·연구·기술",
    "🥬식품·옷·환경 가공",
    "📄사무·금융",
    "❤️돌봄",
    "🛒판매",
    "🍲음식·서비스",
    "🔌전기·전자 수리",
    "⚙️기계·금속 제작·수리",
  ];

  const seoulGus = [
    "종로구",
    "중구",
    "용산구",
    "성동구",
    "광진구",
    "동대문구",
    "중랑구",
    "성북구",
    "강북구",
    "도봉구",
    "노원구",
    "은평구",
    "서대문구",
    "마포구",
    "양천구",
    "강서구",
    "구로구",
    "금천구",
    "영등포구",
    "동작구",
    "관악구",
    "서초구",
    "강남구",
    "송파구",
    "강동구",
  ];

  // 날짜 유틸
  const addMonths = (m) => {
    if (!startDate) return;
    const d = new Date(startDate);
    d.setMonth(d.getMonth() + m);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    setEndDate(`${yyyy}-${mm}-${dd}`);
  };
  const fmtYYYYMM = (iso) => {
    if (!iso) return "";
    const [y, m] = iso.split("-");
    return `${y}.${m}`;
  };
  const diffMonths = (s, e) => {
    const sd = new Date(s);
    const ed = new Date(e);
    if (isNaN(sd) || isNaN(ed) || ed < sd) return 0;
    return (
      (ed.getFullYear() - sd.getFullYear()) * 12 +
      (ed.getMonth() - sd.getMonth())
    );
  };
  const humanizePeriod = (months) => {
    if (!months || months <= 0) return "";
    if (months >= 12) {
      const y = Math.floor(months / 12);
      const m = months % 12;
      return ` (${y}년${m ? ` ${m}개월` : ""})`;
    }
    return ` (${months}개월)`;
  };

  const handleSave = () => {
    if (
      !target ||
      !company.trim() ||
      !duty.trim() ||
      !selectedTag ||
      !gu ||
      !startDate ||
      !endDate
    ) {
      alert(
        "업체명, 직무, 직무 분야 1개, 근무지역, 근무기간을 모두 입력해주세요."
      );
      return;
    }

    const months = diffMonths(startDate, endDate);
    const period = `${fmtYYYYMM(startDate)} ~ ${fmtYYYYMM(
      endDate
    )}${humanizePeriod(months)}`;

    const updated = {
      ...target,
      company: company.trim(),
      duty: duty.trim(),
      jobTag: selectedTag,
      addr: `${sido} ${gu}`,
      date: period,
      startIso: startDate, // 새 구조 (편집 재진입 시 복원용)
      endIso: endDate, // 새 구조 (편집 재진입 시 복원용)
      // title은 요구사항대로 그대로 유지("[지역] 구인공고명")
    };

    const next = list.map((it) => (it.id === updated.id ? updated : it));
    sessionStorage.setItem("resume.list", JSON.stringify(next));
    navigate("/homeseeker/resume");
  };

  return (
    <AddContainer>
      <Header showBack text={"이력 수정하기"} />

      <Info>
        <Input>
          <p>업체명</p>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="이곳에 업체명을 적어주세요."
          />
        </Input>

        <Input>
          <p>직무</p>
          <input
            value={duty}
            onChange={(e) => setDuty(e.target.value)}
            placeholder="이곳에 하셨던 업무를 적어주세요."
          />
        </Input>

        <Tag>
          <p>직무 분야 (1개 선택)</p>
          <TagList>
            {mainTags.map((t) => (
              <TagPill
                key={t.id}
                data-selected={selectedTag === t.label}
                onClick={() => setSelectedTag(t.label)}
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
                  onClick={() => setSelectedTag(label)}
                >
                  {label}
                </TagPill>
              ))}
            </OtherWrap>
          )}
        </Tag>

        <Location>
          <p>근무지역</p>
          <Row gap={8}>
            <Select disabled value={sido}>
              <option>{sido}</option>
            </Select>
            <Select value={gu} onChange={(e) => setGu(e.target.value)}>
              <option value="" disabled>
                시/군/구
              </option>
              {seoulGus.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </Select>
          </Row>
        </Location>

        <Time>
          <p>근무기간</p>
          <Row gap={8} style={{ alignItems: "center" }}>
            <DateInput
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Tilde>~</Tilde>
            <DateInput
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Row>
          <Row gap={8} style={{ marginTop: 8 }}>
            <SmallChip onClick={() => addMonths(6)}>6개월</SmallChip>
            <SmallChip onClick={() => addMonths(12)}>1년</SmallChip>
          </Row>
        </Time>
      </Info>

      <Tap>
        <Button type={"White"} text={"수정하기"} onClick={handleSave} />
      </Tap>
    </AddContainer>
  );
}

const AddContainer = styled.div``;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 12px 30px 20px 30px;
`;

const Input = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  p {
    font-size: 20px;
    font-weight: 700;
    margin: 0;
  }
  input {
    width: 320px;
    display: flex;
    padding: 10px;
    justify-content: center;
    align-items: center;
    border-radius: 7px;
    border: 1px solid var(--Foundation-Black-black-6, #bfbfbf);
    background: var(--Foundation-surface-White, #fff);
    gap: 10px;
    align-self: stretch;
    color: var(--Foundation-Black-black-7, #8c8c8c);
    font-family: "Pretendard Variable";
    font-size: 20px;
    font-weight: 400;
    line-height: normal;
  }
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

const Location = styled.div`
  p {
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 8px 0;
  }
`;

const Row = styled.div`
  display: flex;
  gap: ${(p) => (p.gap ? `${p.gap}px` : "0")};
`;

const Select = styled.select`
  width: 155px;
  padding: 10px 12px;
  border-radius: 7px;
  border: 1px solid var(--Foundation-Black-black-6, #bfbfbf);
  background: var(--Foundation-surface-White, #fff);
  font-size: 16px;
  color: #000;

  &[disabled] {
    color: #8c8c8c;
    background: #f5f5f5;
  }
`;

const Time = styled.div`
  p {
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 8px 0;
  }
`;

const DateInput = styled.input`
  width: 150px;
  padding: 10px 12px;
  border-radius: 7px;
  border: 1px solid var(--Foundation-Black-black-6, #bfbfbf);
  background: var(--Foundation-surface-White, #fff);
  font-size: 16px;
`;

const Tilde = styled.span`
  font-weight: 700;
  padding: 0 4px;
`;

const SmallChip = styled.button`
  all: unset;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 7px;
  border: 1px solid #bfbfbf;
  background: #ffffff;
  font-size: 14px;
`;

const Tap = styled.div`
  border-top: 1px solid #bbb;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
