<template>
  <div class="amap-page-container">
    <el-amap vid="amapDemo" :zoom="zoom" :center="center" class="amap-demo" :events="events">
      <!--台风图片-->
      <el-amap-ground-image class="icon" v-for="groundimage in groundimages"
                            :url="groundimage.url" :bounds="groundimage.bounds"
                            :events="groundimage.events">

      </el-amap-ground-image>

      <!--绘制折线-->
      <el-amap-polyline :editable="polyline.editable"  :path="polyline.path" :events="polyline.events" :strokeWeight="polyline.strokeWeight"></el-amap-polyline>

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
    height: 560px;
    width: 1320px;
    z-index: 666;
  }
  .prompt {
    background: white;
    width: 100px;
    height: 30px;
    text-align: center;
    color:red;
  }

</style>
<script>
  // import { AMapManager } from 'vue-amap';
  // let amp = new AMapManager();
  //引入台风数据
  import  data from './mockData2';
  import  amp from './aMapManager2';
  export default {
    data() {
      return {
        zoom: 4,
        center: [130.40, 15.10],
        markers: [],
        windows: [],
        window: '',
        //图片覆盖物
        //绘制折线
        polyline: {
          // path: [[165.3,12.9],[159.2,14.6],[151.2,15.2],[144.3,14.1],[138.7,13.7],[134.0,14.3],[129.5,14.9],[125.5,16.6],[120.5,18.1],[117.6,19.5],[116.0,20.3],[113.8,21.4],[111.6,22.0],[109.6,22.5],[108.3,23.2],[108.3,23.2],[106.6,24.0]],
          strokeColor:'red',
          strokeWeight:2,
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
        },

        // events: {
        //   init(map) {
        //     // 路径轨迹组件
        //     AMapUI.load(['ui/misc/PathSimplifier'], function (PathSimplifier){
        //       if (!PathSimplifier.supportCanvas) {
        //         alert('当前环境不支持 Canvas！');
        //         return;
        //       }
        //       var pathSimplifierIns = new PathSimplifier({
        //         zIndex: 100,
        //         autoSetFitView:false,
        //         map: map, //所属的地图实例
        //         getPath: function(pathData, pathIndex) {
        //           return pathData.path;
        //         },
        //         renderOptions: {
        //           //轨迹线的样式
        //           pathLineStyle: {
        //             strokeStyle: '#006600',
        //             lineWidth: 3,
        //             dirArrowStyle: true
        //           }
        //         }
        //       });
        //       window.pathSimplifierIns = pathSimplifierIns;
        //       //设置数据
        //       pathSimplifierIns.setData([{
        //         name: '路线0',
        //         path: [[165.3,12.9],[159.2,14.6],[151.2,15.2],[144.3,14.1],[138.7,13.7],[134.0,14.3],[129.5,14.9],[125.5,16.6],[120.5,18.1],[117.6,19.5],[116.0,20.3],[113.8,21.4],[111.6,22.0],[109.6,22.5],[108.3,23.2],[108.3,23.2],[106.6,24.0]]
        //       }]);
        //       //对第一条线路（即索引 0）创建一个巡航器
        //       var navg1 = pathSimplifierIns.createPathNavigator(0, {
        //         loop: true, //循环播放
        //         speed: 1000000,//巡航速度，单位千米/小时
        //         pathNavigatorStyle: {
        //           width: 44,
        //           height: 44,
        //           //使用图片
        //           content: PathSimplifier.Render.Canvas.getImageContent('../../static/typhoon.png', onload, onerror),
        //           strokeStyle: null,
        //           fillStyle: null,
        //         }
        //       });
        //       navg1.start();
        //     });
        //   }
        // },
        events: {
          init(map) {
            // 路径轨迹组件
            AMapUI.load(['ui/misc/PathSimplifier'], function (PathSimplifier) {
              if (!PathSimplifier.supportCanvas) {
                alert('当前环境不支持 Canvas！');
                return;
              }
              var pathSimplifierIns = new PathSimplifier({
                zIndex: 100,
                autoSetFitView: false,
                map: map, //所属的地图实例
                getPath: function(pathData, pathIndex) {

                  return pathData.path;
                },
                getHoverTitle: function(pathData, pathIndex, pointIndex) {

                  if (pointIndex >= 0) {
                    //point
                    return pathData.name + '，点：' + pointIndex + '/' + pathData.path.length;
                  }

                  return pathData.name + '，点数量' + pathData.path.length;
                },
                renderOptions: {
                  //轨迹线的样式
                  pathLineStyle: {
                    strokeStyle: '#41b883',
                    lineWidth: 3,
                    borderWidth:0
                    // dirArrowStyle: true
                  },
                  renderAllPointsIfNumberBelow: 100, //绘制路线节点，如不需要可设置为-1
                  pathLineHoverStyle:"#41b883",
                  keyPointStyle:{
                    radius:4,
                    fillStyle:'red',
                    strokeStyle:'red',
                    lineWidth:0
                  },
                  //起点颜色
                  startPointStyle:{
                    fillStyle:"red"
                  },
                  //鼠标移动到点的样式
                  keyPointHoverStyle:{
                    fillStyle:"red",
                    strokeStyle:'red'
                  }
                }

              });

              window.pathSimplifierIns = pathSimplifierIns;

              var myPath = [[165.3,12.9],[159.2,14.6],[151.2,15.2],[144.3,14.1],[138.7,13.7],[134.0,14.3],[129.5,14.9],[125.5,16.6],[120.5,18.1],[117.6,19.5],[116.0,20.3],[113.8,21.4],[111.6,22.0],[109.6,22.5],[108.3,23.2],[108.3,23.2],[106.6,24.0],],
                endIdx = 0,
                data = [{
                  name: '动态路线',
                  path: myPath.slice(0, 1)
                }];

              pathSimplifierIns.setData(data);

              //对第一条线路（即索引 0）创建一个巡航器
              var navg1 = pathSimplifierIns.createPathNavigator(0, {
                loop: true, //循环播放
                speed: 1000 //巡航速度，单位千米/小时
              });

              //对第一条线路（即索引 0）创建一个巡航器
              var navg1 = pathSimplifierIns.createPathNavigator(0, {
                loop: true, //循环播放
                speed: 1000 //巡航速度，单位千米/小时
              });

              function expandPath() {

                function doExpand() {

                  endIdx++;

                  if (endIdx >= myPath.length) {
                    return false;
                  }

                  var cursor = navg1.getCursor().clone(), //保存巡航器的位置
                    status = navg1.getNaviStatus();


                  data[0].path = myPath.slice(0, endIdx + 1);
                  pathSimplifierIns.setData(data); //延展路径


                  //重新建立一个巡航器
                  navg1 = pathSimplifierIns.createPathNavigator(0, {
                    loop: true, //循环播放
                    speed: 1000000, //巡航速度，单位千米/小时
                    //轨迹巡航器
                    pathNavigatorStyle: {
                      width: 24,
                      height: 24,
                      pathLinePassedStyle: null,
                      //使用图片
                      content: PathSimplifier.Render.Canvas.getImageContent('../../static/typhoon.png', onload, onerror),
                      strokeStyle: null,
                      fillStyle: null,
                    }
                  });

                  if (status !== 'stop') {
                    navg1.start();
                  }

                  //恢复巡航器的位置
                  if (cursor.idx >= 0) {
                    navg1.moveToPoint(cursor.idx, cursor.tail);
                  }
                  return true;
                }
                if (doExpand()) {

                  setTimeout(expandPath, 1000);
                }
              }
              navg1.start();
              expandPath();
            });
          }
        }
      }
    },
    // created() {
    //   //线的位置信息
    //   let path = [];
    //   //窗体信息
    //   let windows = [];
    //   //点位置集合
    //   let markers = [];
    //   //vue实例对象
    //   let self = this;
    //   //点的数量长度
    //   let num = data.points.length;
    //   //获取点对象集合
    //   let points = data.points;
    //   for (let i = 0; i < num; i++){
    //     markers.push({
    //       //往数组塞点对象
    //       center: points[i].position,
    //       radius: 4,
    //       fillColor: '#006600',
    //       fillOpacity: 1,
    //       events:{
    //         mouseover:()=>{
    //           self.markers[i].radius = 6;
    //           self.windows.forEach(window => {
    //             window.visible = false;
    //           });
    //           self.window = self.windows[i];
    //           self.$nextTick(() => {
    //             self.window.visible = true;
    //           });
    //         },
    //         mouseout: ()=>{
    //           self.markers[i].radius = 4  ;
    //           self.windows.forEach(window => {
    //             window.visible = false;
    //           });
    //         }
    //       }
    //     });
    //     //塞窗体信息
    //     windows.push({
    //       position:points[i].position,
    //       content:`<div class="prompt">我是台风</div>`,
    //       visible: false
    //     });
    //
    //   }
    //   this.markers = markers;
    //   this.windows = windows;
    // },
    components:{
      amp
    }

  };
</script>
