import styled from "@emotion/styled";
import { FC, useState } from "react";
import LogoBQ from "../public/images/bq-logo.svg";
import { P4 } from "@academy-manager/ui/src/theme/styles";
import { Triangle } from "@academy-manager/ui/src/assets/icons";

export const LateralMenu: FC = () => {
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <LateralContainer onClick={()=>{setClicked(!clicked)}}>
      <LateralMenuItem top={35} left={43} bottom={26}>
        <LogoBQ />
      </LateralMenuItem>
      <LateralMenuItem top={15} left={45} bottom={14}>
        <P4Lateral>Contabilidad</P4Lateral>
        <TriangleLateral clicked={clicked} />
      </LateralMenuItem>
      <LateralMenuItem top={15} left={45} bottom={14}>
        <P4Lateral>Traducción</P4Lateral>
        <TriangleLateral clicked={clicked} />
      </LateralMenuItem>
      <LateralMenuItem top={15} left={45} bottom={14}>
        <P4Lateral>Otra sección</P4Lateral>
        <TriangleLateral clicked={clicked} />
      </LateralMenuItem>
    </LateralContainer>
  );
};

const LateralContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 250px;
    background-color: #3d3e42;
    color: #ffff;
    
`;

const LateralMenuItem = styled.div<
  { left: number; top: number; bottom: number }
>`
    width: 100%;
    border-bottom: 1px solid #6d6c6c;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    & > * {
        margin-left: ${(props) => props.left}px;
        margin-top: ${(props) => props.top}px;
        margin-bottom: ${(props) => props.bottom}px;
    }
`;

const P4Lateral = styled(P4)`
    color: #ffff;
`;

const TriangleLateral = styled(Triangle)<{ clicked: boolean }>`

  transform-origin: center;
  transition: transform 0.3s ease-in-out;

    ${(props) =>
  props.clicked
    ? `
        transform: rotate(-90deg);
    `
    : ``}
    margin-right: 20px;
`;
