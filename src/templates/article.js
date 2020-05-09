import React from "react";
import { graphql, Link } from "gatsby";
import { RichText } from "prismic-reactjs";
import styled from "styled-components";
import Layout from "components/layout";
import SEO from "components/seo";
import SliceZone from "components/SliceZone";

const ArticleList = styled.div`
  max-width: 920px;
  margin: 0 auto;
`;
const Article = styled.div`
  background: #fff;
  padding: 10px;
  margin: 10px;
  border: 1px solid #ddd;

  small {
    color: #999;
  }
`;

const LinkButton = styled.button`
  padding: 6px 16px;
  background: #40a7c9;
  color: white;
  border: none;
  font-size: 0.9em;

  a {
    text-decoration: none;
    color: white;
  }
`;

const ArticlesPage = ({ data }) => {
  return (
    <Layout lang={data.prismic.allArticles.edges[0].node._meta.lang}>
      <SEO title="Articles" />
      <SliceZone
        body={data.prismic.allArticles.edges[0].node.body}
        page="articles"
      />
      <ArticleList>
        {data.prismic.allPosts.edges.map((node, index) => {
          return (
            <Article key={index}>
              <small>{node.node.date}</small>
              <h2>{node.node.title[0].text}</h2>
              <RichText render={node.node.body[0].primary.text} />
              <LinkButton>
                <Link
                  to={`/${node.node._meta.lang}/blog/${node.node._meta.uid}`}
                >
                  {node.node._meta.lang === "fi" ? "Lue lisää" : "Read more"}
                </Link>
              </LinkButton>
            </Article>
          );
        })}
      </ArticleList>
    </Layout>
  );
};

export const query = graphql`
  query ArticlesQuery($lang: String!) {
    prismic {
      allArticles(lang: $lang) {
        edges {
          node {
            _meta {
              lang
            }
            body {
              ... on PRISMIC_ArticleBodyHero {
                type
                primary {
                  background_image
                  hero_title
                  hero_content
                }
              }
            }
          }
        }
      }
      allPosts(lang: $lang, sortBy: date_DESC) {
        edges {
          node {
            _meta {
              lang
              uid
            }
            date
            title
            body {
              ... on PRISMIC_PostBodyText {
                type
                primary {
                  text
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default ArticlesPage;
