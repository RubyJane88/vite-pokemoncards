import styled from "@emotion/styled";

export const PokeName = styled.h1(
  {
    fontSize: 25,
  },
  (props) => ({ color: props.color })
);

export const P = styled.h2(
  {
    fontSize: 12,
  },
  (props) => ({ color: props.color })
);
