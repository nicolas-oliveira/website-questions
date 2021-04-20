import React from "react";

import {
  ButtonContainerLeft,
  ModalBackground,
  ButtonPrimary,
  ButtonAlert,
  Modal,
} from "../../styles/reuseStyles";

import { AiOutlineLoading } from "react-icons/ai";

interface Props {
  tool: Tool;
  abort: Function;
  removeItem: (id: number) => void;
  loading: boolean;
}

interface Tool {
  id: number;
  title: string;
}

export default function ModalConfirmRemove({
  tool,
  abort,
  removeItem,
  loading,
}: Props) {
  return (
    <ModalBackground>
      <Modal>
        <h1>Remove tool</h1>
        <p>Are you sure you want remove {tool.title}?</p>

        <ButtonContainerLeft>
          <ButtonPrimary onClick={() => abort()}>Cancel</ButtonPrimary>
          <ButtonAlert onClick={() => removeItem(tool.id)} $loading={loading}>
            {loading ? <AiOutlineLoading /> : "Yes, remove"}
          </ButtonAlert>
        </ButtonContainerLeft>
      </Modal>
    </ModalBackground>
  );
}
