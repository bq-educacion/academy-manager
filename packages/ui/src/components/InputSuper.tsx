import styled from "@emotion/styled";
import { FC } from "react";
import { colors } from "../theme";

const InputSuper: FC<{
  placeholder?: string;
  setInput: (text: string) => void;
  input: string;
  height?: string;
  disabled?: boolean;
  error?: boolean;
}> = ({ placeholder, setInput, input, disabled, height, error }) => {
  return (
    <>
      <InputStyled
        disabled={disabled}
        placeholder={placeholder ? placeholder : ""}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        height={height}
        error={error}
      />
    </>
  );
};

export default InputSuper;

const InputStyled = styled.input<{
  height?: string;
  disabled?: boolean;
  error?: boolean;
}>`
  padding: 0 0 0 20px;
  border-radius: 3px;
  border: solid 1px ${colors.colors.gray};
  height: ${(props) => (props.height ? props.height : "40px")};
  &::placeholder {
    font-style: italic;
    line-height: 1;
  }
  ${({ disabled }) =>
    disabled &&
    `background-color: ${colors.colors.grayBlue}; pointer-events: none;`}
  ${({ error }) =>
    error &&
    `
  border: solid 1px ${colors.colors.red1}; 
  background-color: ${colors.colors.pink1} !important; 
  pointer-events: none;
  `}
  &::placeholder {
    height: ${(props) => props.height && "position: absolute;top: 15px;"};
    line-height: 1.07;
    color: ${colors.colors.gray2};
    ${(props) => props.error && `color: ${colors.colors.red1}`}
  }
  &:hover {
    border: solid 1px ${colors.colors.blackBackground};
  }
`;
