import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { Description, ElementBody, Hashtags, Title } from "./styles";
import { IconButtonContainer, IconButton } from "../../styles/reuseStyles";

interface ListContent {
  title: string;
  link: string;
  description: string;
  tags: Array<string>;
}

export default function List({ title, description, link, tags }: ListContent) {
  return (
    <ElementBody>
      <IconButtonContainer title="Excluir">
        <IconButton>
          <FiTrash2 size="16px" />
        </IconButton>
      </IconButtonContainer>

      <Title href={link}>{title}</Title>
      <Description>{description}</Description>

      <Hashtags>
        {tags.map((tag) => {
          return <span key={tag}>#{tag}</span>;
        })}
      </Hashtags>
    </ElementBody>
  );
}
