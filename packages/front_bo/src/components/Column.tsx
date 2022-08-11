import { colors, Icon, styles } from "@academy-manager/ui";
import styled from "@emotion/styled";
import { FC } from "react";

const Column: FC<{
  order: number;
  width: number;
  title: string;
  content: (string | undefined)[] | undefined;
  ChangeOrder: (order: number) => void;
  ChangeOrderFilter: (filter: string) => void;
}> = ({ order, width, title, content, ChangeOrder }) => {
  return (
    <ColumnContainer width={width}>
      <ColumnHeader
        onClick={() => {
          order == 1 ? ChangeOrder(-1) : ChangeOrder(1);
        }}
      >
        <BoldP4>{title}</BoldP4>
        <Icon name={order == 1 ? "order-up" : "order-down"} />
      </ColumnHeader>
      {content && (
        <div>
          {content.map((item, index) => {
            return (
              <div key={index}>
                <p>{item}</p>
              </div>
            );
          })}
        </div>
      )}
    </ColumnContainer>
  );
};

export default Column;

const ColumnContainer = styled.div<{ width: number }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: ${(props) => props.width}px;
  border-left: 1px solid ${colors.colors.grayBlueTransparent};
  transition: all 1s ease-out;
`;

const ColumnHeader = styled.div`
  display: flex;
  flex-direction: row;
  & > svg {
    margin-left: 5px;
  }
  width: calc(100% - 52px);
  border-bottom: 1px solid ${colors.colors.grayBlue2};
  padding: 12px 1px 9px 52px;
  & > * {
    cursor: pointer;
  }
`;

const BoldP4 = styled(styles.P4)`
  font-weight: bold;
`;
