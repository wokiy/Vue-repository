import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import  demo from "@/components/demo"
import amapManager  from "@/components/amapManager"
import map  from "@/components/map"
import amapManager2  from "@/components/amapManager2"
import map1  from "@/components/map1"
import PathSimplifier  from "@/components/PathSimplifier"

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/demo',
      name: 'demo',
      component: demo
    },
    {
      path:'/amapManager',
      component: amapManager
    },
    {
      path:'/amapManager2',
      component: amapManager2
    },
    {
      path:'/map1',
      component:map1
    },
    {
      path:'/map',
      component:map
    },
    {
        path:"/PathSimplifier",
        component:PathSimplifier
    }
  ]
})
