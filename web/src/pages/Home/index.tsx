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

import { ButtonPrimary, ToolCardListContainer } from "../../styles/reuseStyles";

import api from "../../services/api";

import {
  AiOutlineSearch,
  AiOutlinePlus,
  AiOutlineLoading,
} from "react-icons/ai";
import ToolCard from "../../components/ToolCard";
import ModalConfirmRemove from "../../components/ModalConfirmRemove";
import ModalForm from "../../components/ModalForm";

interface state {
  // Abre e fecha o modal de confirmação.
  isModalDeleteOpen: boolean;

  // Abre e fecha o modal do formulário.
  isModalFormOpen: boolean;

  // Lista de todos os objetos que representa as tools criadas pelo usuário.
  toolsData: ToolCardProps[];

  // Lista de objetos que representa as tools visualizadas pelo usuário.
  toolsView: ToolCardProps[];

  // Valor da requisição feito pelo usuário na busca.
  searchValue: string;

  // Objeto que representa apenas uma ferramenta.
  tool: ToolProps;

  //
  isTagsOnly: boolean;

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
    toolsData: [],
    toolsView: [],
    searchValue: "",
    tool: { id: 0, title: "" },
    loading: false,
    isTagsOnly: false,
  };

  async componentDidMount() {
    try {
      const tools = localStorage.getItem("tools");
      if (tools) this.setState({ toolsData: JSON.parse(tools) });

      await api
        .get("tools?_sort=id&_order=desc")
        .then((response) =>
          this.setState({ toolsData: response.data, toolsView: response.data })
        );
    } catch (error) {
      console.error(error);
    }
  }

  componentDidUpdate(e: any, prevState: state) {
    const {
      isModalFormOpen,
      isModalDeleteOpen,
      toolsData,
      isTagsOnly,
      searchValue,
    } = this.state;

    const body = document.querySelector("body");

    if (prevState.toolsData !== toolsData)
      localStorage.setItem("tools", JSON.stringify(toolsData));

    if (prevState.isTagsOnly !== isTagsOnly) this.requestSearch(searchValue);

    if (body)
      isModalFormOpen || isModalDeleteOpen
        ? (body.style.overflowY = "hidden")
        : (body.style.overflowY = "auto");
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

      const { toolsData } = this.state;

      await api.delete(`/tools/${id}`);

      const filteredList = toolsData.filter((e: ToolCardProps) => e.id !== id);

      this.setState({
        toolsData: filteredList,
        toolsView: filteredList,
        isModalDeleteOpen: !this.state.isModalDeleteOpen,
        loading: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  async requestSearch(value: string) {
    try {
      this.setState({ searchValue: value, loading: true });
      const { isTagsOnly } = this.state;

      if (value != "") {
        if (isTagsOnly) {
          const { data } = await api.get(`/tools?tags_like=${value}`);

          this.setState({ toolsView: data, loading: false });
        } else {
          const { data } = await api.get(`/tools?q=${value}`);

          this.setState({ toolsView: data, loading: false });
        }
      } else {
        const { toolsData } = this.state;
        this.setState({ toolsView: toolsData, loading: false });
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const {
      isModalDeleteOpen,
      isModalFormOpen,
      searchValue,
      toolsView,
      isTagsOnly,
      loading,
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
              <input
                type="text"
                value={searchValue}
                onChange={(e) => this.requestSearch(e.target.value)}
              />
            </Search>

            <Checkbox>
              <input
                type="checkbox"
                id="isTheckboxTagsOnly"
                onChange={(e) =>
                  this.setState({ isTagsOnly: e.target.checked })
                }
              />
              <label htmlFor="isTheckboxTagsOnly">search in tags only</label>
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

        <ToolCardListContainer $loading={loading}>
          {loading ? (
            <AiOutlineLoading size="36px" />
          ) : (
            toolsView.map(
              ({ id, title, link, description, tags }: ToolCardProps) => {
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
            )
          )}
        </ToolCardListContainer>
      </HomeContainer>
    );
  }
}
