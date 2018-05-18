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
  
 > 过滤函数总接收表达式的值（之前链式操作结果 asjQ作为第一个参数，在上诉例子中，capitalize过滤函数接收message作为第一个参数的值
   过滤器可以连续写
   
   ```
    {{message | filters1 | filters2}}
   ```
 > 在这个例子中，filterA 被定义为接收单个参数的过滤器函数，表达式 message 的值将作为参数传入到函数中。然后继续调用同样被定义为接收单个参数的过滤器     函数 filterB，将 filterA 的结果传递到 filterB 中。  过滤器是 JavaScript 函数，因此可以接收参数：
   
   ```
    {{ message | filterA('arg1', arg2) }}
     
     这里，filterA 被定义为接收三个参数的过滤器函数。其中 message 的值作为第一个参数，普通字符串 'arg1' 作为第二个参数，表达式 arg2 的值作为第三个      参数。
     
   ```
 
 
  
  
