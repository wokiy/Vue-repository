# router(路由)

### Vue 页面间跳转及传值
 1. 路由配置：
 ```
    export default new Router({
      mode: 'history',
      routes: [{
        path: '/',
        name: 'RootPath',
        meta: {
          keepAlive: true
        },
        component: MainSec
      }, {
        path: '/quiz/:id',
        name: 'quiz',
        component: QuizSec
      }, {
        path: '/result/:id/:rid/:fr',
        name: 'result',
        component: ResultSec
      }]
    })
 ```
 
 
 
  
