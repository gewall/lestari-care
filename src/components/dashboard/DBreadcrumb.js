"use client";

import React, { Fragment } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { AiOutlineDoubleRight } from "react-icons/ai";
const DBreadcrumb = ({ links }) => {
  return (
    <Breadcrumb>
      <AiOutlineDoubleRight />
      {links.map((item, i) => {
        return (
          <Fragment key={i}>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${item.toLowerCase()}`}>
                {item} /{" "}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Fragment>
        );
      })}
    </Breadcrumb>
  );
};

export default DBreadcrumb;
