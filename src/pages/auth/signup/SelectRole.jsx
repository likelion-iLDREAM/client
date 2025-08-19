import styled from "styled-components";
import Header from "../../../components/common/Header";
import TapBar from "../../../components/common/TapBar";

export default function SelectRole() {
  return (
    <SelectRoleContainer>
      <Header />;
      <TapBar />
    </SelectRoleContainer>
  );
}

const SelectRoleContainer = styled.div`
  background-color: #fff;
  width: 400px;
  height: 100vh;
`;
