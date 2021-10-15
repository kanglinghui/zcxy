<template>
  <div class="power">
    <DetailHeader @back="back">
      <h3>进程号: xx进程</h3>
    </DetailHeader>
    <div class="box">
      <div class="card-head head">
        <div class="m-r">
          <el-switch
            v-model="value"
            style="display: block; margin-top: 2px"
            active-color="#13ce66"
            inactive-text="开启监控"
          />
        </div>
        <div class="m-r">
          <span style="margin-right: 8px">保存天数:</span>
          <el-input-number
            v-model="num"
            :min="1"
            :max="10000"
            :controls="false"
          />
          <el-button style="margin-left: 8px" type="primary">更改</el-button>
        </div>
        <el-divider
          direction="vertical"
          style="margin-top: 4px; height: 1.5em"
        ></el-divider>
        <div style="margin-left: 15px">
          <el-button type="primary">清空记录</el-button>
        </div>
      </div>
      <div class="content">
        <div class="card-head">
          <div>平均负载</div>
          <div>
            <span
              v-for="(item, i) in btnHeadList"
              :key="i"
              @click="dateBtn('averageLoad', item)"
              class="head-btn"
              :class="{ acitve: item.value === dateForm.averageLoad }"
              >{{ item.label }}</span
            >
          </div>
        </div>
        <card-box>
          <DbLine id="dbline" height="300px" />
        </card-box>
      </div>
      <div class="flex-sb">
        <div class="content">
          <div class="card-head">
            <div>CPU</div>
            <div>
              <span
                v-for="(item, i) in btnHeadList"
                :key="i"
                @click="dateBtn('cpu', item)"
                class="head-btn"
                :class="{ acitve: item.value === dateForm.cpu }"
                >{{ item.label }}</span
              >
            </div>
          </div>
          <card-box>
            <Line id="line-cpu" name="CPU" height="300px" />
          </card-box>
        </div>
        <div class="content">
          <div class="card-head">
            <div>内存</div>
            <div>
              <span
                v-for="(item, i) in btnHeadList"
                :key="i"
                @click="dateBtn('memory', item)"
                class="head-btn"
                :class="{ acitve: item.value === dateForm.memory }"
                >{{ item.label }}</span
              >
            </div>
          </div>
          <card-box>
            <Line id="line-memory" name="内存" height="300px" />
          </card-box>
        </div>
      </div>
      <div class="flex-sb">
        <div class="content">
          <div class="card-head">
            <div>磁盘IO</div>
            <div>
              <span
                v-for="(item, i) in btnHeadList"
                :key="i"
                @click="dateBtn('disk', item)"
                class="head-btn"
                :class="{ acitve: item.value === dateForm.disk }"
                >{{ item.label }}</span
              >
            </div>
          </div>
          <card-box>
            <IoLine
              id="ioLine1"
              height="300px"
              :name="['读取字节数', '写入字节数']"
            />
          </card-box>
        </div>
        <div class="content">
          <div class="card-head">
            <div>网络IO</div>
            <div>
              <span
                v-for="(item, i) in btnHeadList"
                :key="i"
                @click="dateBtn('net', item)"
                class="head-btn"
                :class="{ acitve: item.value === dateForm.net }"
                >{{ item.label }}</span
              >
            </div>
          </div>
          <card-box>
            <IoLine
              id="ioLine2"
              height="300px"
              :name="['上行', '下行']"
              :color="['rgb(246,136,36)', 'rgb(41,147,252)']"
            />
          </card-box>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import DetailHeader from "@/components/detailHead";
import { ElSwitch, ElInputNumber, ElDivider } from "element-plus";
import DbLine from "@/components/chart/powerConsumption/DbLine.vue";
import Line from "@/components/chart/powerConsumption/Line.vue";
import IoLine from "@/components/chart/powerConsumption/IoLine.vue";

export default {
  name: "Power",
  components: {
    // ElDatePicker,
    [ElSwitch.name]: ElSwitch,
    [ElInputNumber.name]: ElInputNumber,
    [ElDivider.name]: ElDivider,
    DbLine,
    Line,
    IoLine,
    DetailHeader,
  },
  setup() {
    const router = useRouter();
    const data = reactive({
      value: "",
      num: 30,
      dateForm: {
        averageLoad: "today",
        cpu: "today",
        memory: "today",
        disk: "today",
        net: "today",
      },
      btnHeadList: [
        {
          label: "昨天",
          value: "yesterday",
        },
        {
          label: "今天",
          value: "today",
        },
        {
          label: "最近7天",
          value: "sevenday",
        },
        {
          label: "最近30天",
          value: "moth",
        },
        {
          label: "自定义时间",
          value: "DIYdate",
        },
      ],
    });
    const back = () => {
      router.push("/i/monitoring?type=process");
    };
    const dateBtn = (type, val) => {
      data.dateForm[type] = val.value;
    };
    return {
      ...toRefs(data),
      back,
      dateBtn, // 时间按钮选择
    };
  },
};
</script>
<style lang="scss" scoped>
.power {
  background-color: #f0f0f0;
  .box {
    padding: 0 20px;
    height: calc(100vh - 67px);
    padding-bottom: 20px;
    overflow-y: auto;
    .content {
      background-color: #fff;
      color: rgb(132, 128, 124);
    }
    .head {
      justify-content: start !important;
      margin-bottom: 15px;
      color: rgb(132, 128, 124);
      .m-r {
        margin-right: 15px;
      }
    }
    .card-head {
      display: flex;
      justify-content: space-between;
      padding: 10px 15px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      background-color: #fff;
      // padding:0 10px;
      .head-btn {
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-right: 0px;
        padding: 0 8px;
        cursor: pointer;
        transition: 0.5s;
        font-size: 12px;
        &:hover {
          background-color: rgb(42, 164, 64);
          opacity: 0.8;
          color: #fff;
        }
        &.acitve {
          background-color: rgb(42, 164, 64);
          color: #fff;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
        &:last-child {
          border-right: 1px solid rgba(0, 0, 0, 0.1);
        }
      }
    }
    .flex-sb {
      margin-top: 15px;
      .content {
        width: 50%;
        margin-right: 15px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
