import styled from "@emotion/styled";

const FillIn = styled.div<{ width?: string }>`
  display: flex;
  ${({ width }) => (width ? `width: ${width}` : "width: 100%")};
  flex-direction: column;
  margin-bottom: 20px;
  & > p {
    margin-bottom: 5px;
  }
  & > div {
    align-items: flex-start;
  }
`;

export default FillIn;
