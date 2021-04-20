import React, { Component, FormEvent } from "react";

import {
  HomeContainer,
  Title,
  Subtitle,
  GroupSearch,
  Actions,
  Checkbox,
  Search,
  Input,
  Textarea,
} from "./styles";

import {
  AbsolutePositioningButtonDiv,
  ButtonContainerLeft,
  ButtonDivChild,
  ButtonSubmit,
  ButtonPrimary,
  ModalBackground,
  Modal,
} from "../../styles/reuseStyles";

import api from "../../services/api";

import { AiOutlineClose, AiOutlineLoading } from "react-icons/ai";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import ToolCard from "../../components/ToolCard";
import ModalConfirmRemove from "../../components/ModalConfirmRemove";

interface state {
  // Abre e fecha o modal do formulário.
  isModalFormOpen: boolean;

  // Abre e fecha o modal de confirmação.
  isModalDeleteOpen: boolean;

  // Lista de objetos que representa as tools criadas pelo usuário.
  tools: ToolCardContent[];

  tool: Tool;

  // Indica se certo elemento está carregando.
  loading: boolean;

  // Estados que controlam os inputs do formulário.
  formTitle: string;
  formLink: string;
  formDescription: string;
  formTags: string;
}

interface ToolCardContent {
  id: number;
  title: string;
  link: string;
  description: string;
  tags: String[];
}

interface Tool {
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
    formTitle: "",
    formLink: "",
    formDescription: "",
    formTags: "",
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

  handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();

      const { formTitle, formLink, formDescription, formTags } = this.state;

      this.setState({ loading: true });

      const newTool = {
        title: formTitle,
        link: formLink,
        description: formDescription,
        tags: formTags.split(/[# ]+/).filter((eachTag) => eachTag),
      };

      await api.post("tools", newTool);

      console.log(newTool);

      this.getItems();

      this.setState({
        isModalFormOpen: false,
        loading: false,
        formTitle: "",
        formLink: "",
        formDescription: "",
        formTags: "",
      });

      console.log("Requisição feita com sucesso");
    } catch (error) {
      console.error(error);
    }
  };

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

  toggleModalDelete = (tool: Tool) =>
    this.setState({
      isModalDeleteOpen: !this.state.isModalDeleteOpen,
      tool: tool,
    });

  deleteItem = async (id: number) => {
    try {
      const { tools } = this.state;

      await api.delete(`/tools/${id}`);

      this.setState({
        tools: tools.filter((e: ToolCardContent) => e.id !== id),
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
      formTitle,
      formLink,
      formDescription,
      formTags,
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
          <ModalBackground>
            <Modal>
              <AbsolutePositioningButtonDiv>
                <ButtonDivChild onClick={() => this.toggleModalForm()}>
                  <AiOutlineClose size="20px" />
                </ButtonDivChild>
              </AbsolutePositioningButtonDiv>

              <div className="title-column">
                <AiOutlinePlus size="26px" />
                <h1>Add New Tool</h1>
              </div>
              <form onSubmit={this.handleSubmit}>
                <label>Tool Name</label>
                <Input
                  value={formTitle}
                  onChange={(event) =>
                    this.setState({ formTitle: event.target.value })
                  }
                  required
                />

                <label>Tool Link</label>
                <Input
                  value={formLink}
                  onChange={(event) =>
                    this.setState({ formLink: event.target.value })
                  }
                  type="url"
                  required
                />

                <label>Tool Description</label>
                <Textarea
                  value={formDescription}
                  onChange={(event) =>
                    this.setState({ formDescription: event.target.value })
                  }
                  required
                />

                <label>Tags</label>
                <Input
                  value={formTags}
                  onChange={(event) =>
                    this.setState({ formTags: event.target.value })
                  }
                />
                <ButtonContainerLeft>
                  <ButtonSubmit $loading={loading}>
                    {loading ? <AiOutlineLoading /> : "Add tool"}
                  </ButtonSubmit>
                </ButtonContainerLeft>
              </form>
            </Modal>
          </ModalBackground>
        ) : (
          ""
        )}

        {isModalDeleteOpen ? (
          <ModalConfirmRemove
            tool={tool}
            toggle={this.toggleModalDelete.bind(this)}
            deleteItem={this.deleteItem.bind(this)}
          />
        ) : (
          ""
        )}

        {tools.map(
          ({ id, title, link, description, tags }: ToolCardContent) => {
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
          }
        )}
      </HomeContainer>
    );
  }
}
