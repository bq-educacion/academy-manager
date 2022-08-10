import styled from "@emotion/styled";
import { FC, Fragment, useState } from "react";
import {
  BQLogo,
  colors,
  Icon,
  styles,
  useTranslate,
} from "@academy-manager/ui";
import { useRouter } from "next/router";
import { ISection } from "../config";

type LateralMenuProps = {
  sections: ISection[];
  section?: string;
  label?: string;
};

const LateralMenu: FC<LateralMenuProps> = ({ sections, section, label }) => {
  const t = useTranslate();
  const router = useRouter();

  return (
    <LateralContainer>
      <LateralMenuItem top={35} left={43} bottom={26}>
        <BQLogo />
      </LateralMenuItem>

      {sections?.map((elem) => {
        const open: boolean = elem.title == section ? true : false;
        const [clicked, setClicked] = useState<boolean>(open);
        return (
          <Fragment key={elem.title}>
            <LateralMenuItem
              top={15}
              left={45}
              bottom={14}
              clicked={clicked}
              onClick={() => {
                setClicked(!clicked);
              }}
            >
              <P4Lateral>{t(elem.title)}</P4Lateral>
              <TriangleLateral name="triangle" clicked={clicked} />
            </LateralMenuItem>
            {clicked && (
              <LinksLateral top={15} left={45} bottom={15}>
                {clicked &&
                  elem.links.map((link) => {
                    return (
                      <ALateral
                        selected={link.label == label ? true : false}
                        key={link.label}
                        onClick={() => {
                          router.push(link.href);
                        }}
                      >
                        {t(link.label)}
                      </ALateral>
                    );
                  })}
              </LinksLateral>
            )}
          </Fragment>
        );
      })}
    </LateralContainer>
  );
};

export default LateralMenu;

const LateralContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 250px;
  background-color: ${colors.colors.blackBackground};
  color: ${colors.colors.white};
`;

const LateralMenuItem = styled.div<{
  left: number;
  top: number;
  bottom: number;
  clicked?: boolean;
}>`
  width: 100%;
  transition: border-bottom 0.3s ease-in-out;
  ${(props) =>
    props.clicked
      ? `border-bottom: 1px solid ${colors.colors.gray80Transparent}`
      : `border-bottom: 1px solid ${colors.colors.gray80}`};
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & > * {
    margin-left: ${(props) => props.left}px;
    margin-top: ${(props) => props.top}px;
    margin-bottom: ${(props) => props.bottom}px;
  }
`;

const P4Lateral = styled(styles.P4)`
  color: ${colors.colors.white};
  &:hover {
    cursor: pointer;
  }
`;

const TriangleLateral = styled(Icon)<{ clicked: boolean }>`
  color: ${colors.colors.white};
  transform-origin: center;
  transition: transform 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
  }
  transform: ${(props) => (props.clicked ? "rotate(-90deg)" : "rotate(0deg)")};
  margin-right: 20px;
`;

const LinksLateral = styled.div<{
  left: number;
  top: number;
  bottom: number;
  clicked?: boolean;
}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 1px solid ${colors.colors.gray80};
  margin-top: ${(props) => props.top}px;
  padding-bottom: ${(props) => props.bottom}px;
  & > * {
    margin: 5px 0 5px ${(props) => props.left}px;
  }
`;

const ALateral = styled(styles.A)<{ selected: boolean }>`
  color: ${(props) =>
    props.selected ? colors.colors.blue80 : colors.colors.white};
  font-size: 14px;
  font-weight: normal;
  line-height: 1.43;
`;
