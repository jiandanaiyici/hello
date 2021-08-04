<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="tid" @change="queryData">
          <el-option
            v-for="(item, key) in searchData"
            :key="key"
            :label="item.nj + item.type"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          class="search-btn el-button--infoSearch"
          icon="el-icon-search"
          type="primary"
          @click="queryData"
          >搜索</el-button
        >
        <el-button class="search-btn el-button--infoSearch" @click="exportExc"
          >导出</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      id="tableOut"
      ref="multipleTable"
      border
      :data="tables.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
      :current-page.sync="currentPage"
      tooltip-effect="dark"
      style="width: 100%"
      class="table_box"
    >
      <el-table-column prop="boDuan" label="波段" fixed width="30">
      </el-table-column>
      <el-table-column prop="daXiao" label="大小店" fixed width="50">
      </el-table-column>
      <el-table-column prop="dianZheng" label="点正挂" fixed width="50">
      </el-table-column>
      <el-table-column prop="daLei" label="大类" fixed width="50">
      </el-table-column>
      <el-table-column prop="shangXia" label="上下装" fixed width="70">
      </el-table-column>
      <el-table-column prop="product" label="款号" width="80" fixed>
      </el-table-column>
      <el-table-column prop="color" label="颜色" width="70" fixed>
      </el-table-column>
      <el-table-column prop="colorCode" label="色号" fixed width="70">
      </el-table-column>
      <el-table-column prop="price" label="单价" fixed width="40">
      </el-table-column>
      <el-table-column prop="beiZhu" label="备注" fixed> </el-table-column>
      <el-table-column prop="isBei" label="是否备料" fixed width="50">
      </el-table-column>
      <el-table-column prop="rank" label="排名" fixed width="50">
      </el-table-column>
      <el-table-column prop="isIp" label="是否IP款" width="130" fixed>
        <template slot-scope="scope">
          <div class="inputDeeps">
            <textarea
              v-model="scope.row.isIp"
              class="ky"
              style="resize: none"
              placeholder="仅支持输入y/n"
              size="small"
              @change="handleEdits(scope.row.id, scope.row.isIp)"
              type="text"
              onkeyup="this.value=this.value.replace(/[^n/yN-Y]/g,'')"
              >{{ scope.row.isIp }}</textarea
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="qty" label="合" fixed width="40">
      </el-table-column>
      <!-- 区域数据 -->
      <template v-for="areaitem in areasData">
        <div :key="areaitem.id">
          <!-- 店铺名 -->
          <el-table-column :label="areaitem.name + areaitem.amount">
            <template v-for="storeitem in storeAlldata">
              <div :key="storeitem.id">
                <el-table-column
                  v-if="areaitem.id == storeitem.areaId"
                  :label="storeitem.storeName + storeitem.storeId"
                >
                  <!-- 索引 -->
                  <el-table-column
                    v-for="(item, index) in sizehead"
                    :key="index + 'i'"
                    :label="index != 6 && index != 7 ? '0' + item : item"
                  >
                    <template slot-scope="scope">
                      <span
                        class="inputDeep"
                        v-for="(ii, kk) in scope.row.foItems"
                        :key="kk"
                      >
                        <div v-if="ii.storeId === storeitem.storeId">
                          <!-- 索引判断 -->
                          <textarea
                            @change="handleEdit(ii.id, ii.qty)"
                            v-if="Number(ii.sizeId) == Number('0' + item)"
                            v-model="ii.qty"
                            class="area_item"
                            >{{ ii.qty }}</textarea
                          >
                          <!-- 加上这个就会导致input突然增多 -->
                          <!-- <textarea class="area_item" v-else>item</textarea> -->
                          <textarea
                            disabled
                            v-if="ii.sizeId === item && item === '合'"
                            v-model="ii.qty"
                            class="area_item"
                            >{{ ii.qty }}</textarea
                          >
                          <textarea
                            disabled
                            v-if="ii.sizeId === item && item === '额'"
                            v-model="ii.amount"
                            class="area_item"
                            >{{ ii.amount }}</textarea
                          >
                        </div>
                      </span>
                      <span
                        v-if="
                          _.get(
                            _.find(scope.row.foItems, {
                              sizeId: '0' + item,
                              storeId: storeitem.storeId,
                            }),
                            'id',
                            '0',
                          ) == 0 &&
                          item != '额' &&
                          item != '合'
                        "
                      >
                        <textarea
                          @click="
                            addData(scope.row, storeitem, sizehead, '0' + item)
                          "
                          v-model="qty"
                          :qty="qty"
                          :id="scope.row.id"
                          :soId="storeitem.soId"
                          :sizeId="sizehead.item"
                          class="area_item"
                        >
{{}}</textarea
                        >
                      </span>
                    </template>
                  </el-table-column>
                </el-table-column>
              </div>
            </template>
          </el-table-column>
        </div>
      </template>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[15]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totals"
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from 'axios';
import FileSaver from 'file-saver';
import XLSX from 'xlsx';

export default {
  name: 'Hi',
  data() {
    return {
      storeitem: [],
      sendAlldata: [], //获取更新后的数据
      id: [],
      qty: [],
      soId: [],
      tid: '1', //顶部联动搜索
      search: '', //模糊查询
      commodity: [], //商品列表
      commoditys: [],
      storeAlldata: [], //门店列表
      areasData: [], //区域列表
      searchData: [], //搜索
      sizehead: [1, 2, 3, 4, 5, 6, '合', '额'],

      tableData: [],
      currentPage: 1,
      pagesize: 10, //每页显示*条
      totals: 0,
    };
  },
  created() {
    this.getList();
  },
  computed: {
    // 模糊查询
    tables() {
      const search = this.search;
      if (search) {
        return this.commodity.filter((data) => {
          return Object.keys(data).some((key) => {
            return String(data[key]).toLowerCase().indexOf(search) > -1;
          });
        });
      }
      return this.commodity;
    },
  },
  mounted() {
    // 获取商品列表
    this.queryData();
  },
  methods: {
    // 翻页
    handleSizeChange(val) {
      console.log('val0000000000000000', val);
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    // 内容居中
    headClass() {
      return 'text-align:center;';
    },
    // 导出excel
    exportExc() {
      let fix = document.querySelector('.el-table__fixed');
      let wb;
      if (fix) {
        //判断要导出的节点中是否有fixed的表格，如果有，转换excel时先将该dom移除，然后append回去
        wb = XLSX.utils.table_to_book(
          document.querySelector('#tableOut').removeChild(fix),
        );
        document.querySelector('#tableOut').appendChild(fix);
      } else {
        wb = XLSX.utils.table_to_book(document.querySelector('#tableOut'));
      }
      let wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array',
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: 'application/octet-stream' }),
          '订货会模板.xlsx',
        );
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout);
      }
      return wbout;
    },

    // 搜索功能
    getList() {
      const service = axios.create({
        baseURL: '/WBService', // url = base url + request url
        withCredentials: true, // send cookies when cross-domain requests
        timeout: 20000, // request timeout
      });
      // 获取模板列表
      service({
        url: '/bi/getTemplates',
        method: 'post',
      }).then((res) => {
        // console.log("res.data.data", res.data.data);
        this.searchData = res.data.data;
      });
    },

    // 清除搜索
    clearListSearch() {
      this.getList();
    },

    // 计算合   replace(/\b(0+)/gi, "");
    getTotal(foItems, item) {
      var totalQty = 0;
      foItems.forEach(function (f) {
        if (f.storeId == item.storeId) {
          totalQty += Number(f.qty); //这里的问题 += 是我百
          // console.log('totalcQty====',totalQty)
          // console.log('f.qty',f.qty,typeof(f.qty))
        }
      });
      return totalQty;
    },

    // 计算额
    forehead(foItems, item, price) {
      return (this.getTotal(foItems, item) * price).toFixed(2);
    },

    // 修改数据接口成功
    open2() {
      this.$message({
        showClose: true,
        message: '修改成功',
        type: 'success',
      });
    },
    // 修改数据接口失败
    open4() {
      this.$message({
        showClose: true,
        message: '修改失败',
        type: 'error',
      });
    },
    // 全局内容居中
    cellStyleFun() {
      return 'text-align:center;';
    },

    // 新增商品信息
    addData(id, storeitem, sizehead, sizeId) {
      //  console.log("sizehead",sizehead, sizeId)
      const service = axios.create({
        baseURL: '/WBService', // url = base url + request url
        withCredentials: true, // send cookies when cross-domain requests
        timeout: 20000, // request timeout
      });
      service({
        url: '/bi/addItem',
        method: 'post',
        data: {
          id: id.id,
          qty: `${storeitem.qty}`,
          soId: storeitem.soId,
          sizeId: sizehead,
          sizeId,
        },
      }).then((res) => {
        this.queryData();
        // console.log("res000000000000000000000",res)
      });
    },

    handleEdits(id, isIp) {
      // 更新商品信息
      // console.log("storeId", id);
      // console.log("qty", isIp);
      const service = axios.create({
        baseURL: '/WBService', // url = base url + request url
        withCredentials: true, // send cookies when cross-domain requests
        timeout: 20000, // request timeout
      });
      service({
        url: '/bi/updateProduct',
        method: 'post',
        data: { id: id, isIp: isIp },
        // params: { id: "13913655", qty: "5" },
        // body: JSON.stringify({ id: "13913655", qty: "5" }),
      }).then((res) => {
        if (res.data.code == 0) {
          // console.log("是否ip款", res);
          this.$message({
            showClose: true,
            message: '修改成功',
            type: 'success',
          });
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: 'error',
          });
        }
      });
    },
    handleEdit(id, storeitem) {
      // 更新明细数量
      console.log('id', id);
      // console.log("qty", qty);
      const service = axios.create({
        baseURL: '/WBService', // url = base url + request url
        withCredentials: true, // send cookies when cross-domain requests
        timeout: 20000, // request timeout
      });
      service({
        url: '/bi/updateItem',
        method: 'post',
        data: { id: id, qty: storeitem.qty },
        // params: { id: "13913655", qty: "5" },
        // body: JSON.stringify({ id: "13913655", qty: "5" }),
      }).then((res) => {
        if (res.data.code == 0) {
          console.log('res', res);
          this.$message({
            showClose: true,
            message: '修改成功',
            type: 'success',
          });
          this.queryData();
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: 'error',
          });
        }
        // console.log(res);
      });
    },
    queryData() {
      // 定义请求方式
      const service = axios.create({
        baseURL: '/WBService', // url = base url + request url
        withCredentials: true, // send cookies when cross-domain requests
        timeout: 20000, // request timeout
      });

      // 获取门店
      service({
        url: '/bi/getStores?templateId=' + this.tid,
        method: 'post',
      }).then((res) => {
        this.storeAlldata = res.data.data;
      });

      // 商品（分页）
      service({
        url: '/bi/pageProducts',
        data: { templateId: '1', pageNo: 1, pageSize: 100 },
        method: 'post',
      }).then((res) => {
        this.commodity = res.data.data.list;
        this.totals = res.data.data.total;
      });

      // 区域接口
      service({
        url: '/bi/getAreas?templateId=1',
        method: 'post',
      }).then((res) => {
        this.areasData = res.data.data;
      });
    },
  },
};
</script>

<style>
/* 表头字体 */
thead tr th {
  color: black;
  font-size: 14px;
  /* border: 1px solid rgb(95, 94, 94); */
}

/* 表头字体 */
thead tr:nth-of-type(1) th:nth-of-type(-n + 14) {
  color: black;
  font-size: 14px;
}
.el-table th.gutter {
  display: table-cell !important;
}
/* 整体内容 */
.el-table .cell,
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell {
  padding: 0;
  font-size: 10px;
  text-align: center;
}
/* 头部标题 */
.el-table td,
.el-table th {
  padding: 0;
}
.inputDeep > .el-input > .el-input__inner {
  border: none !important;
  padding: 0;
}
.el-table__body td {
  padding: 0;
}
/* 可修改的几个数据 */
.inputDeep > .ky {
  width: 35px;
  /* border: red; */
  resize: none;
  line-height: 10px;
  text-align: center;
  padding-top: 15px;
  border: none;
}
/* 是否ip款 */
.inputDeeps > .ky {
  width: 110px;
  /* border: red; */
  resize: none;
  line-height: 5px;
  text-align: center;
  padding-top: 13px;
  height: 10px;
  overflow-x: hidden;
  overflow-y: hidden;
  border: none;
}

/* 解决因fixed后滚动条无法拖动*/
.el-table__fixed {
  /* 让固定列的高自适应，且设置!important覆盖ele-ui的默认样式  */
  height: auto !important;
  bottom: 17px;
  position: absolute;
  top: 0;
  left: 0;
  position: absolute;
  top: 0;
  left: 0;
}
.el-table--enable-row-transition .el-table__body td {
  text-align: center;
}
.area_item {
  border: none !important;
  width: 60px;
  resize: none;
  line-height: 20px;
  height: 20px;
  padding: 10px 0 0 0;
  text-align: center;
}
</style>