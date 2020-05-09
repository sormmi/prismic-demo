import React from "react";
import { RichText } from "prismic-reactjs";
import styled from "styled-components";

const EmployeeDiv = styled.div`
  h4 {
    margin: 0 0 6px 0;
  }
  p {
    margin: 0px;
  }
`;

const EmployeeItem = ({ title, content, photoUrl }) => {
  const titleStr = RichText.asText(title);
  return (
    <EmployeeDiv key={title}>
      <img src={photoUrl} alt={titleStr} />
      <h4>{titleStr}</h4>
      <RichText render={content} />
    </EmployeeDiv>
  );
};

export default EmployeeItem;
