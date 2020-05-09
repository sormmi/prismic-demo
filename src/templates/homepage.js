import React from "react";
import { graphql } from "gatsby";
import Layout from "components/layout";
import SEO from "components/seo";
import SliceZone from "components/SliceZone";

const IndexPage = ({ data }) => {
  return (
    <Layout lang={data.prismic.allHomepages.edges[0].node._meta.lang}>
      <SEO title="Home" />
      <SliceZone
        body={data.prismic.allHomepages.edges[0].node.body}
        page="home"
      />
    </Layout>
  );
};

export const query = graphql`
  query HomePageQuery($lang: String!) {
    prismic {
      allHomepages(lang: $lang) {
        edges {
          node {
            _meta {
              lang
            }
            body {
              ... on PRISMIC_HomepageBodyHero {
                type
                primary {
                  hero_content
                  hero_title
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

export default IndexPage;
