<template>
  <div class="amap-page-container">
    <el-amap vid="amapDemo"  :center="center" :map-manager="amapManager" :zoom="zoom" :events="events" class="amap-demo">
    </el-amap>
  </div>
</template>

<script>

  import { AMapManager } from 'vue-amap';
  let amapManager = new AMapManager();

    export default {
        data() {
          return {
            zoom: 4,
            center: [121.59996, 31.197646],
            amapManager,
            events: {
              init(map) {
                // AMapUI.loadUI(['overlay/SimpleMarker'], function (SimpleMarker) {
                //   const marker = new SimpleMarker({
                //     iconLabel: 'A',
                //     iconStyle: 'red',
                //     map: map,
                //     position: map.getCenter()
                //   });
                // });
                // 路径轨迹组件
                AMapUI.load(['ui/misc/PathSimplifier'], function (PathSimplifier){
                  if (!PathSimplifier.supportCanvas) {
                    alert('当前环境不支持 Canvas！');
                    return;
                  }
                  var pathSimplifierIns = new PathSimplifier({
                    zIndex: 100,
                    //autoSetFitView:false,
                    map: map, //所属的地图实例
                    getPath: function(pathData, pathIndex) {
                      return pathData.path;
                    },
                  });
                  window.pathSimplifierIns = pathSimplifierIns;
                  //设置数据
                  pathSimplifierIns.setData([{
                    name: '路线0',
                    path: [[165.3,12.9],[159.2,14.6],[151.2,15.2],[144.3,14.1],[138.7,13.7],[134.0,14.3],[129.5,14.9],[125.5,16.6],[120.5,18.1],[117.6,19.5],[116.0,20.3],[113.8,21.4],[111.6,22.0],[109.6,22.5],[108.3,23.2],[108.3,23.2],[106.6,24.0]]
                  }]);


                  //对第一条线路（即索引 0）创建一个巡航器
                  var navg1 = pathSimplifierIns.createPathNavigator(0, {
                    loop: true, //循环播放
                    speed: 1000000,//巡航速度，单位千米/小时
                    pathNavigatorStyle: {
                      width: 24,
                      height: 24,
                      //使用图片
                      content: PathSimplifier.Render.Canvas.getImageContent('../../static/typhoon.png', onload, onerror),
                      strokeStyle: null,
                      fillStyle: null,
                      //经过路径的样式
                    }
                  });

                  navg1.start();
                });




                // AMapUI.loadUI(['overlay/SvgMarker'], function (SvgMarker) {
                //   const shape = new SvgMarker.Shape.WaterDrop({
                //     height: 60, //高度
                //     //width: **, //不指定时会维持默认的宽高比
                //     fillColor: 'orange', //填充色
                //     strokeWidth: 1, //描边宽度
                //     strokeColor: '#666' //描边颜色
                //   })
                //
                //   var marker = new SvgMarker(
                //     //第一个参数传入shape实例
                //     shape,
                //     //第二个参数为SimpleMarker的构造参数（iconStyle除外）
                //     {
                //       showPositionPoint: true, //显示定位点
                //       map: map,
                //       position: map.getCenter()
                //     }
                //   );
                // });
                // AMapUI.load(['ui/misc/PathSimplifier'], function (PathSimplifier) {
                //   if (!PathSimplifier.supportCanvas) {
                //     alert('当前环境不支持 Canvas！');
                //     return;
                //   }
                //   //启动页面
                //   initPage(PathSimplifier);
                // });
                // function initPage(PathSimplifier) {
                //   //创建组件实例
                //   var pathSimplifierIns = new PathSimplifier({
                //     zIndex: 100,
                //     map: map, //所属的地图实例
                //     getPath: function(pathData, pathIndex) {
                //       //返回轨迹数据中的节点坐标信息，[AMap.LngLat, AMap.LngLat...] 或者 [[lng|number,lat|number],...]
                //       return pathData.path;
                //     },
                //     getHoverTitle: function(pathData, pathIndex, pointIndex) {
                //       //返回鼠标悬停时显示的信息
                //       if (pointIndex >= 0) {
                //         //鼠标悬停在某个轨迹节点上
                //         return pathData.name + '，点:' + pointIndex + '/' + pathData.path.length;
                //       }
                //       //鼠标悬停在节点之间的连线上
                //       return pathData.name + '，点数量' + pathData.path.length;
                //     },
                //     renderOptions: {
                //       //轨迹线的样式
                //       pathLineStyle: {
                //         strokeStyle: 'red',
                //         lineWidth: 6,
                //         dirArrowStyle: true
                //       }
                //     }
                //   });
                //
                //   //这里构建两条简单的轨迹，仅作示例
                //   pathSimplifierIns.setData([{
                //     name: '轨迹0',
                //     path: [
                //       [100.340417, 27.376994],
                //       [108.426354, 37.827452],
                //       [113.392174, 31.208439],
                //       [124.905846, 42.232876]
                //     ]
                //   }, {
                //     name: '大地线',
                //     //创建一条包括500个插值点的大地线
                //     path: PathSimplifier.getGeodesicPath([116.405289, 39.904987], [87.61792, 43.793308], 500)
                //   }]);
                //
                //   //创建一个巡航器
                //   var navg0 = pathSimplifierIns.createPathNavigator(0, //关联第1条轨迹
                //     {
                //       loop: true, //循环播放
                //       speed: 1000000
                //     });
                //
                //   navg0.start();
                // }

              }
            }
          }
        }
    }
</script>

<style>
  .amap-page-container{
    height: 600px;
    width: 1300px;
    margin: 0 auto;
  }
  .amap-demo {
    height: 600px;
    width: 1000px;
  }
</style>
