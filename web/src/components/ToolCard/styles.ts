import styled from "styled-components";

export const ElementBody = styled.div`
  position: relative;

  padding: var(--medium);
  margin: var(--small) 0;

  background-color: var(--darker-white);
  border-radius: 5px;

  width: 75vw;
`;

export const TitleCard = styled.a`
  font-size: var(--medium);
  color: var(--blue);
  text-decoration: underline;
`;

export const Description = styled.div`
  margin: var(--small) 0;
  line-height: var(--medium);
  max-width: 100%;
`;

export const Hashtags = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  span {
    padding-right: 10px;
  }
`;
