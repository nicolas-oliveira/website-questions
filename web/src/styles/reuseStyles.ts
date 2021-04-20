// Aqui contém estilos utilizados mais de uma vez na aplicação
import styled, { css, keyframes } from "styled-components";

// Estilo usado para os ícones que devem ficar no canto superior direito
// de uma div qualquer
export const AbsolutePositioningButtonDiv = styled.a`
  position: absolute;
  right: 0;
  top: 0;
`;

// Estilo filho de AbsolutePositioningButtonDiv com a finalidade de tornar o
// ícone centralizado e com animação
export const ButtonDivChild = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--smallest);
  cursor: pointer;

  &:hover {
    color: var(--lightest-ink);
  }
`;

// Botão comum utilizado em várias partes da aplicação
export const ButtonPrimary = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--most-smallest);

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin: 10px 0;

  cursor: pointer;
  transition: 0.1s;

  border-radius: 5px;
  padding: var(--most-smallest) var(--medium);
  background-color: var(--blue);
  color: var(--white);

  &:hover {
    background-color: var(--darker-blue);
  }
`;

const rotate = keyframes`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
`;

interface ButtonProps {
  $loading: boolean;
}

export const ButtonSubmit = styled(ButtonPrimary).attrs<ButtonProps>(
  ({ $loading }) => ({
    disabled: $loading,
  })
)<ButtonProps>`
  height: 2em;
  min-width: 4em;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${({ $loading }) =>
    $loading &&
    css`
      svg {
        animation: ${rotate} linear infinite 2s;
      }
    `}
`;

export const ButtonAlert = styled(ButtonSubmit)`
  background-color: var(--red);

  &:hover {
    background-color: var(--darker-red);
  }
`;

export const ButtonContainerLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--small);
`;

export const ModalBackground = styled.div`
  position: fixed;
  z-index: 1;
  padding-top: 100px;

  left: 0;
  top: 0;

  width: 100%;
  height: 100%;

  overflow: auto;

  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

export const Modal = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: column;

  background-color: var(--white);
  margin: auto;
  border-radius: 5px;
  max-width: 700px;
  width: 90%;
  padding: var(--bigger);

  .title-column {
    display: flex;
    justify-content: column;
    align-items: center;
    margin-bottom: var(--small);
  }

  input {
    margin-bottom: 10px;
  }

  form {
    display: flex;
    flex-direction: column;
  }
`;
