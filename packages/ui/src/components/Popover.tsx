import styled from "@emotion/styled";
import { useRef, useState } from "react";
import { FC, ReactNode } from "react";
import useClickOutside from "../hooks/useClickOutside";

export type Popoverprops = {
  title: ReactNode;
  content: ReactNode;
};

const Popover: FC<Popoverprops> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useClickOutside(popoverRef, () => setIsOpen(false));

  return (
    <PopoverWrapper
      ref={popoverRef}
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      {title}
      <PopoverContent open={isOpen}>{content}</PopoverContent>
    </PopoverWrapper>
  );
};

export default Popover;

const PopoverWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PopoverContent = styled.div<{ open: boolean }>`
  display: ${(props) => (props.open ? "block" : "none")};
  position: absolute;
  z-index: 20;
  margin-top: 55px;
`;
