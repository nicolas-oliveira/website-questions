import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { Description, ElementBody, Hashtags, TitleCard } from "./styles";
import {
  AbsolutePositioningButtonDiv,
  ButtonDivChild,
} from "../../styles/reuseStyles";

interface ToolCardContent {
  id: number;
  title: string;
  link: string;
  description: string;
  tags: String[];
  toggle: any;
}

export default function ToolCard({
  id,
  title,
  description,
  link,
  tags,
  toggle,
}: ToolCardContent) {
  return (
    <ElementBody key={id}>
      <AbsolutePositioningButtonDiv title="Delete">
        <ButtonDivChild onClick={() => toggle()}>
          <FiTrash2 size="16px" />
        </ButtonDivChild>
      </AbsolutePositioningButtonDiv>

      <TitleCard href={link}>{title}</TitleCard>
      <Description>{description}</Description>

      <Hashtags>
        {tags?.map((tag) => {
          return <span>#{tag}</span>;
        })}
      </Hashtags>
    </ElementBody>
  );
}
// export default function TooCard() {
//   return <div></div>;
// }
