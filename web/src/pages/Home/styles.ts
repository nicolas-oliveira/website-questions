import styled, { css, keyframes } from "styled-components";

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 75vw;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Checkbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: var(--medium);

  label,
  input {
    cursor: pointer;
  }

  label {
    padding-left: var(--smallest);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
`;

export const HomeContainer = styled.div`
  margin: var(--medium);
`;

export const Subtitle = styled.h2`
  font-size: var(--medium);
  line-height: var(--medium);

  margin-top: var(--most-smallest);
  margin-bottom: var(--most-smallest);
`;

export const Search = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background: var(--darkerst-white) 0% 0% no-repeat padding-box;
  border: 1px solid var(--most-darkerst-white);
  border-radius: 5px;

  input {
    all: unset;
  }

  svg {
    margin: 10px;
  }

  &:focus-within {
    border: 1px solid var(--ink);
  }
`;

export const Title = styled.h1`
  font-size: var(--big);
  margin-top: var(--small);
`;

export const GroupSearch = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const CloseContainer = styled.div`
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  z-index: 2;
`;
