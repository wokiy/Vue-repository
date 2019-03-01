<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!--<router-link to="/demo">查看高德地图</router-link>-->
    <br>
    <!--<router-link to="/amapManager">查看vue-amap的demo1</router-link>-->
    <br>
    <!--<router-link to="/amapManager2">查看vue-amap的demo2</router-link>-->
    <br>
    <!--<router-link to="/map1">查看vue-amap的map1</router-link>-->
    <br>
    <router-link to="/map">台风路线展示</router-link>
    <br>
    <!--<router-link to="/PathSimplifier">PathSimplifier</router-link>-->
    <!--<amp></amp>-->
  </div>

</template>

<script>
  import  amp from './aMapManager2'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
    amp
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
