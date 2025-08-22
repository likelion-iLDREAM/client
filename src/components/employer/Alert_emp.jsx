import { useEffect } from "react";
import styled from "styled-components";

export default function Alert_emp({
  open,
  children,
  confirmText = "네, 마감할게요",
  cancelText = "아니요",
  onConfirm,
  onCancel,
  onClose,
}) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const messageNode = children ?? <>정말 채용을 마감하시겠어요?</>;

  return (
    <Overlay onClick={onClose}>
      <Dialog
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <Message>{messageNode}</Message>
        <Buttons>
          <Btn type="button" onClick={onConfirm}>
            {confirmText}
          </Btn>
          <Btn type="button" onClick={onCancel} $variant="outline">
            {cancelText}
          </Btn>
        </Buttons>
      </Dialog>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: grid;
  place-items: center;
  z-index: 1000;
`;

const Dialog = styled.div`
  width: 343px;
  border-radius: 16px;
  background: var(--Foundation-Green-Light, #eaf7f0);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  padding: 20px 20px;
`;

const Message = styled.p`
  margin: 0 0 14px;
  font-size: 25px;
  font-weight: 700;
  color: #1b1b1b;
  line-height: 1.45;
  white-space: pre-line;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Btn = styled.button`
  width: 100%;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  border: ${({ $variant }) =>
    $variant === "outline" ? "1.5px solid #2BAF66" : 0};
  background: ${({ $variant }) =>
    $variant === "outline" ? "#fff" : "var(--Foundation-Green, #2f8d46)"};
  color: ${({ $variant }) =>
    $variant === "outline" ? "var(--Foundation-Green, #2f8d46)" : "#fff"};
  box-shadow: ${({ $variant }) =>
    $variant === "outline" ? "none" : "0 1px 2px rgba(0,0,0,0.1)"};
`;

const Company = styled.span`
  color: var(--Foundation-Green, #2f8d46);
`;
