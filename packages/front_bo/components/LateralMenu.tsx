import styled from "@emotion/styled";
import { FC, useState } from "react";
import LogoBQ from "../public/images/bq-logo.svg";
import { A, P4 } from "@academy-manager/ui/src/theme/styles";
import { Triangle } from "@academy-manager/ui/src/assets/icons";

type LateralMenuProps = {
  changeSection: (section: string) => void;
  changeLabel: (label: string) => void;
  sections: {
    title: string;
    links: {
      label: string;
      href: string;
    }[];
  }[];
};

export const LateralMenu: FC<LateralMenuProps> = ({ sections, changeLabel, changeSection }) => {
  return (
    <LateralContainer>
      <LateralMenuItem top={35} left={43} bottom={26}>
        <LogoBQ />
      </LateralMenuItem>

      {sections?.map((elem) => {
        const [clicked, setClicked] = useState<boolean>(false);
        return (
          <>
            <LateralMenuItem
              top={15}
              left={45}
              bottom={14}
              clicked={clicked}
              onClick={() => {
                setClicked(!clicked);
                changeSection(elem.title);
                {elem.links[0] && changeLabel(elem.links[0].label);}
              }}
            >
              <P4Lateral>{elem.title}</P4Lateral>
              <TriangleLateral clicked={clicked} />
            </LateralMenuItem>
            {clicked &&
              (
                <LinksLateral top={15} left={45} bottom={15}>
                  {clicked &&
                    elem.links.map((link) => {
                      return <ALateral onClick={()=>{
                        changeLabel(link.label);
                        changeSection(elem.title);
                      }}>{link.label}</ALateral>
                    })}
                </LinksLateral>
              )}
          </>
        );
      })}
    </LateralContainer>
  );
};

const LateralContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 250px;
    background-color: #3d3e42;
    color: #ffff;
    
`;

const LateralMenuItem = styled.div<
  { left: number; top: number; bottom: number; clicked?: boolean }
>`
    width: 100%;
    transition: border-bottom 0.3s ease-in-out;
    border-bottom: 1px solid rgba(109, 108, 108, ${(props) =>
  props.clicked ? 0.3 : 1});
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
    &:hover {
      cursor: pointer;
    }
`;

const TriangleLateral = styled(Triangle)<{ clicked: boolean }>`

  transform-origin: center;
  transition: transform 0.3s ease-in-out;
  &:hover {
      cursor: pointer;
    }
  transform: ${(props) => props.clicked ? "rotate(-90deg)" : "rotate(0deg)"};
  margin-right: 20px;
`;

const LinksLateral = styled.div<{ left: number; top: number; bottom: number; clicked?: boolean }>`
    display: flex;
    flex-direction: column;
    width: 100%;
    border-bottom: 1px solid rgba(109, 108, 108);
    margin-top: ${(props) => props.top}px;
    padding-bottom: ${(props) => props.bottom}px;
    & > * {
        margin: 5px 0 5px ${(props) => props.left}px;
    }
`;

const ALateral = styled(A)`
    color: #ffff;
    font-size: 14px;
    font-weight: normal;
    line-height: 1.43;
`;
