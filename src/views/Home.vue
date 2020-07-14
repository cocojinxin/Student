<template>
  <div class="home">
    <div class="left">
      <router-link to="/home/a" tag="div">学员管理</router-link>
      <router-link to="/home/b" tag="div">讲师管理</router-link>
    </div>
    <div class="right">
      <router-view/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import List from './../assets/list'
export default {
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.list = List
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.home{
  width: 100%;
  height: 100%;
}
  .left{
    width: 15%;
    height: 100%;
    float: left;
  }
  .right{
    width: 85%;
    height: 100%;
    float: right;
  }
</style>
