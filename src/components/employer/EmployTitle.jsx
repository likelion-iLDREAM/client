import styled from "styled-components";

export default function EmployerTitle({ region, title }) {
  return (
    <EmployTitleContainer>
      <div>
        [{region}] {title}
      </div>
    </EmployTitleContainer>
  );
}

const EmployTitleContainer = styled.div`
  font-size: 30px;
  font-weight: 700;
  display: inline-flex;
`;
