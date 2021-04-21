import React, { FormEvent, useState } from "react";

import { Input, Textarea } from "./styles";

import {
  AbsolutePositioningButtonDiv,
  ButtonContainerLeft,
  ButtonDivChild,
  ButtonSubmit,
  ModalBackground,
  Modal,
} from "../../styles/reuseStyles";

import {
  AiOutlineClose,
  AiOutlineLoading,
  AiOutlinePlus,
} from "react-icons/ai";
import api from "../../services/api";
import { abort } from "node:process";

interface ModalFormProps {
  loading: boolean;
  setParentState: any;
  abort: Function;
}

export default function ModalForm({
  loading,
  setParentState,
  abort,
}: ModalFormProps) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  async function handleSubmit(e: FormEvent) {
    try {
      e.preventDefault();

      setParentState({ loading: true });

      // Excluir espaços e '#'
      const regex = new RegExp("# ");

      const newTool = {
        title,
        link,
        description,
        tags: tags.split(regex).filter((eachTag) => eachTag),
      };

      await api.post("tools", newTool);

      console.log(newTool);

      await api
        .get("tools?_sort=id&_order=desc")
        .then((response) =>
          setParentState({ toolsData: response.data, toolsView: response.data })
        );

      setParentState({
        isModalFormOpen: false,
        loading: false,
      });

      console.log("Requisição feita com sucesso");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ModalBackground>
      <Modal>
        <AbsolutePositioningButtonDiv>
          <ButtonDivChild onClick={() => abort()}>
            <AiOutlineClose size="20px" />
          </ButtonDivChild>
        </AbsolutePositioningButtonDiv>

        <div className="title-column">
          <AiOutlinePlus size="26px" />
          <h1>Add New Tool</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Tool Name</label>
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />

          <label>Tool Link</label>
          <Input
            value={link}
            onChange={(event) => setLink(event.target.value)}
            type="url"
            required
          />

          <label>Tool Description</label>
          <Textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />

          <label>Tags</label>
          <Input
            value={tags}
            onChange={(event) => setTags(event.target.value)}
          />
          <ButtonContainerLeft>
            <ButtonSubmit $loading={loading}>
              {loading ? <AiOutlineLoading /> : "Add tool"}
            </ButtonSubmit>
          </ButtonContainerLeft>
        </form>
      </Modal>
    </ModalBackground>
  );
}
