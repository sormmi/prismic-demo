import React from "react";

import { StaticQuery, graphql } from "gatsby";
import { RichText } from "prismic-reactjs";
import styled from "styled-components";
import {
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa/";

const FooterDiv = styled.div`
  text-align: center;
  background: #fafafa;
  padding-bottom: 50px;

  img {
    margin-top: 50px;
    height: 30px;
  }

  a {
    color: black;
    padding: 10px;
  }

  h1 {
    font-size: 1em;
    margin: 6px 0;
  }
`;

const FooterGroup = styled.div`
  display: grid;
  margin-top: 30px;
  grid-template-columns: 200px 200px;
  justify-content: center;

  p {
    margin: 3px;
  }
`;

const FooterLinks = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 50px);
  justify-content: center;
`;

const Footer = ({ lang }) => {
  return (
    <div>
      <StaticQuery
        query={`${footerQuery}`}
        render={data => {
          const edges = data.prismic.allFooters.edges;
          return (
            <FooterDiv>
              <img
                src={data.prismic.allFooters.edges[0].node.footer_icon.url}
                alt="footer_logo"
              />

              {edges.map((node, index) => {
                if (node.node._meta.lang !== lang) return null;

                return (
                  <div key={index}>
                    <RichText render={node.node.footer_title} />
                    <RichText render={node.node.footer_description} />
                    <p>{node.node.footer_content}</p>
                  </div>
                );
              })}

              <FooterLinks>
                {data.prismic.allFooters.edges[0].node.footer_links.map(
                  footer_link => {
                    return (
                      <a
                        href={footer_link.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={footer_link.link.url}
                      >
                        {footer_link.link_label[0].text === "Facebook" && (
                          <FaFacebook size={30} />
                        )}
                        {footer_link.link_label[0].text === "Instagram" && (
                          <FaInstagram size={30} />
                        )}
                        {footer_link.link_label[0].text === "LinkedIn" && (
                          <FaLinkedin size={30} />
                        )}
                        {footer_link.link_label[0].text === "Twitter" && (
                          <FaTwitter size={30} />
                        )}
                      </a>
                    );
                  }
                )}
              </FooterLinks>

              <FooterGroup>
                {data.prismic.allFooters.edges[0].node.footer_group.map(
                  (group, index) => {
                    return (
                      <div key={index}>
                        <RichText render={group.footer_group_title} />
                        <RichText render={group.footer_group_content} />
                      </div>
                    );
                  }
                )}
              </FooterGroup>
            </FooterDiv>
          );
        }}
      />
    </div>
  );
};

const footerQuery = graphql`
  {
    prismic {
      allFooters {
        edges {
          node {
            _meta {
              id
              lang
            }
            footer_icon
            footer_title
            footer_description
            footer_links {
              link {
                ... on PRISMIC__ExternalLink {
                  _linkType
                  url
                }
              }
              link_label
            }
            footer_group {
              footer_group_title
              footer_group_content
            }
          }
        }
      }
    }
  }
`;

export default Footer;
