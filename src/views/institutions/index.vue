<template>
  <div class="institutions">
    <el-card>
      <div class="flex-sb" v-if="isAdmin">
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
            >添加机构</el-button
          >
          <el-popover
            placement="bottom-start"
            title=""
            :width="260"
            trigger="hover"
            content="展示机构列表，一个机构下包含多个账户，超管可以增删改查，普管只能进行信息的查看"
          >
            <template #reference>
              <el-button icon="el-icon-question" type="primary"
                >机构说明</el-button
              >
            </template>
          </el-popover>
        </div>
      </div>
      <el-table
        :data="tableData"
        stripe
        border
        ref="multipleTable"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :height="isAdmin ? 'calc(100vh - 200px)' : 'calc(100vh - 157px)'"
      >
        <el-table-column type="selection" width="50" align="center">
        </el-table-column>
        <el-table-column prop="id" label="ID" width="150" align="center">
        </el-table-column>

        <el-table-column
          prop="name"
          label="机构名称"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column label="操作" width="95" align="center">
          <template v-slot:default="scope">
            <div v-if="isAdmin">
              <span @click="edit(scope.row)" class="edit oper">修改</span>
              <span class="delete oper" @click="del(scope.row, scope.$index)"
                >删除</span
              >
            </div>
            <div v-else>
              <span
                @click="edit(scope.row)"
                class="edit oper"
                style="margin-right: 0px"
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
    </el-card>
    <AddUI v-model:dialog="addShow" />
  </div>
</template>
<script>
import { reactive, toRefs, onActivated, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import AddUI from "./components/Add.vue";
export default {
  name: "Institutions",
  components: {
    AddUI,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const multipleTable = ref(null);
    const store = useStore();
    const isAdmin = computed(() => {
      return store.state.isAdmin;
    });
    const data = reactive({
      addShow: false,
      tableData: [
        { name: "admin", password: "123456", permissions: true, id: "1" },
        { name: "admin1", password: "123456", permissions: true, id: "2" },
        { name: "admin2", password: "123456", permissions: true, id: "3" },
        { name: "admin3", password: "123456", permissions: false, id: "4" },
        { name: "admin4", password: "123456", permissions: true, id: "5" },
        { name: "admin5", password: "123456", permissions: true, id: "6" },
        { name: "admin6", password: "123456", permissions: false, id: "7" },
        { name: "admin7", password: "123456", permissions: true, id: "8" },
        { name: "admin8", password: "123456", permissions: false, id: "9" },
        { name: "admin9", password: "123456", permissions: true, id: "10" },
      ],
      options: [{ label: "删除", value: 1 }],
      value: "",
    });
    onActivated(() => {
      console.log(route, 123);
      if (route.query.type !== "back") {
        data.value = "";
        multipleTable.value.clearSelection();
      }
    });
    const add = () => {
      data.addShow = true;
    };
    const edit = (row) => {
      console.log(row);
      router.push({
        name: "InstitutionsEdit",
        params: { id: row.id, name: row.name },
      });
      //   window.open("#/institutionsEdit");
    };
    const del = (row, idx) => {
      console.log(row, idx);
    };
    const handleSelectionChange = (list) => {
      console.log(list);
    };
    return {
      ...toRefs(data),
      edit,
      del,
      add,
      handleSelectionChange,
      multipleTable,
      isAdmin,
    };
  },
};
</script>

<style lang="scss" scoped></style>
