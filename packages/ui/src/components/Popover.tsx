import styled from "@emotion/styled";
import React from "react";
import { useState } from "react";
import { FC, ReactNode } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";

export type PopoverProps = {
  title: ReactNode;
  content: ReactNode;
};

const Popover: FC<PopoverProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useDetectClickOutside({
    onTriggered: () => {
      setIsOpen(false);
    },
  });

  return (
    <PopoverWrapper ref={ref}>
      <PopoverTitle
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {title}
      </PopoverTitle>
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

const PopoverTitle = styled.div`
  margin: 0;
`;

const PopoverContent = styled.div<{ open: boolean }>`
  display: ${(props) => (props.open ? "flex" : "none")};
  position: absolute;
  z-index: 2;
  margin-top: 55px;
`;
