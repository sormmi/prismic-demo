import React from "react";
import styled from "styled-components";
import EmployeeItem from "components/EmployeeItem";

const EmployeeSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  text-align: center;
  margin: 30px;
`;

const EmployeeList = ({ title, fields }) => {
  return (
    <EmployeeSection>
      {fields.map((field, index) => {
        return (
          <EmployeeItem
            key={index}
            title={field.employee_title}
            content={field.employee_desc}
            photoUrl={field.employee_photo.url}
          />
        );
      })}
    </EmployeeSection>
  );
};

export default EmployeeList;
