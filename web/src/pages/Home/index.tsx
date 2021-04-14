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
  IconButtonContainer,
  IconButton,
  Button,
} from "../../styles/reuseStyles";

import api from "../../services/api";
import List from "../../components/List";

import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";

interface state {
  isModalOpen: boolean;
  tools: Array<any>;
  title: string;
  link: string;
  description: string;
  tags: "";
}

export default class Home extends Component {
  state = {
    isModalOpen: false,
    tools: [],
    title: "",
    link: "",
    description: "",
    tags: "",
  };

  async componentDidMount() {
    const tools = localStorage.getItem("tools");
    if (tools) this.setState({ tools: JSON.parse(tools) });

    await api
      .get("tools")
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

  async handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(e);
  }

  render() {
    const { isModalOpen, tools, title, link, description, tags } = this.state;

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
              <IconButtonContainer>
                <IconButton onClick={() => this.toggleModal()}>
                  <AiOutlineClose size="20px" />
                </IconButton>
              </IconButtonContainer>

              <div className="title-column">
                <AiOutlinePlus size="26px" />
                <h1>Add New Tool</h1>
              </div>
              <form onSubmit={this.handleSubmit}>
                <label>Tool Name</label>
                <Input
                  value={title}
                  onChange={(event) =>
                    this.setState({ title: event.target.value })
                  }
                  required
                />

                <label>Tool Link</label>
                <Input
                  value={link}
                  onChange={(event) =>
                    this.setState({ link: event.target.value })
                  }
                />

                <label>Tool Description</label>
                <textarea
                  value={description}
                  onChange={(event) =>
                    this.setState({ description: event.target.value })
                  }
                />

                <label>Tags</label>
                <Input
                  value={tags}
                  onChange={(event) =>
                    this.setState({ tags: event.target.value })
                  }
                />

                <Button className="button-left" type="submit">
                  Add tool
                </Button>
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
