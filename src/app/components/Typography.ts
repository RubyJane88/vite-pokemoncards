import styled from "@emotion/styled";

export const H1 = styled.h1(
  {
    fontSize: 30,
  },
  (props) => ({ color: props.color })
);

export const P = styled.h2(
  {
    fontSize: 18,
  },
  (props) => ({ color: props.color })
);
