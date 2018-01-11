import './css/site.css';
import 'bootstrap';
import Vue from 'vue';
import VueRouter from 'vue-router';
import AuthService from './services/Auth';
Vue.use(VueRouter);

const routes = [
  {
    path: '/SignIn',
    component: require('./components/SignIn/SignIn.vue.html')
  },
   {
    path: '/',   
    component: require('./components/default/default.vue.html'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        component: require('./components/home/home.vue.html'),
        meta: { requiresAuth: true }
      },
      {
        path: 'home',
        component: require('./components/home/home.vue.html'),
        meta: { requiresAuth: true }
      },
      {
        path: 'fetchdata',
        component: require('./components/fetchdata/fetchdata.vue.html'),
        meta: { requiresAuth: true }
      },
      {
        path: 'counter',
        component: require('./components/counter/counter.vue.html'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
]

// const routes = [     { path: '/', component:
// require('./components/home/home.vue.html'),meta: { requiresAuth: true } },
//  { path: '/counter', component:
// require('./components/counter/counter.vue.html'),meta: { requiresAuth: true }
// },     { path: '/fetchdata', component:
// require('./components/fetchdata/fetchdata.vue.html') ,meta: { requiresAuth:
// true }},     { path: '/SignIn', component:
// require('./components/SignIn/SignIn.vue.html') ,meta: { requiresAuth: false
// }} ];

var router = new VueRouter({mode: 'history', routes: routes});



router.beforeEach((to, from, next) => {
    
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in if not, redirect to login page.

      if (!AuthService.isSignedInIn()) {
        next({
          path: '/SignIn',
          query: {
            redirect: to.fullPath
          }
        })
      } else {
        next()
      }
    } else {
      next() // make sure to always call next()!
    }
  })


  const app = new Vue({
    el: '#app-root',
    router:router ,
    render: h => h(require('./components/app/app.vue.html'))
  });