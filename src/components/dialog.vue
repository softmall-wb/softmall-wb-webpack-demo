<template>
  <div id="dialog"  v-show="visible">
    <div class="dialog_body">
      <p>{{message}}</p>
      <div class="dialog_button_container">
        <button @click="handleCancel">取消</button>
        <button @click="handleConfirm">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisiable: false,
    };
  },
  props: {
    message: String,
    visible: Boolean,
  },
  methods: {
    handleCancel() {
      this.$emit("cancel");
    },
    handleConfirm() {
      this.$emit("confirm");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/views/helium/var.scss";
#dialog {
  z-index: 10000;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
}
.dialog_body {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  padding: 15px;
  border-radius: 7px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(255, 255, 255);
}
.dialog_body > p {
  margin-bottom: 15px;
}
.dialog_button_container {
  display: flex;
  justify-content: space-around;
}
.dialog_button_container > button {
  margin: 0 10px;
  width: 80px;
  color: #fff;
  padding: 10px;
  border: 0;
  border-radius: 7px;
  background-color: $color_theme;
}
.dialog_button_container > button:first-child {
  color: rgb(155, 153, 154);
  background-color: rgb(238, 236, 236);
}
</style>