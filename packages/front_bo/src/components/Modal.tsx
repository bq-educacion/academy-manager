import { CloseButton, colors, styles } from "@academy-manager/ui";
import { RainbowDivider } from "@academy-manager/ui/src/theme/styles";
import styled from "@emotion/styled";
import { FC, ReactNode } from "react";

const Modal: FC<{
  setModal: (open: boolean) => void;
  title: string;
  endTitle?: string;
  children: ReactNode;
}> = ({ title, children, setModal, endTitle }) => {
  return (
    <>
      <Background
        onClick={() => {
          setModal(false);
        }}
      />
      <ModalWrapper>
        {title !== "" && (
          <>
            <Header>
              <styles.BoldP2>{title}</styles.BoldP2>
              <CloseButton onClick={() => setModal(false)} />
            </Header>
            <RainbowDivider />
          </>
        )}
        {title === "" && (
          <>
            <RainbowDivider />
            <Header end>
              <styles.BoldP2>{endTitle}</styles.BoldP2>
              <CloseButton onClick={() => setModal(false)} />
            </Header>
          </>
        )}
        <ModalContent>{children}</ModalContent>
      </ModalWrapper>
    </>
  );
};

export default Modal;

const Background = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  backdrop-filter: blur(3px);
  background-color: ${colors.colors.whiteTransparent};
`;

const ModalContent = styled.div`
  padding: 30px 45px;
  overflow: visible;
`;

const ModalWrapper = styled.div`
  z-index: 20;
  position: fixed;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  box-shadow: 0 10px 20px 0 ${colors.colors.shadow2};
  display: flex;
  flex-direction: column;
  width: 480px;
  height: auto;
  min-height: 150px;
  max-height: 800px;
  background-color: ${colors.colors.white};
`;

const Header = styled.div<{ end?: boolean }>`
  display: flex;
  justify-content: space-between;
  margin: 28px 45px;
  ${(props) => props.end && `margin-bottom: -15px;`}
`;
