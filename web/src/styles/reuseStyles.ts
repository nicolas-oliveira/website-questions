import styled from "styled-components";

export const IconButtonContainer = styled.a`
  position: absolute;
  right: 0;
  top: 0;
`;

export const IconButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--smallest);
  cursor: pointer;

  &:hover {
    color: var(--lightest-ink);
  }
`;

export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin: 10px 0;

  cursor: pointer;
  transition: 0.1s;

  border-radius: 5px;
  padding: 0 var(--small);
  background-color: var(--blue);
  color: var(--white);

  &:hover {
    background-color: var(--darker-blue);
  }

  button {
    all: unset;
  }

  @media (max-width: 768px) {
    margin-top: var(--small);
    padding: var(--small);
  }
`;
