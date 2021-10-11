<template>
  <div class="institutions-detail">
    <!-- <div class="header">
      <div class="back" @click="back">返 回</div>
      <h3>当前机构: {{ title }}</h3>
    </div> -->
    <DetailHeader @back="back">
      <h3>当前机构: {{ title }}</h3>
    </DetailHeader>
    <div class="flex-sb pd" v-if="isAdmin">
      <div>
        <el-select
          v-model="value"
          clearable
          placeholder="请选择"
          style="margin-right: 10px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button icon="el-icon-check" type="primary" @click="add"
          >提交</el-button
        >
      </div>
      <div style="margin-bottom: 15px">
        <el-button icon="el-icon-plus" type="primary" @click="add"
          >添加账户</el-button
        >
        <el-button icon="el-icon-question" type="primary">账户说明</el-button>
      </div>
    </div>
    <div class="pd">
      <el-table
        :data="tableData"
        stripe
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :height="isAdmin ? 'calc(100vh - 170px)' : 'calc(100vh - 127px)'"
      >
        <el-table-column type="selection" width="50" align="center">
        </el-table-column>
        <el-table-column type="index" label="ID" width="150" align="center">
        </el-table-column>

        <el-table-column
          prop="name"
          label="机构账户"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="资金账户"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column label="登录权限" width="95" align="center">
          <template v-slot:default="scope">
            <div>
              <span
                @click="edit(scope.row, 'login')"
                class="edit oper"
                v-if="isAdmin"
                >编辑</span
              >
              <span class="freeze oper" @click="view(scope.row, 'login')"
                >查看</span
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="交易权限" width="95" align="center">
          <template v-slot:default="scope">
            <div>
              <span
                @click="edit(scope.row, 'trading')"
                class="edit oper"
                v-if="isAdmin"
                >编辑</span
              >
              <span class="freeze oper" @click="view(scope.row, 'trading')"
                >查看</span
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="风控" width="95" align="center">
          <template v-slot:default="scope">
            <div>
              <span
                @click="edit(scope.row, 'risk')"
                class="edit oper"
                v-if="isAdmin"
                >编辑</span
              >
              <span class="freeze oper" @click="view(scope.row, 'risk')"
                >查看</span
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 15px">
        <el-pagination
          background
          layout="prev, pager, next"
          :hide-on-single-page="false"
          :total="tableData.length"
        >
        </el-pagination>
      </div>
    </div>
    <AddAccountUI v-model:dialog="addShow" />
    <LoginPermUI
      v-model:dialog="loginPerm"
      :title="permTitle"
      :showType="type"
      :isAdmin="isAdmin"
    />
    <RiskPermUI v-model:dialog="riskPerm" :title="permTitle" :showType="type" />
    <TradingPermUI
      v-model:dialog="tradingPerm"
      :title="permTitle"
      :showType="type"
      :isAdmin="isAdmin"
    />
  </div>
</template>
<script>
import { reactive, toRefs, onActivated, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import AddAccountUI from "./components/AddAccount.vue";
import LoginPermUI from "./components/LoginPerm.vue";
import RiskPermUI from "./components/RiskPerm.vue";
import TradingPermUI from "./components/TradingPerms.vue";
import DetailHeader from "@/components/detailHead";
export default {
  name: "InstitutionsEdit",
  components: {
    AddAccountUI,
    LoginPermUI,
    RiskPermUI,
    TradingPermUI,
    DetailHeader,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const isAdmin = computed(() => {
      return store.state.isAdmin;
    });
    const data = reactive({
      addShow: false,
      detailId: null,
      title: "admin" + (route.params.id - 1),
      tableData: [
        { name: "admin", password: "123456", permissions: true },
        { name: "admin1", password: "123456", permissions: true },
        { name: "admin2", password: "123456", permissions: true },
        { name: "admin3", password: "123456", permissions: false },
        { name: "admin4", password: "123456", permissions: true },
        { name: "admin5", password: "123456", permissions: true },
        { name: "admin6", password: "123456", permissions: false },
        { name: "admin7", password: "123456", permissions: true },
        { name: "admin8", password: "123456", permissions: false },
        { name: "admin9", password: "123456", permissions: true },
      ],
      options: [{ label: "删除", value: 1 }],
      value: "",
      permTitle: "",
      loginPerm: false,
      riskPerm: false,
      tradingPerm: false,
      type: "toView",
    });
    onActivated(() => {
      // alert()
      if (data.detailId === route.params.id) {
        return;
      }
      data.title = "admin" + (route.params.id - 1);
      data.detailId = route.params.id;
      data.value = "";
      data.tableData = [
        {
          name: "admin" + parseInt(Math.random() * 10),
          password: "123456",
          permissions: true,
        },
        {
          name: "admin" + parseInt(Math.random() * 10),
          password: "123456",
          permissions: true,
        },
        {
          name: "admin" + parseInt(Math.random() * 10),
          password: "123456",
          permissions: true,
        },
        {
          name: "admin" + parseInt(Math.random() * 10),
          password: "123456",
          permissions: false,
        },
        {
          name: "admin" + parseInt(Math.random() * 10),
          password: "123456",
          permissions: true,
        },
        {
          name: "admin" + parseInt(Math.random() * 10),
          password: "123456",
          permissions: true,
        },
        {
          name: "admin" + parseInt(Math.random() * 10),
          password: "123456",
          permissions: false,
        },
        {
          name: "admin" + parseInt(Math.random() * 10),
          password: "123456",
          permissions: true,
        },
        {
          name: "admin" + parseInt(Math.random() * 10),
          password: "123456",
          permissions: false,
        },
        {
          name: "admin" + 1,
          password: "123456",
          permissions: true,
        },
      ];
    });
    data.detailId = route.params.id;
    const add = () => {
      data.addShow = true;
    };
    const edit = (row, type) => {
      console.log(row);
      data.type = "toEdit";
      data.permTitle = "当前账户: " + row.name;
      switch (type) {
        case "login":
          data.loginPerm = true;
          break;
        case "risk":
          data.riskPerm = true;
          break;
        case "trading":
          data.tradingPerm = true;
          break;
      }
    };
    const view = (row, type) => {
      data.type = "toView";
      data.permTitle = "当前账户: " + row.name;
      switch (type) {
        case "login":
          data.loginPerm = true;
          break;
        case "risk":
          data.riskPerm = true;
          break;
        case "trading":
          data.tradingPerm = true;
          break;
      }
    };
    const del = (row, idx) => {
      console.log(row, idx);
    };
    const back = () => {
      router.push("/i/institutions?type=back");
    };
    const handleSelectionChange = (table) => {
      console.log(table);
    };
    return {
      ...toRefs(data),
      add, //新增
      edit, // 编辑
      view, // 查看
      del, //提交
      back, // 返回
      handleSelectionChange, // 表格选中
      //   title, //顶部机构名称
      isAdmin, //是否是超级管理员
    };
  },
};
</script>
<style lang="scss" scoped>
.institutions-detail {
  padding-bottom: 20px;
  width: 100vw;
  .pd {
    padding: 0 20px;
  }
}
</style>
