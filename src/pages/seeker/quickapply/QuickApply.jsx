import styled from "styled-components";
import Header from "../../../components/common/Header";
import Employername from "../../../components/employer/Employername";
import EmployerTitle from "../../../components/employer/EmployTitle";
import Button from "../../../components/common/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoCheckboxOutline } from "react-icons/io5";
import { IoCheckbox } from "react-icons/io5";

export default function QuickApply() {
  const navigate = useNavigate();
  const location = useLocation();

  // JobList.jsx에서 navi할 때 넘긴 값들
  const {
    applicationId,
    jobPostId,
    companyName = "구인업체명",
    region = "서울",
    title = "일ㄹ오세요",
    questions,
  } = location.state || {};

  const [includeResume, setIncludeResume] = useState(true);

  // ✅ NameBirth / Phonenum 에서 저장한 값 불러오기
  const [name, setName] = useState(() =>
    (sessionStorage.getItem("signup.name") || "").trim()
  );
  const [gender, setGender] = useState(
    () => sessionStorage.getItem("signup.gender") || ""
  );
  const [phoneRaw, setPhoneRaw] = useState(
    () => sessionStorage.getItem("signup.phone") || ""
  );

  // 보기 좋은 전화번호 포맷 (국내/ +82 처리)
  const formatPhone = (v) => {
    if (!v) return "";
    let s = v.replace(/\D/g, "");
    // +82 → 0 치환
    if (s.startsWith("82")) {
      let rest = s.slice(2);
      if (!rest.startsWith("0")) rest = "0" + rest;
      s = rest;
    }
    if (s.length === 11) return s.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    if (s.length === 10) return s.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    return v; // 길이가 애매하면 원문 반환
  };
  const phone = formatPhone(phoneRaw);

  // 창에 다시 돌아왔을 때 최신값 동기화
  useEffect(() => {
    const sync = () => {
      setName((sessionStorage.getItem("signup.name") || "").trim());
      setGender(sessionStorage.getItem("signup.gender") || "");
      setPhoneRaw(sessionStorage.getItem("signup.phone") || "");
    };
    window.addEventListener("focus", sync);
    // 최초 1회 동기화
    sync();
    return () => window.removeEventListener("focus", sync);
  }, []);

  return (
    <QuickApplyContainer>
      <Header text={"간편 지원"} showBack />

      <Content>
        <Name>
          <Employername text={companyName} />
          <EmployerTitle region={region} title={title} />
          <p>간편 지원중이에요.</p>
        </Name>
      </Content>

      <Text>
        <p>
          지원서에 기재되는 <br />
          인적사항입니다.
        </p>
        <br />
        <p>
          잘못된 부분이 있다면 <br />
          [프로필 수정하기]를 눌러
          <br />
          변경해주세요.
        </p>
      </Text>
      <Divider />
      <Edit>
        <EditBtn onClick={() => navigate("/homeseeker/profile/edit")}>
          프로필 수정하기
        </EditBtn>
      </Edit>

      {/* 이름/성별/전화번호/이력서 섹션 */}
      <InfoCard>
        <Row>
          <Cell>
            <Label>이름</Label>
            <Value>{name || "홍길동"}</Value>
          </Cell>
          <Cell align="left">
            <Label>성별</Label>
            <Value>{gender || "성별"}</Value>
          </Cell>
        </Row>

        <Row style={{ marginTop: 12 }}>
          <Cell col={2}>
            <Label>전화번호</Label>
            <Value>{phone || "010-0000-0000"}</Value>
          </Cell>
        </Row>

        <Row style={{ marginTop: 12 }}>
          <Cell col={2}>
            <Label>이력서</Label>
            <CheckboxRow
              onClick={() => setIncludeResume((v) => !v)}
              style={{ cursor: "pointer" }}
            >
              {includeResume ? (
                <IoCheckbox size={24} />
              ) : (
                <IoCheckboxOutline size={24} />
              )}
              <span>일드림에 저장된 내 이력을 포함할게요.</span>
            </CheckboxRow>
          </Cell>
        </Row>
      </InfoCard>

      <Tap>
        <Button
          type={"White"}
          text={"다음"}
          onClick={() => {
            navigate("/homeseeker/quickapply/question", {
              state: {
                applicationId,
                jobPostId,
                companyName,
                region,
                title,
                questions,
                isCareerIncluding: includeResume,
              },
            });
          }}
        />
      </Tap>
    </QuickApplyContainer>
  );
}

const QuickApplyContainer = styled.div``;

const Content = styled.div`
  padding: 10px 20px;
`;

const Name = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 5px;
  > p {
    margin: 0;
    font-size: 30px;
    font-weight: 400;
  }
`;

const Tap = styled.div`
  border-top: 1px solid #bbb;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
  gap: 10px 0;
`;

const Text = styled.div`
  display: flex;
  justify-content: left;
  flex-direction: column;
  padding: 0 20px;

  p {
    font-size: 30px;
    margin: 0;
    font-weight: 700;
  }
`;

const EditBtn = styled.button`
  background: var(--Foundation-Green-Normal, #2bb673);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
`;
const Divider = styled.hr`
  border: none;
  border-top: 1px solid #bbb;
  margin: 10px 20px;
`;
const InfoCard = styled.div`
  padding: 0 20px 8px;
`;
const Row = styled.div`
  display: flex;
  gap: 12px;
`;
const Cell = styled.div`
  flex: ${(p) => (p.col === 2 ? "1 1 100%" : "1")};
  text-align: ${(p) => (p.align === "right" ? "right" : "left")};
`;
const Label = styled.div`
  color: #111827;
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 6px;
`;
const Value = styled.div`
  font-size: 20px;
  font-weight: 400;
`;
const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;

  input {
    width: 18px;
    height: 18px;
  }

  span {
    font-size: 16px;
  }
  svg {
    stroke-width: 0.75px;
    stroke: var(--Foundation-Green-Darker, #0f3d24);
    fill: var(--Foundation-Green-Normal, #2baf66);
  }
`;

const Edit = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: end;
`;
