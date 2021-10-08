<template>
  <div class="detail-header">
    <div class="back" @click="back">返 回</div>
    <!-- <h3>当前机构: {{ title }}</h3> -->
    <slot />
  </div>
</template>
<script>
export default {
  setup(props, { emit }) {
    const back = () => {
      emit("back");
    };
    return {
      back,
    };
  },
};
</script>
<style lang="scss">
.detail-header {
  width: 100vw;
  height: 32px;
  line-height: 32px;
  // display: flex;
  position: relative;
  margin-bottom: 15px;
  background-image: linear-gradient(-43deg, #4d4f58 0%, #606470 100%);
  .back {
    line-height: 24px;
    height: 24px;
    margin-top: 3px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    color: #fff;
    transition: 0.5s;
    border-radius: 1px;
    width: 68px;
    text-align: center;
    cursor: pointer;
    position: absolute;
    left: 20px;
    &:hover {
      color: #fff;
      background-color: rgba(45, 63, 80, 1);
      border: 1px solid rgba(45, 63, 80, 1);
    }
  }
  h3 {
    line-height: 32px;
    height: 32px;
    margin: 0;
    text-align: center;
    color: #fff;
    width: 100%;
  }
}
</style>
