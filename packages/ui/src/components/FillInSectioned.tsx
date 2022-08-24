import styled from "@emotion/styled";

const FillInSectioned = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  & > :not(div:first-child) {
    margin-left: 10px;
  }
`;

export default FillInSectioned;
