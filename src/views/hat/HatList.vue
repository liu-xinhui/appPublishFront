<template>
  <div>
    <vm-table
        ref="vmTable"
        post
        :filter.sync="filter"
        url="eju/hat/find"
        @selection-change="multipleSelection=$event">
      <div slot="toolbar">
        <el-button size="mini" type="primary" @click="approveConfirm(multipleSelection)">审核</el-button>
        <el-button size="mini" type="primary" @click="statusConfirm(multipleSelection)">无效</el-button>
        <el-button size="mini" type="primary" style="float: right" @click="exportExcel()">导出</el-button>
      </div>
      <template slot="adSearch">
        <div class="vm-search">
          <vm-search label="帽子名称">
            <el-input v-model.trim="filter.name" clearable/>
          </vm-search>
          <vm-search label="城市">
            <el-popover
                placement="right"
                width="560"
                trigger="click">
              <vm-city :city-ids.sync="filter.cityIds"/>
              <el-button slot="reference">点击选择城市（已选{{filter.cityIds.length}}个）</el-button>
            </el-popover>
          </vm-search>
        </div>
      </template>
      <el-table-column
          align="center"
          type="selection"
          width="55"/>
      <el-table-column label="城市" prop="cityId" align="center">
        <template slot-scope="scope">
          {{scope.row.cityId|city}}
        </template>
      </el-table-column>
      <el-table-column label="帽子名称" prop="name" align="center"/>
      <el-table-column label="审核" align="center">
        <template slot-scope="scope">
          <a v-if="scope.row.approveStatusId===1" @click="approveConfirm([scope.row])">审</a>
          <i v-else-if="scope.row.approveStatusId===2" class="iconfont pass success"/>
          <i v-else-if="scope.row.approveStatusId===3" class="iconfont unpass error"/>
        </template>
      </el-table-column>
      <el-table-column label="编辑" align="center" width="50">
        <template slot-scope="scope">
          <a @click="handleEdit(scope.row)">编</a>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <a @click="statusConfirm([scope.row])">{{scope.row.statusId===2?"有效":"无效"}}</a>
        </template>
      </el-table-column>
      <el-table-column label="区域" prop="areaId" align="center">
        <template slot-scope="scope">
          {{scope.row.cityId|area(scope.row.areaId)}}
        </template>
      </el-table-column>
      <el-table-column label="是否关联项目" prop="projectId" align="center">
        <template slot-scope="scope">
          {{scope.row.projectId?"是":"否"}}
        </template>
      </el-table-column>
      <el-table-column label="是否关联土地" prop="landId" align="center">
        <template slot-scope="scope">
          {{scope.row.landId?"是":"否"}}
        </template>
      </el-table-column>
      <el-table-column label="操作人" prop="operator" align="center"/>
      <el-table-column label="操作时间" width="150" align="center">
        <template slot-scope="scope">
          {{scope.row.updateTime|formatDate}}
        </template>
      </el-table-column>
    </vm-table>
  </div>
</template>
<script>
  import VmTable from "@/components/VmTable.vue";
  import VmSearch from "@/components/VmSearch.vue";
  import VmCity from "@/components/VmCity.vue";
  import constant from "@/util/constant";
  import axios from "@/plugins/http/axios";

  export default {
    name: "HatList",
    components: {
      VmTable,
      VmSearch,
      VmCity,
    },
    data() {
      return {
        constant,
        filter: {
          name: "",
          cityIds: [],
          areaIds: [],
        },
        multipleSelection: [],
      };
    },
    mounted() {
      this.getList(1);
    },
    methods: {
      getList(pageNum) {
        this.$refs.vmTable.getList(pageNum);
      },
      deleteRow(row) {
        this.$confirm(`确定删除${row.no}吗?`, "提示", {type: "warning"}).then(() => {
          this.$http.delete("devices", row.id).then(() => {
            this.getList(-1);
            this.$message.success(row.no + "删除成功");
          });
        });
      },
      approveConfirm(rows) {
        if (!rows || !rows.length) {
          this.$message.error("请选择需要操作的记录");
          return;
        }
        this.$confirm("请选择审核结果", "提示", {
          distinguishCancelAndClose: true,
          confirmButtonText: "通过",
          cancelButtonText: "不通过",
        }).then(() => {
          this.approve(rows, 2);
        }).catch(action => {
          if (action === "cancel") {
            this.approve(rows, 3);
          }
        });
      },
      approve(rows, approveStatus) {
        let body = JSON.parse(JSON.stringify(rows));
        body.forEach(item => {
          item.approveStatusId = approveStatus;
        });
        this.$http
          .post("/eju/hat/approve", body)
          .then(() => {
            this.getList(-1);
          });
      },
      statusConfirm(rows) {
        if (!rows || !rows.length) {
          this.$message.error("请选择需要操作的记录");
          return;
        }
        this.$confirm("请选择这条记录的状态", "提示", {
          distinguishCancelAndClose: true,
          confirmButtonText: "有效",
          cancelButtonText: "无效",
        }).then(() => {
          this.changeStatus(rows, 2);
        }).catch(action => {
          if (action === "cancel") {
            this.changeStatus(rows, 1);
          }
        });
      },
      changeStatus(rows, status) {
        let body = JSON.parse(JSON.stringify(rows));
        body.forEach(item => {
          item.statusId = status;
        });
        this.$http
          .post("/eju/hat/changestatus", body)
          .then(() => {
            this.getList(-1);
          });
      },
      exportExcel() {
        axios({
          method: "post",
          url: "/eju/hat/export",
          data: this.filter,
          responseType: "blob",
        }).then(data => {
          const blob = new Blob([data]);
          const fileName = "帽子管理.xlsx";
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, fileName);
          } else {
            let a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = fileName;
            a.style.display = "none";
            document.body.appendChild(a);
            a.click();
            URL.revokeObjectURL(a.href);
            document.body.removeChild(a);
          }
        });
      },
      handleEdit(row) {
        this.$router.push({
          path: "/hat/HatEdit",
          query: {id: row.hatId},
        });
      },
      onCityChange(cityIds, areaIds) {
        this.filter.cityIds = cityIds;
        this.filter.areaIds = areaIds;
      },
    },
  };
</script>
<style lang="scss" scoped>
</style>
