import styled from "@emotion/styled";
import { FC } from "react";
import { colors } from "../theme";

const InputSuper: FC<{
  placeholder?: string;
  setInput: (text: string) => void;
  input: string;
  backgroundColor?: string;
  type?: string;
}> = ({ placeholder, setInput, input, type, backgroundColor }) => {
  return (
    <InputStyled
      placeholder={placeholder ? placeholder : ""}
      type={type ? type : "text"}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      background={backgroundColor}
    />
  );
};

export default InputSuper;

const InputStyled = styled.input<{ background?: string }>`
  padding-left: 20px;
  border-radius: 3px;
  border: solid 1px ${colors.colors.gray};
  height: 40px;
  ${({ background }) => background && `background-color: ${background};`}
  &::placeholder {
    font-style: italic;
    line-height: 1.07;
    color: ${colors.colors.gray2};
  }
`;
