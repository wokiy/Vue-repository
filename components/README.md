# 组件案例和知识

###  动态组件
 
 > 有的时候，在不同组件之间进行动态切换是非常有用的，比如在一个多标签的界面里：上述内容可以通过 Vue 的 <component> 元素加一个特殊的 is 特性来实现：
  
 ```
  <!-- 组件会在 `currentTabComponent` 改变时改变 -->
  <component v-bind:is="currentTabComponent"></component>
 ```
 
 > 在上述示例中，currentTabComponent 可以包括

 - 已注册组件的名字，或
 - 一个组件的选项对象
