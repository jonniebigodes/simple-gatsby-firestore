var proxy = require("http-proxy-middleware")
module.exports = {
  plugins: [`gatsby-plugin-react-helmet`],
  /* proxy:{
        prefix:'/localapi',
        url:'http://localhost:5000/fb-function-testing/europe-west1'
    } */
    /* developMiddleware: app => {
        app.use(
          "/localapi/",
          proxy({
            target: "http://localhost:5000/fb-function-testing/europe-west1/api/",
          })
        )
      }, */
      developMiddleware: app => {
        app.use(
          "/fb-api/",
          proxy({
            target: "http://localhost:5000/fb-function-testing/europe-west1/api/",
            pathRewrite: {
              "/fb-api/": "",
            },
          })
        )
      },
}
