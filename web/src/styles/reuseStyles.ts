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

  @media (max-width: 768px) {
    margin-top: var(--small);
    padding: 0 var(--small);
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
  padding: var(--smallest) var(--medium);

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

export const ButtonAlert = styled(ButtonPrimary)`
  background-color: var(--red);

  &:hover {
    background-color: var(--darker-red);
  }
`;
