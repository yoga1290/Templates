import Vue from 'vue'
import Index from './index.vue'


import jQuery from 'jquery'
import 'bootstrap.css' //webpack alias
import 'bootstrap.min.css.map' //webpack alias
import 'animate.css' //webpack alias

window.jQuery = window.$ = jQuery

const routes = {
  // '/': require('./app.vue'), // require('./video/video.vue'), //
  '/': Index
}

new Vue({
  el: '#app',

  // https://vuejs.org/v2/guide/routing.html#Simple-Routing-From-Scratch
  data: {
    currentRoute: '/'//window.location.hash.length >1 ? window.location.hash.substring(2): window.location.pathname
  },

  methods: {
    getQueryStringObj () {
      let result = {}
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
    return createElement(routes['/'],
              {props: this.getQueryStringObj()})
  }
})
