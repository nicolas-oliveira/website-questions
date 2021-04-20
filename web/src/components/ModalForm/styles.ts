import styled from "styled-components";

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

export const Textarea = styled.textarea`
  background: var(--darkerst-white) 0% 0% no-repeat padding-box;
  border: 1px solid var(--most-darkerst-white);
  border-radius: 5px;
  opacity: 1;
  resize: none;
  padding: var(--smallest);
  min-height: 100px;
  font-family: "Source Sans Pro", "PT Mono", sans-serif, monospace;

  &:focus {
    border: 1px solid var(--ink);
  }
`;
