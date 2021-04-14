import styled from "styled-components";

export const ElementBody = styled.div`
  position: relative;

  padding: var(--medium);
  margin: var(--small) 0;

  background-color: var(--darker-white);
  border-radius: 5px;
`;

export const Title = styled.a`
  font-size: var(--medium);
  color: var(--blue);
  text-decoration: underline;
`;

export const Description = styled.div``;

export const Hashtags = styled.div`
  span {
    padding-right: 10px;
  }
`;
