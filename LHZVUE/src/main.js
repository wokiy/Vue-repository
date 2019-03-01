import Vue from 'vue'
import App from './App'
import router from './router'
//引入高德地图库
import VueAMap from 'vue-amap'

Vue.config.productionTip = false;
//使用amap
Vue.use(VueAMap);
//初始化
VueAMap.initAMapApiLoader({
  //高德key
  key: '8b0ed0ee6401cb3c019a78af96975c2b',
  //插件集合 (定位插件)
  plugin:['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  uiVersion: '1.0', // 版本号
  v: '1.4.4'
});
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
