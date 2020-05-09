import React from "react";
import { graphql } from "gatsby";
import Layout from "components/layout";
import SEO from "components/seo";
import SliceZone from "components/SliceZone";

const IndexPage = ({ data }) => {
  return (
    <Layout lang={data.prismic.allAboutpages.edges[0].node._meta.lang}>
      <SEO title="About Us" />
      <SliceZone
        body={data.prismic.allAboutpages.edges[0].node.body}
        page="about"
      />
    </Layout>
  );
};

export const query = graphql`
  query AboutPageQuery($lang: String!) {
    prismic {
      allAboutpages(lang: $lang) {
        edges {
          node {
            _meta {
              lang
            }
            body {
              ... on PRISMIC_AboutpageBodyHero {
                type
                primary {
                  background_image
                  hero_content
                  hero_title
                }
              }
              ... on PRISMIC_AboutpageBodyEmployee_gallery {
                type
                primary {
                  employee_title
                }
                fields {
                  employee_desc
                  employee_photo
                  employee_title
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;
