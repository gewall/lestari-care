import { ButtonGroup, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const Paging = ({ api, setData }) => {
  const [skip, setSkip] = useState(0);

  const onNext = async (val) => {
    let _skip = skip + val;
    const req = await fetch(`${api}?skip=${_skip}`);
    const res = await req.json();

    if (!req.ok) {
      return;
    }

    setSkip(skip + val);
    setData(res);
  };

  const onBack = async (val) => {
    let _skip = skip - val;
    const req = await fetch(`${api}?skip=${_skip}`);
    const res = await req.json();

    if (!req.ok) {
      return;
    }

    setSkip(skip - val);
    setData(res);
  };

  return (
    <ButtonGroup>
      <IconButton
        variant="outline"
        colorScheme="teal"
        onClick={() => onBack(5)}
        size={"sm"}
        icon={<AiOutlineArrowLeft />}
      />
      <IconButton
        variant="outline"
        colorScheme="teal"
        size={"sm"}
        onClick={() => onNext(5)}
        icon={<AiOutlineArrowRight />}
      />
    </ButtonGroup>
  );
};

export default Paging;
