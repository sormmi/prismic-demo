module.exports = {
  siteMetadata: {
    title: `Prismic Gatsby`,
    description: `Prismic Demo with Gatsby`,
    author: `@sormmi`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-prismic-graphql`,
      options: {
        repositoryName: `sormmi-first-demo`,
        preview: true,
        langs: ["fi", "es-us"],
        pages: [
          {
            type: "Homepage",
            match: "/:lang/home",
            path: "/",
            component: require.resolve("./src/templates/homepage.js"),
            langs: ["fi", "en-us"],
          },
          {
            type: "Contactpage",
            match: "/:lang/contact-us",
            path: "/",
            component: require.resolve("./src/templates/contactpage.js"),
            langs: ["fi", "en-us"],
          },
          {
            type: "Aboutpage",
            match: "/:lang/about-us",
            path: "/",
            component: require.resolve("./src/templates/aboutpage.js"),
            langs: ["fi", "en-us"],
          },
          {
            type: "Article",
            match: "/:lang/articles",
            path: "/",
            component: require.resolve("./src/templates/article.js"),
            langs: ["fi", "en-us"],
          },
          {
            type: "Post",
            match: "/:lang/blog/:uid",
            path: "/blog-preview",
            component: require.resolve("./src/templates/post.js"),
            langs: ["fi", "en-us"],
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/fi/home`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Lato`,
            variants: [`300`, `400`, `700`, `900`],
          },
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
