import React from "react";
import styled from "@emotion/styled";

// check this: https://www.developerway.com/posts/typescript-generics-for-react-developers

type Data = {
  id: string;
};

type TableProps<T> = {
  data: T[];
  columns: { label: string; key: string }[];
  order: { key: string; direction: number };
  onSetOrder: (key: string, direction: number) => void;
};

const Table = <T extends Data>({
  data,
  columns,
  order,
  onSetOrder,
}: TableProps<T>) => {
  // eslint-disable-next-line
  const valueByKey = (o: Object, s: string) => {
    s = s.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
    s = s.replace(/^\./, ""); // strip a leading dot
    const key = s.split(".");

    // eslint-disable-next-line
    return key.reduce((acc, k) => acc[k as keyof Object], o);
  };

  return (
    <TableGrid columns={data.length}>
      {columns.map((column) => (
        <HeaderCell
          onClick={() => onSetOrder(column.key, -1 * order.direction)}
        >
          {column.label}
        </HeaderCell>
      ))}
      {data.map((item) => (
        <React.Fragment key={item.id}>
          {columns.map((column) => (
            <Cell key={`${item.id}-${column.key}`}>
              {Array.isArray(valueByKey(item, column.key))
                ? (valueByKey(item, column.key) as Array<string | number>).join(
                    ", "
                  )
                : valueByKey(item, column.key).toString()}
            </Cell>
          ))}
        </React.Fragment>
      ))}
    </TableGrid>
  );
};

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
