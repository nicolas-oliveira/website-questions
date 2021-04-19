import React, { Component, FormEvent } from "react";

import {
  HomeContainer,
  Title,
  Subtitle,
  GroupSearch,
  Actions,
  Checkbox,
  Search,
  Modal,
  Input,
  FormDiv,
  ButtonContainerLeft,
  Textarea,
} from "./styles";

import {
  AbsolutePositioningButtonDiv,
  ButtonDivChild,
  ButtonSubmit,
  ButtonPrimary,
  ButtonAlert,
} from "../../styles/reuseStyles";

import {
  Description,
  ElementBody,
  Hashtags,
  TitleCard,
} from "../../components/ToolCard/styles";

interface ToolCardContent {
  id: number;
  title: string;
  link: string;
  description: string;
  tags: String[];
}

import api from "../../services/api";
// import ToolCard from "../../components/ToolCard";

import { FiTrash2 } from "react-icons/fi";
import { AiOutlineClose, AiOutlineLoading } from "react-icons/ai";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";

interface state {
  isModalFormOpen: boolean;
  isModalDeleteOpen: boolean;
  loading: boolean;
  tools: ToolCardContent[];
  formTitle: string;
  formLink: string;
  formDescription: string;
  formTags: string;
}

export default class Home extends Component {
  state = {
    isModalFormOpen: false,
    isModalDeleteOpen: false,
    loading: false,
    tools: [],
    formTitle: "",
    formLink: "",
    formDescription: "",
    formTags: "",
  };

  async componentDidMount() {
    const tools = localStorage.getItem("tools");
    if (tools) this.setState({ tools: JSON.parse(tools) });

    await api
      .get("tools?_sort=id&_order=desc")
      .then((response) => this.setState({ tools: response.data }));
  }

  componentDidUpdate(e: any, prevState: state) {
    const { isModalFormOpen, tools } = this.state;
    const body = document.querySelector("body");

    if (prevState.tools !== tools) {
      localStorage.setItem("tools", JSON.stringify(tools));
    }

    if (isModalFormOpen) {
      if (body) body.style.overflowY = "hidden";
    } else {
      if (body) body.style.overflowY = "auto";
    }
  }

  async getItems() {
    await api
      .get("tools?_sort=id&_order=desc")
      .then((response) => this.setState({ tools: response.data }));
  }

  toggleModalForm() {
    const { isModalFormOpen } = this.state;

    if (!isModalFormOpen) {
      this.setState({ isModalFormOpen: true });
    } else {
      this.setState({ isModalFormOpen: false });
    }
  }

  toggleModalDelete() {
    const { isModalDeleteOpen } = this.state;

    if (!isModalDeleteOpen) {
      this.setState({ isModalDeleteOpen: true });
    } else {
      this.setState({ isModalDeleteOpen: false });
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

  deleteItem = async (id: number) => {
    try {
      const { tools } = this.state;

      await api.delete(`/tools/${id}`);

      this.setState({
        tools: tools.filter((e: ToolCardContent) => e.id !== id),
      });

      console.log(id);
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
          <Modal>
            <FormDiv>
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
            </FormDiv>
          </Modal>
        ) : (
          ""
        )}

        {isModalDeleteOpen ? (
          <Modal>
            <FormDiv>
              <h1>Remove tool</h1>
              <p>Are you sure you want remove tool.title?</p>

              <ButtonContainerLeft>
                <ButtonPrimary onClick={() => this.toggleModalDelete()}>
                  Cancel
                </ButtonPrimary>
                <ButtonAlert onClick={() => console.log("infelizmente")}>
                  Yes, remove
                </ButtonAlert>
              </ButtonContainerLeft>
            </FormDiv>
          </Modal>
        ) : (
          ""
        )}

        {tools.map((tool: ToolCardContent) => {
          return (
            <ElementBody key={tool.id}>
              <AbsolutePositioningButtonDiv title="Delete">
                <ButtonDivChild onClick={() => this.toggleModalDelete()}>
                  <FiTrash2 size="16px" />
                </ButtonDivChild>
              </AbsolutePositioningButtonDiv>

              <TitleCard href={tool.link}>{tool.title}</TitleCard>
              <Description>{tool.description}</Description>

              <Hashtags>
                {tool.tags?.map((tag) => {
                  return <span>#{tag}</span>;
                })}
              </Hashtags>
            </ElementBody>
          );
        })}
      </HomeContainer>
    );
  }
}
