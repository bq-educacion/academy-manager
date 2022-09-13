import { colors, Icon, styles } from "@academy-manager/ui";
import styled from "@emotion/styled";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  OrderFilterCenter,
  OrderFilterGroup,
  OrderFilterInstructor,
  OrderFilterStudent,
} from "../generated/graphql";

type Data = {
  id: string;
};

type TableProps<T> = {
  data: T[];
  columns: {
    label: string;
    key:
      | OrderFilterGroup
      | OrderFilterCenter
      | OrderFilterInstructor
      | OrderFilterStudent;
    content: (item: T) => React.ReactNode;
  }[];
  order: {
    key:
      | OrderFilterCenter
      | OrderFilterGroup
      | OrderFilterInstructor
      | OrderFilterStudent;
    direction: number;
  };
  onSetOrder: Dispatch<
    SetStateAction<{
      key:
        | OrderFilterCenter
        | OrderFilterGroup
        | OrderFilterInstructor
        | OrderFilterStudent;
      direction: number;
    }>
  >;
  onClickRow?: (id: string) => void;
  inactiveIndexes: number[];
};

const Table = <T extends Data>({
  data,
  columns,
  order,
  onSetOrder,
  onClickRow,
  inactiveIndexes,
}: TableProps<T>) => {
  const [hover, setHover] = useState<string>("");

  return (
    <TableGrid columns={columns.length}>
      {columns.map((column) => (
        <HeaderCell
          key={column.key}
          onClick={() => {
            onSetOrder({
              key: column.key,
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
      {data.map((item, index) => (
        <React.Fragment key={item.id}>
          {columns.map((column) => (
            <Cell
              InactiveIndexes={inactiveIndexes}
              HoverLine={hover}
              onMouseEnter={() => {
                setHover(`H${index}`);
              }}
              onMouseLeave={() => {
                setHover("");
              }}
              onClick={() => {
                if (onClickRow) {
                  onClickRow(item.id);
                }
              }}
              className={`H${index}`}
              key={`${item.id}-${column.key}`}
            >
              {column.content(item)}
            </Cell>
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
  position: sticky;
  top: 0;
  background-color: ${colors.colors.white};
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
  min-width: max-content;
  & > div {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const Cell = styled.div<{ HoverLine: string; InactiveIndexes?: number[] }>`
  display: flex;
  height: 39px;
  align-items: center;
  border-bottom: solid 1px ${colors.colors.grayBlue};
  border-left: solid 1px ${colors.colors.grayBlue};
  justify-content: flex-start;
  padding: 0 2em;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
  & > div {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  order: revert;

  ${(props) => {
    if (props.InactiveIndexes) {
      return props.InactiveIndexes.map((value) => {
        return `&.H${value} {
          background-color: ${colors.colors.red40Transparent};
          color: ${colors.colors.red80};
        }`;
      });
    }
  }}

  ${(props) => {
    if (
      props.HoverLine !== "" &&
      !props.InactiveIndexes?.includes(parseInt(props.HoverLine.slice(1)))
    ) {
      return `
        &.${props.HoverLine} {
          background-color: ${colors.colors.blue40Transparent1};
        }
      `;
    }
  }}
`;

export default Table;
