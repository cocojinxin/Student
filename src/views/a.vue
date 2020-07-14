<template>
  <div class="home">
    <div class="header">
      <el-select v-model="value" @change='inputt' placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
      <div>
        学生名称或手机号查询:
        <el-input v-model="nickname"
                  placeholder="模糊查询"
                  style="width:200px"></el-input>
      </div>
      <el-button type="success"
                 @click="tables()">搜索</el-button>
      <el-button type="info"
                 @click="chong()">重置</el-button>
    </div>
    <el-table style="width: 100%;"
              :data="list.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              value-format="timestampToTime">
              
      <el-table-column type="index"
                       width="50">
      </el-table-column>
      <el-table-column label="学生姓名"
                       prop="nickname"
                       width="180">
        <template slot-scope="scope">
          <img :src="scope.row.avatar"
               alt="">
          <span>{{scope.row.nickname}}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号"
                       prop="mobile"
                       width="180">
      </el-table-column>
      <el-table-column label="状态"
                       prop="status"
                       width="50">
        <template slot-scope="scope">
          <span v-if="scope.row.status===0">禁用</span>
          <span v-if="scope.row.status===1">启用</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间"
                      :formatter="formatDate"
                       prop="created_at"
                       width="180">
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[5, 10, 20, 40]"
                   :page-size="pagesize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="list.length">
    </el-pagination>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      list: [],
      currentPage: 1, //初始页
      pagesize: 10,    //    每页的数据
      userList: [],
      flag: false,
      filterTableDataEnd: [],
      nickname: '',
      listData: [],
      options:[
        {
           value: '1',
          label: '启用'
        },
                {
           value: '0',
          label: '禁用'
        }
      ],
      value: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      axios.get('api/list.json').then(res => {
        this.list = res.data
      })
    },
    handleSizeChange: function (size) {
      this.pagesize = size;
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
    chong () {
      this.init()
      this.nickname= ''
    },
    tables () {
      let _this = this;
      _this.list = _this.list.filter(Val => {
        if (Val.nickname.includes(_this.nickname) || Val.mobile.includes(_this.nickname)) {
          _this.list.push(Val);
          return _this.list;
        }
      })
    },
    inputt() {
      let _this = this;
      if(this.value){
        _this.list = _this.list.filter(Val => {
          if (Val.status.includes(_this.value) ) {
            _this.list.push(Val);
            return _this.list;
          }
        })
      }

    },
    formatDate(row, column, cellValue, index) {
      if (cellValue == null || cellValue == "") return "";
      let date = new Date(parseInt(cellValue)*1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + '-';
      let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
      let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
      let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
      let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
      let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  width: 20px;
  height: 20px;
}
</style>
