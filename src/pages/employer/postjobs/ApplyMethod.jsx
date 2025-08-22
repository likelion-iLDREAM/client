import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import ProgressBar from "../../../components/common/Progressbar";
import styled from "styled-components";
import { Icons } from "../../../components/icons/index";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ApplyMethod() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("TitleCategory");
  };
  const [selectedItems, setSelectedItems] = useState({
    all: false,
    phone: false,
    quick: false,
  });

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
      <Header text="새공고" />
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
  background-color: White;
  display: flex;
  padding: 10px 0;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
