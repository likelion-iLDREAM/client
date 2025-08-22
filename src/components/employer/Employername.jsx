import styled from "styled-components";
import { BsBuilding } from "react-icons/bs";

export default function Employername({ text }) {
  return (
    <EmployernameContainer>
      <Name>
        <Building>
          <BsBuilding />
        </Building>
        <p>{text}</p>
      </Name>
    </EmployernameContainer>
  );
}

const EmployernameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 136px;
  height: 42px;
  border-radius: 8px;
  background: var(--Foundation-Green-Light, #eaf7f0);
  box-shadow: 0 1px 2.5px 0 rgba(0, 0, 0, 0.25);
  white-space: nowrap;
  display: inline-flex;
  p {
    font-size: 20px;
    margin: 0%;
  }
`;

const Name = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const Building = styled(BsBuilding)`
  width: 24px;
  height: 24px;
  aspect-ratio: 1/1;
`;
