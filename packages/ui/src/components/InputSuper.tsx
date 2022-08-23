import styled from "@emotion/styled";
import { FC } from "react";
import { colors } from "../theme";

const InputSuper: FC<{
  placeholder?: string;
  setInput: (text: string) => void;
  input: string;
  backgroundColor?: string;
  type?: string;
  height?: string;
  disabled?: boolean;
}> = ({
  placeholder,
  setInput,
  input,
  type,
  backgroundColor,
  disabled,
  height,
}) => {
  return (
    <InputStyled
      disabled={disabled}
      placeholder={placeholder ? placeholder : ""}
      type={type ? type : "text"}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      background={backgroundColor}
      height={height}
    />
  );
};

export default InputSuper;

const InputStyled = styled.input<{
  height?: string;
  disabled?: boolean;
  background?: string;
}>`
  padding: 0 0 0 20px;
  border-radius: 3px;
  border: solid 1px ${colors.colors.gray};
  height: ${(props) => (props.height ? props.height : "40px")};
  ${({ background, disabled }) =>
    disabled
      ? `background-color: ${colors.colors.gray2}`
      : background && `background-color: ${background};`}
  &::placeholder {
    height: ${(props) => props.height && "position: absolute;top: 15px;"};
    font-style: italic;
    line-height: 1.07;
    color: ${colors.colors.gray2};
  }
`;
