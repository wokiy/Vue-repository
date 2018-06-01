# Vue商城前端代码分析(vue-cli脚手架-webpack项目骨架)
## index.html
> 首页添加统计代码和用户行为代码
```
   // hotjar 用户行为统计
  (function (h, o, t, j, a, r) {
    h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments) }
    h._hjSettings = { hjid: 695959, hjsv: 6 }
    a = o.getElementsByTagName('head')[0]
    r = o.createElement('script')
    r.async = 1
    r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv
    a.appendChild(r)
  })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=')

  // 百度统计
  var _hmt = _hmt || [];
  (function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?5804d09853fcc4866132fbc306348993";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
```
## main.js(入口js)
- 导航守卫API使用 （登录校验路由跳转）

//不能登录页面 
> const whiteList = ['/home', '/goods', '/login', '/register', '/goodsDetails', '/thanks', '/search', '/refreshsearch', '/refreshgoods'] 

- 导航守卫钩子函数( beforeEach(function(to,from,next)))
```
   router.beforeEach(function(to,from ,next) {
       //获取登录参数信息 存储在变量params
       let params = {
         params: {
         //登录信息
         token: getStore('tekon');//localStorage存储登录信息
         }
       }
       userInfo(params).then(res=> {
         if(res.result.state !==1){//主要看api接口设置state的位置
            //!==1 没有用户登录信息
            if(whiteList.indexOf(to.path) !== -1) {
               //但是点击不用登录可访问的页面== 放行
               next()
            }else{
               next('/login')
            }
         }else{
            store.commit('RECORD_USERINFO',{info: res.result})
            if(to.path =='/login') {
               next({path: '/'})
            }
            next()
         }
       })
   })
   
   new Vue({
      el: '#app',
      store,
      router,
      render: h =>h(App)
   })
   
```
## App.vue
 - 路由设置
 ```
   <template>
      <div id="app">
         <router-view class="main"></router-view>
      </div>
   </template>
 ```
## router(路由设置)
- 路由懒加载

> const Index = () =>import('/page/index.vue'); //...........
```
   import Vue from 'vue';
   import Router from 'vue-router';
   
   //路由懒加载
   const Index = () => import('/page/index.vue');
   ......//加载其他路由对应的组件
   
   Vue.use(Router);
   export default new Router{
     routes: [
         {
            path: '/',
            component: Index,
            name: 'Index',
            redirect: '/home',
            children: [
               {path: 'home', component:Home},
               ......
            ]
         },
         ......
         {path: '*', redirect: '/home'}
     ] 
   } 
```
## Vuex 使用
 ### action.js
   > export default {}
   
 ### index.js
  ```
   import Vue from 'vue';
   import Vuex from 'vuex';
   import  mutations from './mutations';
   import action from './action'
   Vue.use(Vuex);
   
   const state = {
    login: false;//是否登录
    userInfo: null;//用户信息
    cartList:[];//购物车裂变
    showMoveImg: false;//小球动画
    elleft:0;
    ......
    showCart: false;//是否显示购物车
   }
   
   export default new Vuex.store{
      state,
      action,
      mutations
   }
   
  ```
 ### mutations-type(事件类型==选择对应的mutations处理)
  ```
   export const INIT_BUYCART = 'INIT_BUYCART'
   export const ADD_CART = 'ADD_CART'
   export const GET_USERINFO = 'GET_USERINFO'
   export const RECORD_USERINFO = 'RECORD_USERINFO'
   export const ADD_ANIMATION = 'ADD_ANIMATION'
   export const SHOW_CART = 'SHOW_CART'
   export const REDUCE_CART = 'REDUCE_CART'
   export const EDIT_CART = 'EDIT_CART'

  ```
 ### mutations 
  > 导入mutations-type 事件类型
  
  ```
   import {  INIT_BUYCART,
     ADD_CART,
     GET_USERINFO,
     RECORD_USERINFO,
     ADD_ANIMATION,
     SHOW_CART,
     REDUCE_CART,
     EDIT_CART} from './mutations-type';
     
    import {setStore, getStore} from '../utils/storage';
    export default {
      //网站初始化缓存中获取购物车数据
      [INIT_BUYCART] (state) {
       let initCart = getStore('buyCart')
         if(initCart) {
            //如果有数据 更新state index.js 中的 cartList数据
            state.cartList = JSON.parse(initCart);//json.stringfy()将对象、数组转换成字符串；json.parse()将字符串转成json对象。      
         }
      },
     //加入购物车
     [ADD_CART] (state, {productId, salePrice, productName, productImg, productNum = 1}) {
      let cart = state.cartList;
      let flag = true;
      let goods = {
         productId,
         salePrice,
         productName,
         productImg
       }
      if(cart.length) {//cart有内容
         cart.forEach(item => {
            if(item.pruductId === productId){
               if(item.productNum >=0){
                  flag = false;
                  item.productNum += productNum;
               }
            }
         })
       } 
       
       // cart.length原理来说是一定有的，只是productId 是否相同而已. 如果走了上层的逻辑 flag===false. !cart.length || flag == false || false
       =false ，不走下面if的逻辑了。反之走下面的逻辑添加新的商品到购物车中.
       
       if (!cart.length || flag) {
         goods.productNum = productNum
         goods.checked = '1'
         cart.push(goods)
       }
       state.cartList = cart
       // 存入localStorage
       setStore('buyCart', cart)
     }
    }
     // 加入购物车动画
     ......
     
     // 是否显示购物车
     
     [SHOW_CART] (state, {showCart}) {
         state.showCart = showCart; 
     }
     
     //移出商品
     [REMOVE_CART] (state, {productId}) {
      let cart = state.cartList;
      cart.forEach((item,i) => {
         if(item.productId === productId) {
            //找到id进行 --操作
            if(item.productId > 1){
               item.productId--
            }else{//数量1直接删除
               cart.splice(i, 1);
            }
         }
      })
      //更新state =>cartList
      state.cartList = cart;
      //存入localStorage
      setStore('buyCart', state.cartList);
     },
     //修改购物车
     [DEIT_CART] (state,{productId,productNum,checked}) {
      let cart = state.cartList;
      if(productNum) {
         cart.forEach((item,i) => {
            if(item.productId === productId) {
               item.productNum = productNum;
               item.checked = checked;
            }
         })
      }else if(productId) {
         cart.forEach((item,i) => {
            if(item.productId === productId) {
               cart.splice(i,1);
            }
         })
      }else {
         cart.forEach((item) => {
            item.checked = checked ? '1' : '0';
         })
       }
      //修改到state中.
      state.cartList = cart;
      //存到localStorage中
      setStore('buyCart',state.cartList);
     },
    //记录用户信息
    [RECORD_USERINFO]（state, info） {
      state.userInfo = info;
      state.login = true
      setStore('userInfo', info)
    },
    //获取用户信息
    [GET_USERINFO] (state,info) {
      if(state.userinfo && (state.userInfo.username !== info.username)) {
         return;
      }
      if(!state.login) {
         return
      }
     if(!info.message) {
      state.userInfo = {...info}
     }else {
      state.userInfo = null;
     }
    }
     
  ```
 # common目录
  
 ## header.vue 公共组件编写
 > element-ui {el-autocomplete 实现远程搜索的下拉框} 详细操作查看API <a href="http://element.eleme.io/#/zh-CN/component/input">el-autocomplate</a>
  
  ```
   ....
    <el-autocomplete
      placeholder="请输入商品信息"
      icon="search"
      v-model="input"
      minlength=1
      maxlength=100
      :fetch-suggestions="querySearchAsync"
      @select="handleSelect"
      :on-icon-click="handleIconClick"
      @keydown.enter.native="handleIconClick">
     </el-autocomplete>
    ....
    
    ...
         import YButton from '/components/YButton'
         import { mapMutations, mapState } from 'vuex'
         import { getCartList, cartDel, getQuickSearch } from '/api/goods'
         import { loginOut } from '/api/index'
         import { setStore, getStore, removeStore } from '/utils/storage'
         export defaul {
           ....       
           
           methods: {
                       
             //加载搜索提示
             loadAll() {
                  getQuickSearch(this.input).then(res=>{
                  var array = [];
                  var maxSize = 5;

                  if (res.hits.hits.length <= 5) {
                      maxSize = res.hits.hits.length
                  }
                  for(var i=0; i<macSize;i++) {
                     var obj = {};
                     //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
                     obj.value = res.hits.hits[i]._source.productName;
                     array.push(obj)
                  }
                  if(arrat.length !== 0){
                     this.searchResult = array;                    
                  }else{
                     this.searchResult = [];
                  }
               })
             }
             //queryString 是搜索框输入的值  cb是回调函数 将处理好的数据推回
             querySearchAsync (queryString,cb) {
               if (this.input === undefined) {
                  cb([])
                  return 
               } 
               this.input = this.input.trim()
               if (this.input === '') {
                  cb([])
                  return
               }else{
                  this.loadAll()
                  setTimeout(() => {
                     cb(this.searchResult)
                  },300)
               }
            },
           }
         }
    ...
     
     
  ```
   
   
   
   
  
   

   
 
    
    



   





























  
