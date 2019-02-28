<template>
  <div class="amap-page-container">
    <el-amap vid="amapDemo" :zoom="zoom" :center="center" class="amap-demo">

      <!--绘制折线-->
      <el-amap-polyline :editable="polyline.editable"  :path="polyline.path" :events="polyline.events"></el-amap-polyline>
      <!--绘制原点-->
      <el-amap-circle-marker v-for="marker in markers" :center="marker.center"
                             :radius="marker.radius"
                             :fill-color="marker.fillColor"
                             :position="marker.position"
                             :fill-opacity="marker.fillOpacity" :events="marker.events">

      </el-amap-circle-marker>

      <el-amap-info-window v-if="window" :position="window.position" :visible="window.visible" :content="window.content"></el-amap-info-window>
    </el-amap>
  </div>
</template>

<style>
  .amap-page-container{
    margin: 0 auto;
    height: 560px;
    width: 1320px;
  }
  .amap-demo {
    height: 300px;
  }
  .prompt {
    background: white;
    width: 100px;
    height: 30px;
    text-align: center;
  }
</style>
<script>
  // import { AMapManager } from 'vue-amap';
  // let amapManager = new AMapManager();
  //引入台风数据
  import  data from './mockData2';
  export default {
    data() {
      return {
        zoom: 5,
        center: [140.40, 15.10],
        markers: [],
        windows: [],
        window: '',
        //绘制折线
        polyline: {
          path: [[165.3,12.9],[159.2,14.6],[151.2,15.2],[144.3,14.1],[138.7,13.7],[134.0,14.3],[129.5,14.9],[125.5,16.6],[120.5,18.1],[117.6,19.5],[116.0,20.3],[113.8,21.4],[111.6,22.0],[109.6,22.5],[108.3,23.2],[108.3,23.2],[106.6,24.0],],
          events: {
            click(e) {
              alert('click polyline');
            },
            end: (e) => {
              let newPath = e.target.getPath().map(point => [point.lng, point.lat]);
              console.log(newPath);
            }
          },
          editable: false
        }
      }
    },
    mounted() {
      //线的位置信息
      let path = [];
      //窗体信息
      let windows = [];
      //点位置集合
      let markers = [];
      //vue实例对象
      let self = this;
      //点的数量长度
      let num = data.points.length;
      //获取点对象集合
      let points = data.points;
      for (let i = 0; i < num; i++){
        markers.push({
          //往数组塞点对象
          center: points[i].position,
          radius: 4,
          fillColor: '#006600',
          fillOpacity: 1,
          events:{
            mouseover:()=>{
              self.windows.forEach(window => {
                window.visible = false;
              });
              self.window = self.windows[i];
              self.$nextTick(() => {
                self.window.visible = true;
              });
            }
          }
        });
        //塞窗体信息
        windows.push({
          position:points[i].position,
          content:`<div class="prompt">ssss</div>`,
          visible: false
        });

      }
      this.markers = markers;
      this.windows = windows;
    }
  };
</script>
