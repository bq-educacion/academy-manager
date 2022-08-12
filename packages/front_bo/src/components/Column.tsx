import { colors, Icon, styles } from "@academy-manager/ui";
import styled from "@emotion/styled";
import { FC, SetStateAction } from "react";
import { OrderFilter } from "../generated/graphql";

const Column: FC<{
  filter: OrderFilter;
  actualFilter: OrderFilter;
  order: number;
  title: string;
  content: (string | undefined)[] | undefined;
  center: boolean;
  ChangeOrder: (order: number) => void;
  ChangeOrderFilter: (filter: SetStateAction<OrderFilter>) => void;
}> = ({
  order,
  title,
  content,
  ChangeOrder,
  center,
  filter,
  actualFilter,
  ChangeOrderFilter,
}) => {
  return (
    <ColumnContainer>
      <ColumnHeader
        center={center}
        onClick={() => {
          order == 1 ? ChangeOrder(-1) : ChangeOrder(1);
          {
            filter !== actualFilter && ChangeOrderFilter(filter);
          }
        }}
      >
        <BoldP4>{title}</BoldP4>
        <Icon
          name={
            actualFilter == filter
              ? order == 1
                ? "order-up"
                : "order-down"
              : "order-non"
          }
        />
      </ColumnHeader>
      {content && (
        <ColumnContentGeneral>
          {content.map((item, index) => {
            return (
              <ColumnContent center={center} key={index}>
                <p>{item}</p>
              </ColumnContent>
            );
          })}
        </ColumnContentGeneral>
      )}
    </ColumnContainer>
  );
};

export default Column;

const ColumnContentGeneral = styled.div`
  width: 100%;
`;

const ColumnContent = styled.div<{ center: boolean }>`
  display: flex;
  height: 39px;
  align-items: center;
  border-bottom: solid 1px ${colors.colors.grayBlue};
  min-width: max-content;
  ${(props) =>
    props.center
      ? `justify-content: center;& > p {margin: 0 20px;}`
      : `& > p {margin: 0 20px 0 52px;}`};
  overflow: visible;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  border-left: 1px solid ${colors.colors.grayBlue};
  transition: all 1s ease-out;
`;

const ColumnHeader = styled.div<{ center: boolean }>`
  display: flex;
  flex-direction: row;
  & > svg {
    margin-left: 5px;
  }
  ${(props) => (props.center ? `width: 100%;` : `width: calc(100% - 52px);`)};
  border-bottom: 1px solid ${colors.colors.grayBlue2};
  padding: 12px 1px 9px 0;
  ${(props) =>
    props.center ? `justify-content: center;` : `padding-left: 52px;`};

  & > * {
    cursor: pointer;
  }
`;

const BoldP4 = styled(styles.P4)`
  font-weight: bold;
`;
