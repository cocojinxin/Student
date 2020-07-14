<template>
  <div class="home">
    2123
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

</style>
