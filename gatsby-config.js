const path = require(`path`)
require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
    siteMetadata: {
        title: `Balaji Interior`,
        description: `A Static site uisng React and Gatsby.`,
        keywords: ['gatsby', 'react']
    },
    plugins: [
        `gatsby-env-variables`,
        `gatsby-plugin-sass`,
        `gatsby-plugin-react-helmet`,
        `gatsby-transformer-json`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
              name: `markdown`,
              path: `${__dirname}/src/data/`,
            },
          },
          {
            resolve: `gatsby-source-filesystem`,
            options: {
              name: `assets`,
              path: `${__dirname}/src/data/assets/`,
            },
          },
          {
            resolve: `gatsby-source-filesystem`,
            options: {
              name: `markdown`,
              path: `${__dirname}/src/pages/`,
            },
          },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-sass`,
        `gatsby-plugin-image`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: path.join(__dirname, `src`, `images`),
            },
        },
        {
          resolve: `gatsby-source-filesystem`,
          options: {
              name: `assets`,
              path: path.join(__dirname, `src`, `data`, `assets`),
          },
      },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Balaji Interior`,
                start_url: `/`,
                background_color: `#ffffff`,
                theme_color: `#080808`,
                display: `minimal-ui`,
                icon: `src/images/logo.png`,
            },
        },
        {
            resolve: `gatsby-plugin-typography`,
            options: {
                pathToConfigModule: `src/utils/typography`,
                omitGoogleFont: true
            },
        },
        {
            resolve: 'gatsby-plugin-antd',
            options: {
                style: true
            }
        },
        {
            resolve: `gatsby-plugin-less`,
            options: {
                javascriptEnabled: true
            },
        },
        `gatsby-plugin-styled-components`,
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [{
                    resolve: `gatsby-remark-images`,
                    options: {
                        maxWidth: 800,
                    },
                }, ],
            },
        },
        {
            resolve: `gatsby-plugin-google-fonts`,
            options: {
                fonts: [
                    `Cedarville`,
                    `muli\:400,400i,700,700i`,
                ],
                display: "swap",
            },
        },
        {
          resolve: `gatsby-plugin-netlify-cms`,
          options: {
            modulePath: `${__dirname}/src/cms/cms.js`,
          },
        },
        `gatsby-plugin-netlify`
    ],
}
