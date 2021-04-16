import styled from "styled-components";

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  min-width: 70vw;

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

export const Input = styled.input`
  background: var(--darkerst-white) 0% 0% no-repeat padding-box;
  border: 1px solid var(--most-darkerst-white);
  border-radius: 5px;
  opacity: 1;
  padding: var(--smallest);

  &:focus {
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

export const Modal = styled.div`
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

export const FormDiv = styled.div`
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

  textarea {
    background: var(--darkerst-white) 0% 0% no-repeat padding-box;
    border: 1px solid var(--most-darkerst-white);
    border-radius: 5px;
    opacity: 1;
    resize: none;
    padding: var(--smallest);
    min-height: 100px;
    font-family: "Source Sans Pro", "PT Mono", sans-serif, monospace;
  }

  textarea:focus {
    border: 1px solid var(--ink);
  }

  input {
    margin-bottom: 10px;
  }

  .title-column {
    display: flex;
    align-items: center;
    justify-content: column;
    margin-bottom: var(--medium);
  }

  form {
    display: flex;
    flex-direction: column;
  }
`;

export const CloseContainer = styled.div`
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  z-index: 2;
`;
