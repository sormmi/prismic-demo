import React from "react";
import Hero from "components/Hero";
import EmployeeList from "components/EmployeeList";

const SliceZone = ({ body, page }) => {
  return (
    <div>
      {body.map((bodyContent, index) => {
        if (bodyContent.type === "hero") {
          return (
            <Hero
              key={index}
              title={bodyContent.primary.hero_title}
              content={bodyContent.primary.hero_content}
              backgroundImage={bodyContent.primary.background_image.url}
              theme={page !== "home" ? { height: "450px" } : null}
            />
          );
        } else if (bodyContent.type === "employee_gallery") {
          return (
            <EmployeeList
              key={index}
              title={bodyContent.primary.employee_title}
              fields={bodyContent.fields}
            />
          );
        } else if (bodyContent.type === "article") {
            return <div key={index}>Blog posts</div>;
        }

        return null;
      })}
    </div>
  );
};

export default SliceZone;
