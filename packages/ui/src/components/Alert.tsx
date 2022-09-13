import styled from "@emotion/styled";
import { FC } from "react";
import { colors, styles } from "../theme";
import Icon from "./Icon";

const Alert: FC<{
  ok?: boolean;
  bad?: boolean;
  title: string;
  setOpen: (value: boolean) => void;
}> = ({ ok, bad, title, setOpen }) => {
  if (ok) {
    return (
      <AlertContainer background={colors.colors.green80}>
        <AlertIcon>
          {ok && <Icon name="tick" negative={false} />}
          {bad && <Icon name="cross-bad" negative={false} />}
          <styles.P4>{title}</styles.P4>
        </AlertIcon>
        <CloseIcon
          onClick={() => {
            setOpen(false);
          }}
        >
          <Icon name="close-cross" negative={false} />
        </CloseIcon>
      </AlertContainer>
    );
  }
  if (bad) {
    return (
      <AlertContainer background={colors.colors.red80}>
        <AlertIcon>
          {ok && <Icon name="tick" negative={false} />}
          {bad && <Icon name="cross-bad" negative={false} />}
          <styles.P4>{title}</styles.P4>
        </AlertIcon>
        <CloseIcon
          onClick={() => {
            setOpen(false);
          }}
        >
          <Icon name="close-cross" negative={false} />
        </CloseIcon>
      </AlertContainer>
    );
  } else {
    return <></>;
  }
};

export default Alert;

const AlertContainer = styled.div<{ background: string }>`
  background-color: ${(props) => props.background};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  z-index: 99999;
  bottom: 40px;
  right: 30px;
  width: 180px;
  height: 40px;
  color: ${colors.colors.white};
  margin: 0 10px;
  border-radius: 3px;
`;

const AlertIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  & > * {
    margin-right: 5px;
  }
`;

const CloseIcon = styled.div`
  & > * {
    cursor: pointer;
  }
  color: ${colors.colors.white};
`;
