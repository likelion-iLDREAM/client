import styled from "styled-components";
import { IoSearch } from "react-icons/io5";

export default function Search() {
  return (
    <SearchBar>
      <Input
        placeholder="50대가 일하기 쉬운 업무...를 검색해보세요"
        aria-label="검색어 입력"
      />
      <IconWrap>
        <IconSearch />
      </IconWrap>
    </SearchBar>
  );
}

const IconSearch = styled(IoSearch)`
  width: 24px;
  height: 24px;
`;

const SearchBar = styled.div`
  position: relative;
  display: flex;
  width: 360px; /* 기획 해상도 기준 */
  margin: 0 10px; /* 스크린샷 여백 재현 */
  padding: 15px 0 14px 0;
  border-bottom: 1px solid var(--Foundation-Black-black-5, #d9d9d9);
  box-sizing: border-box;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 48px 0 14px; /* 오른쪽 아이콘 공간 확보 */
  border-radius: 10px;
  border: 1px solid var(--Foundation-Green-Dark, #20834d);
  outline: none;
  font-size: 15px;
  box-sizing: border-box;

  &::placeholder {
    font-size: 15px;
    font-weight: 700;
    color: var(--Foundation-Green-Dark, #20834d);
  }
`;

const IconWrap = styled.span`
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  color: #20834d;
  pointer-events: none; /* 아이콘 클릭해도 포커스가 input으로 */
`;
