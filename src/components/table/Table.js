import {
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Table as CTable,
} from "@chakra-ui/react";
import React, { Fragment } from "react";

const Table = ({ children, head, foot, caption, size }) => {
  return (
    <TableContainer>
      <CTable variant="simple" size={size}>
        <TableCaption>{caption}</TableCaption>
        <Thead>
          <Tr>
            {head?.map((item, i) => (
              <Fragment key={i}>
                <Th>{item}</Th>
              </Fragment>
            ))}
          </Tr>
        </Thead>
        <Tbody>{children}</Tbody>
        {/* <Tfoot>
          <Tr>
            {foot?.map((item, i) => (
              <Fragment key={i}>
                <Th>{item}</Th>
              </Fragment>
            ))}
          </Tr>
        </Tfoot> */}
      </CTable>
    </TableContainer>
  );
};

export default Table;
