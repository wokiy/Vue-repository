# 过滤器使用
 > Vue.js 允许你自定义过滤器，可被用于一些常见的文本格式化。过滤器可以用在两个地方：双花括号插值和 v-bind 表达式 (后者从 2.1.0+ 开始支持)。过滤器应该    被添加在 JavaScript 表达式的尾部，由“管道”符号指示：
  
 ```
  <!-- 在双花括号中 -->
  {{ message | capitalize }}

  <!-- 在 `v-bind` 中 -->
  <div v-bind:id="rawId | formatId"></div>
 ```
 
 > 你可以在一个组件的选项中定义本地的过滤器：
  ```
  vue文件
   <template>
    <p>{{message | capitalize}}</p>
   </template>
   ......
   filters: {
    capitalize: function (message) {
      if (!message) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
       }
     }
  ```
  > demo显示
   ![demo案例](http://wx1.sinaimg.cn/orj360/a8bf8822ly1frfbaxfibjj20go0323yb.jpg)
