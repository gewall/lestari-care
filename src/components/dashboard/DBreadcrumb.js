"use client";

import React, { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon,
  Text,
} from "@chakra-ui/react";
import { AiOutlineDoubleRight } from "react-icons/ai";
const DBreadcrumb = ({ links }) => {
  return (
    <Breadcrumb flexWrap={"wrap"} overflow={"hidden"} maxW={"75vw"}>
      <Icon as={AiOutlineDoubleRight} />
      {links.map((item, i) => {
        // console.log(i, links.length);
        return (
          <Fragment key={i}>
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/${links
                  .slice(0, i + 1)
                  .join("/")
                  .toLowerCase()}`}
              >
                {item}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {i + 1 !== links?.length && <Text>&nbsp;/&nbsp;</Text>}
          </Fragment>
        );
      })}
    </Breadcrumb>
  );
};

export default DBreadcrumb;
