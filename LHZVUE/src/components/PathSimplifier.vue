<template>
  <div class="amap-page-container">
    <el-amap vid="amapDemo"  :center="center" :amap-manager="amapManager" :zoom="zoom" :events="events" class="amap-demo">
    </el-amap>

    <div class="toolbar">
      <button @click="add()">add marker</button>
    </div>
  </div>
</template>

<style>
  .amap-page-container{
    width: 1332px;
    height: 600px;
    margin: 0 auto;
  }
  .amap-demo {
    height: 300px;
    /*width: 1000px;*/
  }
</style>

<script>

  import { AMapManager } from 'vue-amap';
  let amapManager = new AMapManager();
  export default{
    data() {
      return {
        zoom: 5,
        center: [121.59996, 31.197646],
        amapManager,
        events: {
          init(o) {
            let marker = new AMap.Marker({
              position: [121.59996, 31.197646]
            });
            marker.setMap(o);
          }
        }
      };
    },

    methods: {
      add() {
        let o = amapManager.getMap();
        let marker = new AMap.Marker({
          position: [121.59996, 31.177646]
        });

        marker.setMap(o);
      }
    }
  };
</script>
