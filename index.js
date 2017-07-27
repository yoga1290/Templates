const Vue = require('vue')

const routes = {
  // '/': require('./app.vue'), // require('./video/video.vue'), //
  '/spring': require('./spring/index.vue')
}

new Vue({
  el: '#app',

  // https://vuejs.org/v2/guide/routing.html#Simple-Routing-From-Scratch
  data: {
    currentRoute: '/spring'//window.location.hash.length >1 ? window.location.hash.substring(2): window.location.pathname
  },

  methods: {
    getQueryStringObj () {
      result = {}
      window.location.search.substring(1).split('&').forEach((q)=>{
        q = q.split('=')
        result[q[0]] = decodeURIComponent(q[1])
      })
      return result
    }
  },
  render (createElement) {
    //console.log(this.currentRoute)
    // https://vuejs.org/v2/guide/render-function#createElement-Arguments
    return createElement(routes[this.currentRoute] || routes['/spring'],
              {props: this.getQueryStringObj()})
  }
})
