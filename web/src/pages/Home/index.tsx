import React, { Component } from "react";

import {
  HomeContainer,
  Title,
  Subtitle,
  GroupSearch,
  Actions,
  Checkbox,
  Search,
} from "./styles";

import { ButtonPrimary } from "../../styles/reuseStyles";

import api from "../../services/api";

import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import ToolCard from "../../components/ToolCard";
import ModalConfirmRemove from "../../components/ModalConfirmRemove";
import ModalForm from "../../components/ModalForm";

interface state {
  // Abre e fecha o modal do formulário.
  isModalFormOpen: boolean;

  // Abre e fecha o modal de confirmação.
  isModalDeleteOpen: boolean;

  // Lista de objetos que representa as tools criadas pelo usuário.
  tools: ToolCardProps[];

  // Objeto que representa apenas uma ferramenta.
  tool: ToolProps;

  // Indica se certo elemento está carregando.
  loading: boolean;
}

interface ToolCardProps {
  id: number;
  title: string;
  link: string;
  description: string;
  tags: String[];
}

interface ToolProps {
  id: number;
  title: string;
}

export default class Home extends Component {
  state = {
    isModalDeleteOpen: false,
    isModalFormOpen: false,
    loading: false,
    tools: [],
    tool: { id: 0, title: "" },
  };

  componentDidMount() {
    const tools = localStorage.getItem("tools");
    if (tools) this.setState({ tools: JSON.parse(tools) });

    this.getItems();
  }

  componentDidUpdate(e: any, prevState: state) {
    const { isModalFormOpen, isModalDeleteOpen, tools } = this.state;
    const body = document.querySelector("body");

    if (prevState.tools !== tools) {
      localStorage.setItem("tools", JSON.stringify(tools));
    }

    if (isModalFormOpen || isModalDeleteOpen) {
      if (body) body.style.overflowY = "hidden";
    } else {
      if (body) body.style.overflowY = "auto";
    }
  }

  async getItems() {
    try {
      await api
        .get("tools?_sort=id&_order=desc")
        .then((response) => this.setState({ tools: response.data }));
    } catch (error) {
      console.error(error);
    }
  }

  toggleModalForm = () =>
    this.setState({ isModalFormOpen: !this.state.isModalFormOpen });

  // O parâmetro é definido anteriormente no ToolCard correspondente
  toggleModalDelete = (tool: ToolProps) =>
    this.setState({
      isModalDeleteOpen: !this.state.isModalDeleteOpen,
      tool: tool,
    });

  // Método responsável por desfazer a requisição.
  abortRequest = () => {
    const controller = new AbortController();

    controller.abort();

    this.setState({
      isModalDeleteOpen: false,
      isModalFormOpen: false,
      loading: false,
    });
  };

  removeItem = async (id: number) => {
    try {
      this.setState({ loading: true });

      const { tools } = this.state;

      await api.delete(`/tools/${id}`);

      this.setState({
        tools: tools.filter((e: ToolCardProps) => e.id !== id),
        isModalDeleteOpen: !this.state.isModalDeleteOpen,
        loading: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const {
      isModalFormOpen,
      isModalDeleteOpen,
      loading,
      tools,
      tool,
    } = this.state;

    return (
      <HomeContainer>
        <Title>VUTTR</Title>
        <Subtitle>Very Useful Tools to Remember</Subtitle>

        <Actions>
          <GroupSearch>
            <Search>
              <AiOutlineSearch size="16px" />
              <input type="text" />
            </Search>

            <Checkbox>
              <input type="checkbox" id="input" />
              <label htmlFor="input">search in tags only</label>
            </Checkbox>
          </GroupSearch>

          <ButtonPrimary onClick={() => this.toggleModalForm()}>
            <AiOutlinePlus />
            Add
          </ButtonPrimary>
        </Actions>

        {isModalFormOpen ? (
          <ModalForm
            loading={loading}
            abort={this.abortRequest.bind(this)}
            setParentState={this.setState.bind(this)}
          />
        ) : (
          ""
        )}

        {isModalDeleteOpen ? (
          <ModalConfirmRemove
            tool={tool}
            abort={this.abortRequest.bind(this)}
            removeItem={this.removeItem.bind(this)}
            loading={loading}
          />
        ) : (
          ""
        )}

        {tools.map(({ id, title, link, description, tags }: ToolCardProps) => {
          return (
            <ToolCard
              key={id}
              id={id}
              title={title}
              link={link}
              description={description}
              tags={tags}
              toggle={this.toggleModalDelete.bind(this)}
            />
          );
        })}
      </HomeContainer>
    );
  }
}
