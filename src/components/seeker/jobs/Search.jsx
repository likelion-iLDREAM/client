// components/seeker/jobs/Search.jsx
import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";

/**
 * Props
 * - onSearch?: (q: string) => void   // 검색 실행 콜백
 * - initialValue?: string            // 초기 검색어
 */
export default function Search({ onSearch, initialValue = "" }) {
  const [q, setQ] = useState(initialValue);

  // 외부에서 initialValue가 바뀌면 동기화 (선택 사항)
  useEffect(() => {
    setQ(initialValue ?? "");
  }, [initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch && onSearch(q.trim());
  };

  return (
    <SearchBar role="search" onSubmit={handleSubmit}>
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="50대가 일하기 쉬운 업무...를 검색해보세요"
        aria-label="검색어 입력"
      />
      <IconButton type="submit" aria-label="검색">
        <IconSearch />
      </IconButton>
    </SearchBar>
  );
}

const IconSearch = styled(IoSearch)`
  width: 24px;
  height: 24px;
`;

const SearchBar = styled.form`
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

/* 아이콘을 클릭 가능한 제출 버튼으로 변경 */
const IconButton = styled.button`
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  background: transparent;
  color: #20834d;
  cursor: pointer;
`;
