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
} from "./styles";

import {
  AbsolutePositioningButtonDiv,
  ButtonDivChild,
  Button,
  ButtonSubmit,
} from "../../styles/reuseStyles";

import api from "../../services/api";
import List from "../../components/List";

import { AiOutlineClose, AiOutlineLoading } from "react-icons/ai";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";

interface state {
  isModalOpen: boolean;
  loading: boolean;
  tools: Array<any>;
  title: string;
  link: string;
  description: string;
  tags: string;
}

export default class Home extends Component {
  state = {
    isModalOpen: false,
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
    const { isModalOpen, tools } = this.state;
    const body = document.querySelector("body");

    if (prevState.tools !== tools) {
      localStorage.setItem("tools", JSON.stringify(tools));
    }

    if (isModalOpen) {
      if (body) body.style.overflowY = "hidden";
    } else {
      if (body) body.style.overflowY = "auto";
    }
  }

  toggleModal() {
    const { isModalOpen } = this.state;

    if (!isModalOpen) {
      this.setState({ isModalOpen: true });
    } else {
      this.setState({ isModalOpen: false });
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

      const { tools } = this.state;

      this.setState({
        isModalOpen: false,
        loading: false,
        tools: [newTool, ...tools],
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

  render() {
    const {
      isModalOpen,
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

          <Button onClick={() => this.toggleModal()}>
            <AiOutlinePlus />
            Add
          </Button>
        </Actions>

        {isModalOpen ? (
          <Modal>
            <FormDiv>
              <AbsolutePositioningButtonDiv>
                <ButtonDivChild onClick={() => this.toggleModal()}>
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
                <textarea
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
                <ButtonSubmit type="submit" loading={loading}>
                  {loading ? <AiOutlineLoading /> : "Add tool"}
                </ButtonSubmit>
              </form>
            </FormDiv>
          </Modal>
        ) : null}

        {tools.map(({ id, title, link, description, tags }) => {
          return (
            <List
              key={id}
              title={title}
              link={link}
              description={description}
              tags={tags}
            />
          );
        })}
      </HomeContainer>
    );
  }
}
