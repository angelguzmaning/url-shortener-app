import styled from "styled-components";
import { Message } from "../../types/message";

const SuccessMessage = styled.span`
  color: green;
`;

const ErrorMessage = styled.span`
  color: red;
`;

export function MessageView({ message: { type, text } }: { message: Message }) {
  return type === "success" ? (
    <SuccessMessage>{text}</SuccessMessage>
  ) : (
    <ErrorMessage>{text}</ErrorMessage>
  );
}
