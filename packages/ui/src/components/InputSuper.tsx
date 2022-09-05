import styled from "@emotion/styled";
import { FC, useEffect, useState } from "react";
import { colors } from "../theme";

const InputSuper: FC<{
  placeholder?: string;
  setInput: (text: string) => void;
  input: string;
  height?: string;
  disabled?: boolean;
  error?: boolean;
  type?: string;
  telPattern?: boolean;
  timePattern?: boolean;
  datePattern?: boolean;
  setValid?: (valid: boolean) => void;
}> = ({
  placeholder,
  setInput,
  input,
  disabled,
  height,
  error,
  type,
  telPattern,
  setValid,
  timePattern,
  datePattern,
}) => {
  const [InputType, setInputType] = useState<string>(type ? type : "text");
  const [localError, setLocalError] = useState<boolean>(error ? true : false);
  useEffect(() => {
    setLocalError(error ? true : false);
  }, [error]);
  return (
    <InputStyled
      disabled={disabled}
      placeholder={placeholder ? placeholder : ""}
      value={input}
      onChange={(e) => {
        setValid && setValid(e.target.validity.valid);
        if (telPattern) {
          setInput(e.target.value.replace(/[^0-9+]/g, ""));
        }
        if (timePattern) {
          setInput(e.target.value.replace(/[^0-9:]/g, ""));
        }
        if (datePattern) {
          setInput(e.target.value.replace(/[^0-9/]/g, ""));
        } else {
          setInput(e.target.value);
        }
      }}
      height={height}
      error={localError}
      onClick={() => {
        setLocalError(false);
        if (datePattern) {
          setInputType("date");
        }
      }}
      type={!disabled ? InputType : ""}
    />
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
  background-color: ${colors.colors.pink1}; 
  `}
  &::placeholder {
    height: ${(props) => props.height && "position: absolute;top: 15px;"};
    line-height: 1.07;
    color: ${colors.colors.gray2};
    ${(props) => props.error && `color: ${colors.colors.red1}`}
  }
  &:hover {
    ${({ error }) =>
      !error && `border: solid 1px ${colors.colors.blackBackground};`}
  }
`;
