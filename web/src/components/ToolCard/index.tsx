import React from "react";
import { Description, ElementBody, Hashtags, TitleCard } from "./styles";
import {
  AbsolutePositioningButtonDiv,
  ButtonDivChild,
} from "../../styles/reuseStyles";
import ModalRemoveCard from "../ModalConfirmRemove";
import { FiTrash2 } from "react-icons/fi";

interface Props {
  id: number;
  title: string;
  link: string;
  description?: string;
  tags?: String[];
  toggle: (tool: Tool) => void;
}

interface Tool {
  id: number;
  title: string;
}

export default function ToolCard({
  id,
  title,
  description,
  link,
  tags,
  toggle,
}: Props) {
  const tool = { id, title };
  return (
    <ElementBody key={id}>
      <AbsolutePositioningButtonDiv title="Delete">
        <ButtonDivChild onClick={() => toggle(tool)}>
          <FiTrash2 size="16px" />
        </ButtonDivChild>
      </AbsolutePositioningButtonDiv>

      <TitleCard href={link}>{title}</TitleCard>
      <Description>{description}</Description>

      <Hashtags>
        {tags?.map((tag, index) => {
          return <span key={index}>#{tag}</span>;
        })}
      </Hashtags>
    </ElementBody>
  );
}
