// components/seeker/quickapply/Choice.jsx
import styled from "styled-components";

/**
 * @param {Array<{id:number,label:string}>} options
 * @param {boolean} multiple
 * @param {number[]} selectedIds
 * @param {(next:number[]) => void} onChange
 */
export default function Choice({
  options = [],
  multiple = false,
  selectedIds = [],
  onChange = () => {},
}) {
  const safeOptions =
    options.length > 0
      ? options
      : [
          // 폴백(예: 예/아니오)
          { id: 1, label: "네" },
          { id: 2, label: "아니요" },
        ];

  const toggle = (id) => {
    if (multiple) {
      const exists = selectedIds.includes(id);
      const next = exists
        ? selectedIds.filter((x) => x !== id)
        : [...selectedIds, id];
      onChange(next);
    } else {
      onChange(selectedIds.includes(id) ? [] : [id]);
    }
  };

  return (
    <Container>
      <List>
        {safeOptions.map((opt) => {
          const active = selectedIds.includes(opt.id);
          return (
            <Item key={opt.id}>
              <OptionButton
                type="button"
                aria-pressed={active}
                $active={active}
                onClick={() => toggle(opt.id)}
              >
                {opt.label}
              </OptionButton>
            </Item>
          );
        })}
      </List>
    </Container>
  );
}

const Container = styled.div``;

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px 40px;
`;

const Item = styled.div``;

const OptionButton = styled.button`
  min-width: 220px;
  height: 44px;
  border-radius: 10px;
  border: 1px solid var(--Foundation-Green-Normal);
  background: ${({ $active }) =>
    $active ? "var(--Foundation-Green-Normal)" : "#fff"};
  color: ${({ $active }) =>
    $active ? "#fff" : "var(--Foundation-Green-Normal)"};
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
  padding: 0 16px;
  transition: background 0.15s ease, color 0.15s ease, transform 0.03s ease;

  &:active {
    transform: scale(0.99);
  }
`;
