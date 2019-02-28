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
        // name: "aMapManager2"
        data() {
          return {
            zoom: 12,
            center: [121.59996, 31.197646],
            amapManager,
            events: {
              init(map) {
                AMapUI.loadUI(['overlay/SimpleMarker'], function (SimpleMarker) {
                  const marker = new SimpleMarker({
                    iconLabel: 'A',
                    iconStyle: 'red',
                    map: map,
                    position: map.getCenter()
                  });
                });
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
    height: 300px;
    width: 1000px;
  }
</style>
