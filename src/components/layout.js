/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql, Link } from "gatsby";
import styled from "styled-components";
import Footer from "components/Footer";

import "./layout.css";

const Main = styled.main`
  margin: 0 auto;
`;

const NavLinks = styled.div`
  margin-left: auto;
  display: flex;
`;

const NavLink = styled.div`
  margin: auto 0;

  a {
    color: black;
    text-decoration: none;
    padding: 0 16px;

    &:hover {
      padding-bottom: 30px;
    }

    &.active {
      color: green;
    }
  }
`;

const Header = styled.div`
  display: flex;
  background: white;
  height: 66px;
  padding: 0 20px;
  box-sizing: border-box;

  .languages {
    margin: auto 0 auto 20px;

    a {
      padding: 0 6px;
    }
  }
`;

const Branding = styled.div`
  margin: auto 0;
  min-width: 100px;

  a {
    font-size: 20px;
    color: black;
    font-weight: bold;
    text-decoration: none;
  }
`;

const Layout = ({ children }) => {
  const currentLangauage = window.location.pathname.startsWith("/en-us")
    ? "en-us"
    : "fi";

  const navQuery = graphql`
    {
      prismic {
        allNavigations {
          edges {
            node {
              branding
              navigation_links {
                label
                link {
                  ... on PRISMIC_Aboutpage {
                    _meta {
                      uid
                      lang
                    }
                  }
                  ... on PRISMIC_Contactpage {
                    _meta {
                      uid
                      lang
                    }
                  }
                  ... on PRISMIC_Article {
                    _meta {
                      uid
                      lang
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  return (
    <>
      <Header>
        <StaticQuery
          query={`${navQuery}`}
          render={data => {
            const navs = data.prismic.allNavigations.edges;

            return (
              <>
                <Branding>
                  <Link to={`/${currentLangauage}/home`}>
                    {navs[0].node.branding}
                  </Link>
                </Branding>
                <NavLinks>
                  {navs.map(nav => {
                    return nav.node.navigation_links.map(link => {
                      // render selected current Language links
                      if (currentLangauage !== link.link._meta.lang)
                        return null;
                      const linkTo = `/${link.link._meta.lang}/${link.link._meta.uid}`;
                      return (
                        <NavLink key={link.link._meta.uid}>
                          <Link to={linkTo}>{link.label}</Link>
                        </NavLink>
                      );
                    });
                  })}
                </NavLinks>
              </>
            );
          }}
        />

        <div className="languages">
          <NavLink>
            <Link to={`/fi`} activeClassName="active" partiallyActive={true}>
              FI
            </Link>
            <Link to={`/en-us`} activeClassName="active" partiallyActive={true}>
              EN
            </Link>
          </NavLink>
        </div>
      </Header>

      <Main>{children}</Main>

      <Footer lang={currentLangauage} />
    </>
  );
};
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
