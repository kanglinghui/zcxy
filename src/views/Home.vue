<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <div>{{ msg }}</div>
    <el-button type="primary" @click="callMe">点我</el-button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { reactive, toRefs, onMounted } from "vue";
export default {
  name: "Home",
  components: {
    // HelloWorld,
  },
  setup() {
    const data = reactive({
      websocket: null,
      state: false,
      msg: "",
      socket: "127.0.0.1:9000",
      request_id: 0,
    });
    let tt;
    let lockReconnect = false;
    let websock = null;
    const callback = {};
    const heartCheck = {
      //心跳重连
      timeout: 3000,
      timeoutObj: null,
      serverTimeoutObj: null,
      start: function () {
        console.log("start");
        this.timeoutObj && clearTimeout(this.timeoutObj);
        this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
        this.timeoutObj = setTimeout(() => {
          console.log(this, "this");
          console.log("55555");
          websock.send("123456789");
          this.serverTimeoutObj = setTimeout(() => {
            console.log(111);
            console.log(this, "this2");
            console.log(websock, "ws");
            websock.close();
          }, this.timeout);
        }, this.timeout);
      },
    };
    const initWebSocket = () => {
      //初始化websocket
      const wsuri = `ws://${data.socket}`;
      websock = new WebSocket(wsuri);
      websock.onmessage = websocketonmessage;
      websock.onopen = websocketonopen;
      websock.onerror = websocketonerror;
      websock.onclose = websocketclose;
      websock.onsend = websocketsend;
    };
    const websocketonopen = () => {
      //连接之后执行send方法发送数据
      heartCheck.start();
      data.state = true;
    };
    const websocketonerror = () => {
      //连接建立失败重连
      console.log("发生异常");
      reconnect();
    };
    const websocketonmessage = (e) => {
      //数据接收
      heartCheck.start();
      const redata = JSON.parse(e.data);
      if (!redata.request_id) {
        return;
      }
      let req_id = redata.request_id;
      callback[req_id](redata);
    };
    const websocketsend = (Data) => {
      //数据发送
      if (websock.readyState === 1) {
        websock.send(Data);
      }
    };
    const websocketclose = (e) => {
      //关闭
      console.log("断开链接", e);
      data.state = false;
      reconnect();
    };
    const reconnect = () => {
      if (lockReconnect) return;
      lockReconnect = true;
      tt && clearTimeout(tt);
      tt = setTimeout(() => {
        initWebSocket();
        lockReconnect = false;
      }, 4000);
    };
    const callMe = () => {
      console.log(data.state, "state");
      //   if (data.state) return;
      data.request_id++;
      let id = data.request_id;
      console.log(data.request_id);
      callback[id] = (msg) => {
        data.msg = msg.msg;
      };
      websocketsend(
        JSON.stringify({ request_id: data.request_id, msg: "客户端消息" })
      );
    };
    onMounted(() => {
      initWebSocket();
    });
    return {
      ...toRefs(data),
      initWebSocket,
      websocketonopen,
      websocketonmessage,
      websocketsend,
      websocketclose,
      callMe,
    };
  },
};
</script>
