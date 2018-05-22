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
 2.  标签跳转
  ```
   <router-link class="" :to="{ name: 'RootPath', params: {} }">
    <img src="require('/logo.png')" alt="" style="">
   </router-link>
   //跳转外部链接，使用a标签
  ```
 3. 利用router跳转
  ```
   //方法一
    var s = '/result/' + id + '/' + answerId + '/' + resultFrToken
    _this.$router.push({path: s})
    //方法二
    _this.$router.push({name: 'result', params: {id: id, rid: answerId, fr: resultFrToken})
    /*
    *   利用方法二 可以完成页面间自定义传值，而不会在url上显示
    *   比如_this.$router.push({name: 'result', params: {id: id, rid: answerId, fr: resultFrToken, xx: 11})
    *   result页面
    *   _this.$route.params.xx 获取
  ```
 4. 利用router.beforeEach方法传参
  ```
   //main.js
    router.beforeEach((to, from, next) => {
      console.log('to', to)
      //为每一次路由跳转添加referrer参数获取前一跳路由name
      to.params.referrer = from.name
      if (to.name === null) {
        next({
          path: '/'
        })
      } else {
        next()
      }
    })
    //.vue中
    //_this.$route.params.referrer 获取
  ```
  
 
 
  
