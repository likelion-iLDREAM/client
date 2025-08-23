import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import ProgressBar from "../../../components/common/Progressbar";
import styled from "styled-components";
import { Icons } from "../../../components/icons/index";
import { IoIosArrowBack } from "react-icons/io";
import Alert_post from "../../../components/employer/Alert_post";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ApplyMethod() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/employer/postjobs/titlecategory");
  };
  const [selectedItems, setSelectedItems] = useState({
    all: false,
    phone: false,
    quick: false,
  });
  const [backAlertOpen, setBackAlertOpen] = useState(false);

  const toggleItem = (key) => {
    if (key === "all") {
      const newAll = !selectedItems.all;
      setSelectedItems({
        all: newAll,
        phone: newAll,
        quick: newAll,
      });
    } else {
      setSelectedItems((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    }
  };

  useEffect(() => {
    if (selectedItems.phone && selectedItems.quick) {
      if (!selectedItems.all) {
        setSelectedItems((prev) => ({ ...prev, all: true }));
      }
    } else {
      if (selectedItems.all) {
        setSelectedItems((prev) => ({ ...prev, all: false }));
      }
    }
  }, [selectedItems.phone, selectedItems.quick]);
  return (
    <>
      <Headersection>
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
      </Headersection>
      <Alert_post
        open={backAlertOpen}
        onConfirm={() => {
          setBackAlertOpen(false);
        }}
        onCancel={() => {
          setBackAlertOpen(false);
          navigate("/employer");
        }}
        onClose={() => setBackAlertOpen(false)}
      />
      <ApplyWrapper>
        <ProgressBar value={"12.5"} max={"100"} />
        <Question>
          지원 방식을 <br />
          선택해주세요.
        </Question>
        <OptionsWrapper>
          <SelectAll onClick={() => toggleItem("all")}>
            {selectedItems.all ? (
              <Icons.CheckboxActive
                color="var(--Foundation-Green-Normal)"
                size={32}
              />
            ) : (
              <Icons.CheckboxInactive
                color="var(--Foundation-Green-Normal)"
                size={32}
              />
            )}
            모두 선택
          </SelectAll>
          <SelectItem onClick={() => toggleItem("phone")}>
            {selectedItems.all | selectedItems.phone ? (
              <Icons.CheckboxActive
                color="var(--Foundation-Green-Normal)"
                size={32}
              />
            ) : (
              <Icons.CheckboxInactive
                color="var(--Foundation-Green-Normal)"
                size={32}
              />
            )}
            전화 지원
          </SelectItem>
          <SelectItem onClick={() => toggleItem("quick")}>
            {selectedItems.all | selectedItems.quick ? (
              <Icons.CheckboxActive
                color="var(--Foundation-Green-Normal)"
                size={32}
              />
            ) : (
              <Icons.CheckboxInactive
                color="var(--Foundation-Green-Normal)"
                size={32}
              />
            )}
            간편 지원
          </SelectItem>
          <Alert>
            <Icons.Info color="var(--Foundation-Green-Normal)" size={32} />
            간편지원은 지원자의 이력과 정보를 깔끔하게 정리해 빠른 채용을
            도와줘요.
          </Alert>
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
  gap: 15px;
  flex: 1 0 0;
  align-self: stretch;
`;

const SelectAll = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: white;
  border: none;
  font-size: 20px;
`;

const SelectItem = styled.button`
  display: flex;
  padding: 20px 30px;
  align-items: center;
  gap: 25px;
  align-self: stretch;
  border-radius: 7px;
  background: var(--Foundation-Green-Light, #eaf7f0);
  border: none;
  font-size: 20px;
`;

const Alert = styled.div`
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  padding: 10px;
  align-items: flex-start;
  gap: 5px;
  align-self: stretch;
  border-radius: 10px;
  background: var(--Foundation-Green-Light, #eaf7f0);
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid #d9d9d9;
  padding: 10px;
`;
