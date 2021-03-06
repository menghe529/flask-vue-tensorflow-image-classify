// import Vue from 'vue'
// import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

// Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })


import Vue from 'vue'
import Router from 'vue-router'
// import Product from '@/components/Product'   // add

const routerOptions = [
  { path: '/', component: 'Home' },
  { path: '*', component: 'NotFound' },
  // { path: '/about', component: 'About' }
  // {                                              
  //   path: '/product',                    
  //   name: 'Product',                   
  //   component: 'Product'           
  // }
]

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/components/${route.component}.vue`)
  }
})

Vue.use(Router)

export default new Router({
  routes,
  mode: 'history'
})