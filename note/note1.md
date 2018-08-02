## vue note 1

#### 模板(数据绑定)绑定渲染
1. 文本绑定 {{}}
2. 属性绑定 v-bind
> if你想要在标签节点的属性中绑定使用data中的数据成员，泽必须使用v-bind
> 指令来处理 

``` 
    数据绑定
    <!-- data中的成员 -->
    <h1>{{message}}</h1> 
    <!-- 字符串message -->
    <h1>{{'message'}}</h1>
    <!-- 数字123 -->
    <p><{{123}}/p>
    <!-- 半丁data 中的成员，message 正确的用法，也是响应式的 -->
    <h1 :foo="message">text</h1>
    <!-- 字符串 -->
    <h1 v-bind:foo ="'message'">String Text</h1>
    <!-- 伪代码 -->
    h1 v-bind:data-foo ="message"
    a :href="url + 'something'"
```

###### {{}}表达式的使用
``` 
    <!-- 表达式 -->
    {{isTrue ? 'T' : 'F'}}// 大胡子
    {{number +1 }}
    {message.split('').reverse().join(''){}}
    <div v-bind:id ="'list'+ id"></div>
```
    
###### 表单控件双向数据绑定
```
    <!-- 伪代码 -->
    //确实绑定了data中的数据成员
    input type="text" :value= "message"
    // 双向数据绑定 
    input type="text" v-model="message"

```

###### 事件处理
```
    <!-- 伪代码 -->
    v-on:click ="hanlder"

    @click="hanlder"
    //事件名字 不要和data中重名

```

###### 条件渲染
```
    v-if= ""
    v-else = ""
    v-show = ""

```

##### 列表渲染

```
    <!-- 伪代码 -->
    li v-for="item in list"  //数据动态的 
    {{item}}
```

#### ES6 语法
1. let const
> var ： 声明变量
> 变量提升 可以重复声明
> 
> 作用域： 全局作用域 函数作用域
> 
> 没有块级作用域
> 在浏览器中默认是window
> 
> let: 块级作用域 定义变量 
> const: 块级 苏定常量

2. 解构赋值
> 判断是否包含字符串 
> inclue 
> startWidth 
> endsWidth 
> repeat
> 模板字符串  ` ` 代替字符串 的  ++ 操作 
> 
 
3. 解构赋值
> 语法糖

````
     let arr = ['hello', 'world'];
    var [str1, str2] = arr;// 一一对应。顺序
    var obj = {
        name : 'jasonlwy',
        age : 22
    }
    var {name,age} = obj //按照 键名

    //解构赋值交换变量
    let x = 1;
    let y = 2;
    [x,y] = [y,x];

    //elementUI 组件引入解构赋值来
    import {aaa,bbb} from "element-ui";
````

4. 函数的拓展
 
5. 箭头函数
> 表达式 
> 函数声明
> new Function 
> 
> this指向问题
>  cc

```
    var add = (a,b) => {
        return x+ y;
    }
    var add=(a,n) => x+y
    
    // 箭头函数不能当作构造函数

    // 匿名函数使用最多
    forEach 
    map 
    find 
    every 
```
