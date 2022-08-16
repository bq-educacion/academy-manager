import React from "react";
import styled from "@emotion/styled";

// check this: https://www.developerway.com/posts/typescript-generics-for-react-developers

type Data = {
  id: string;
};

type TableProps<T> = {
  data: T[];
  columns: {
    label: string;
    key: string;
    content: (item: T) => React.ReactNode;
  }[];
  order: { key: string; direction: number };

  onSetOrder: (key: string, direction: number) => void;
};

const Table = <T extends Data>({
  data,
  columns,
  order,
  onSetOrder,
}: TableProps<T>) => (
  <TableGrid columns={data.length}>
    {columns.map((column) => (
      <HeaderCell onClick={() => onSetOrder(column.key, -1 * order.direction)}>
        {column.label}
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
const TableGrid = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(columns, auto);
`;

const Cell = styled.div`
  background-color: grey;
`;

const HeaderCell = styled.div`
  background-color: red;
`;

export default Table;
