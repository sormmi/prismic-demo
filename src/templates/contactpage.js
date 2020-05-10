import React from "react";
import Layout from "components/layout";
import SliceZone from "components/SliceZone";
import { graphql } from "gatsby";
import styled from "styled-components";
import { RichText } from 'prismic-reactjs'
import SEO from "../components/seo";

const Button = styled.button`
  background: orange;
  border: orange;
  color: white;
  cursor: pointer;
  padding: 8px;
  box-shadow: none;
  margin-top: 10px;
  width: 100%;
  font-weight: bold;
  
  :active {
    transform: scale(0.98);
    outline-style: none;
  }
;
`
const ContactPage = props => {

  const lang = props.data.prismic.allContactpages.edges[0].node._meta.lang;

  return (
    <Layout lang={lang}>
      <SEO title="Contact" />
      <SliceZone
        body={props.data.prismic.allContactpages.edges[0].node.body}
        page="contact"
      />

      <form name="contact-us"
            method="POST"
            data-netlify="true"
            action="/contact-success"
            className="contact-form"
        >
        <input type="hidden" name="form-name" value="contact-us" />

        <h2>{RichText.asText(props.data.prismic.allContactpages.edges[0].node.form_title)}</h2>

        { props.data.prismic.allContactpages.edges[0].node.form_group_fields.map((field, index) => {

            if (field.field_type === 'textarea') {
              return (
                <div key={index}>
                  <label className="contact-form-label">{field.field_title}</label>
                  <textarea className="contact-form-textarea" name={field.field_name} required={field.required === 'yes'} />
                </div>
              )
            } else if (field.field_type === 'submit') {
              return (
                  <Button key={index}>{field.field_title}</Button>
              )
            } else {
              return (
                <div key={index}>
                  <label className="contact-form-label">{field.field_title} {field.required === 'yes' ? '*' : ''}</label>
                  <input className="contact-form-input" type={field.type} name={field.field_name} autoComplete="none" required={field.required === 'yes'} />
                </div>
              )
            }
        })}

      </form>

    </Layout>
  );
};

export const query = graphql`
  query ContentPageQuery($lang: String!) {
    prismic {
      allContactpages(lang: $lang) {
        edges {
          node {
            page_title
            _meta {
              id
              uid
              lang
            }
            form_title
            form_group_fields {
              field_title
              field_name
              field_type
              required
            }
            body {
              ... on PRISMIC_ContactpageBodyHero {
                type
                primary {
                  hero_title
                  hero_content
                  background_image
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default ContactPage;
