import styled from "@emotion/styled";
import { FC, useEffect, useState } from "react";
import { colors } from "../theme";

const InputSuper: FC<{
  placeholder?: string;
  setInput: (text: string) => void;
  input: string;
  height?: string;
  width?: string;
  disabled?: boolean;
  error?: boolean;
  setError?: (error: boolean) => void;
  type?: string;
  telPattern?: boolean;
  timePattern?: boolean;
  datePattern?: boolean;
  namePattern?: boolean;
  textArea?: boolean;
  setValid?: (valid: boolean) => void;
  onEnter?: () => void;
  onBlur?: () => void;
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
  namePattern,
  setError,
  textArea,
  onEnter,
  width,
  onBlur,
}) => {
  const InputType = type ? type : "text";
  const [localError, setLocalError] = useState<boolean>(error ? true : false);
  useEffect(() => {
    setLocalError(error ? true : false);
  }, [error]);
  if (!textArea) {
    return (
      <InputStyled
        onBlur={() => {
          {
            onBlur && onBlur();
          }
        }}
        width={width ? width : "auto"}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onEnter && onEnter();
          }
        }}
        disabled={disabled}
        placeholder={placeholder ? placeholder : ""}
        value={input}
        onChange={(e) => {
          setValid && setValid(e.target.validity.valid);
          if (telPattern) {
            setInput(e.target.value.replace(/[^0-9+]/g, ""));
          }
          if (namePattern) {
            setInput(e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s']/g, ""));
          }
          if (timePattern) {
            setInput(e.target.value.replace(/[^0-9:]/g, ""));
            if (setValid) {
              if (
                !e.target.value
                  .replace(/[^0-9:]/g, "")
                  .match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
              ) {
                setValid(true);
              } else {
                setValid(false);
              }
            }
          }
          if (datePattern) {
            setInput(e.target.value.replace(/[^0-9/]/g, ""));
          }
          if (!telPattern && !timePattern && !datePattern && !namePattern) {
            setInput(e.target.value);
          }
        }}
        height={height}
        error={localError}
        onClick={() => {
          setLocalError(false);
          setError && setError(false);
        }}
        type={!disabled ? InputType : ""}
      />
    );
  } else {
    return (
      <AreaStyled
        onBlur={() => {
          {
            onBlur && onBlur();
          }
        }}
        width={width ? width : "auto"}
        height={height}
        disabled={disabled}
        placeholder={placeholder ? placeholder : ""}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        error={localError}
        onClick={() => {
          setLocalError(false);
          setError && setError(false);
        }}
      />
    );
  }
};

export default InputSuper;

const InputStyled = styled.input<{
  height?: string;
  width: string;
  disabled?: boolean;
  error?: boolean;
}>`
  font-family: Roboto;
  font-size: 14px;
  line-height: 1.43;
  color: ${colors.colors.black};
  padding: 0 0 0 20px;
  border-radius: 3px;
  width: ${(props) => props.width};
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
  color: ${colors.colors.red2};
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

const AreaStyled = styled.textarea<{
  height?: string;
  disabled?: boolean;
  error?: boolean;
  width?: string;
}>`
  font-family: Roboto;
  font-size: 14px;
  line-height: 1.43;
  color: ${colors.colors.black};
  padding: 10px 0 0 20px;
  border-radius: 3px;
  border: solid 1px ${colors.colors.gray};
  height: ${(props) => (props.height ? props.height : "40px")};
  width: ${(props) => (props.width ? props.width : "100%")};
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
  color: ${colors.colors.red2};
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
