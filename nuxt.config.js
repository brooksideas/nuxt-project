import axios from 'axios'; 
module.exports = {
  /*
** Headers of the page
*/
  head: {
    title: 'ssr-blog',
    titleTemplate: '%s | Awesome JS SSR Blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' },
      { hid: 'customer', name: 'customer', content: 'Application users' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css'
      }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
   
  generate: {
    // Generate Multiple Routes using call backs 
    /*
       routes(callback) {
   
         const users = require('./users.json')
         const posts = require('./posts.json')
   
         let fetchedUsers = users.map(user => `/user/${user.id}`)
   
         let fetchedPosts = posts.map(post => `/post/${post.id}`)
   
         const fetchedRoutes = fetchedUsers.concat(fetchedPosts)
   
         callback(null, fetchedRoutes)
       },  */

    // Generate the route generation with payload http://jsonplaceholder.typicode.com
    async routes() {
      const apiRoutes = []; 

       await axios.get('http://jsonplaceholder.typicode.com/users')
          .then((res) => {
            res.data.map((user) => { 
              apiRoutes.push({
                route: '/user/' + user.id,  // Must match the name on pages
                payload: user
              })
            })
          }) 

        await axios.get('http://jsonplaceholder.typicode.com/posts')
          .then((res) => {
            res.data.map((post) => {
              apiRoutes.push({
                route: '/post/' + post.id,  // Must match the name on pages
                payload: post
              })
            })
          });  

      return apiRoutes;  

    }, 
  },

  plugins: [{ src: '~/plugins/persistedState.js', ssr: true }]
}

