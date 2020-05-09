import React from "react";
import { RichText } from "prismic-reactjs";

export default ({ slice }) => (
  <div className="post-text container">
    <div>{RichText.render(slice.primary.text)}</div>
  </div>
);
