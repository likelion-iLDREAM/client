import styled from "styled-components";
import { Icons } from "../icons/index"
const Search = ({text, onChange}) => {
    return (
        <SearchWrapper>
          <Input placeholder={text}
          onChange={onChange} />
          <SearchContainer >
                <Icons.Search color="var(--Foundation-Green-Normal)" size={24} />
          </SearchContainer>
        </SearchWrapper>
    )
}

export default Search

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 360px;
  border: 1px solid var(--Foundation-Green-Dark, #20834D);
  border-radius: 10px;
  background-color: white;
  padding: 5px 10px;
  gap: 10px;
  margin: 10px auto; /* 가운데 정렬 */
`;

const Input = styled.input`
  flex: 1; /* 가능한 공간 다 차지 */
  border: none;
  outline: none;
  font-size: 20px;
  color: var(--Foundation-Green-Normal);
  background-color: white;
  color: var(--Foundation-Green-Dark, #20834D);
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  &::placeholder {
  color : var(--Foundation-Green-Normal); /* placeholder 글자 색상 */
  }
`;

const SearchContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: white;
`;
