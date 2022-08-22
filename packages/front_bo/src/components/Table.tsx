import { colors, Icon, styles } from "@academy-manager/ui";
import styled from "@emotion/styled";
import React, { Dispatch, SetStateAction } from "react";
import {
  OrderFilter,
  OrderFilterGroup,
  OrderFilterInstructor,
} from "../generated/graphql";

type Data = {
  id: string;
};

type TableProps<T> = {
  data: T[];
  columns: {
    label: string;
    key: OrderFilterGroup | OrderFilter | OrderFilterInstructor;
    content: (item: T) => React.ReactNode;
  }[];
  order: {
    key: OrderFilter | OrderFilterGroup | OrderFilterInstructor;
    direction: number;
  };
  onSetOrder: Dispatch<
    SetStateAction<{
      key: OrderFilter | OrderFilterGroup | OrderFilterInstructor;
      direction: number;
    }>
  >;
};

const Table = <T extends Data>({
  data,
  columns,
  order,
  onSetOrder,
}: TableProps<T>) => {
  return (
    <TableGrid columns={columns.length}>
      {columns.map((column) => (
        <HeaderCell
          key={column.key}
          onClick={() => {
            onSetOrder({
              key: column.key as OrderFilter,
              direction: -order.direction,
            });
          }}
        >
          <styles.BoldP4>{column.label}</styles.BoldP4>
          <Icon
            name={
              order.key === column.key
                ? order.direction === 1
                  ? "order-up"
                  : "order-down"
                : "order-non"
            }
          />
        </HeaderCell>
      ))}
      {data.map((item) => (
        <React.Fragment key={item.id}>
          {columns.map((column) => (
            <Cell key={`${item.id}-${column.key}`}>{column.content(item)}</Cell>
          ))}
        </React.Fragment>
      ))}
    </TableGrid>
  );
};

const TableGrid = styled.div<{ columns: number }>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
`;

const HeaderCell = styled.div`
  display: flex;
  grid-row-start: 1;
  grid-row-end: 1;
  & > svg {
    margin-left: 5px;
  }
  border-bottom: 1px solid ${colors.colors.grayBlue2};
  border-left: solid 1px ${colors.colors.grayBlue};
  padding: 12px 1px 9px 2em;
  justify-content: flex-start;
  & > * {
    cursor: pointer;
  }
`;

const Cell = styled.div`
  display: flex;
  height: 39px;
  align-items: center;
  border-bottom: solid 1px ${colors.colors.grayBlue};
  border-left: solid 1px ${colors.colors.grayBlue};
  min-width: max-content;
  justify-content: flex-start;
  padding: 0 2em;
  overflow: visible;
`;

export default Table;
