import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { Description, ElementBody, Hashtags, Title } from "./styles";
import {
  AbsolutePositioningButtonDiv,
  ButtonDivChild,
} from "../../styles/reuseStyles";

interface ListContent {
  title: string;
  link: string;
  description: string;
  tags: Array<string>;
}

export default function List({ title, description, link, tags }: ListContent) {
  return (
    <ElementBody>
      <AbsolutePositioningButtonDiv title="Delete">
        <ButtonDivChild>
          <FiTrash2 size="16px" />
        </ButtonDivChild>
      </AbsolutePositioningButtonDiv>

      <Title href={link}>{title}</Title>
      <Description>{description}</Description>

      <Hashtags>
        {tags?.map((tag, index) => {
          return <span key={index}>#{tag}</span>;
        })}
      </Hashtags>
    </ElementBody>
  );
}
