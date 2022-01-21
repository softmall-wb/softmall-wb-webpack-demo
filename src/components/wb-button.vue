<template>
  <button :class="[{
    'wb-button-block': block
  }, 'wb-button wb-button-primary']" :shape="shape" :size="size" @click="handleClick">
    <span><slot>Button</slot></span>
  </button>
</template>
<script>
export default {
  props: {
    size: {
      type: String,
      default: "regular"
    },
    shape: {
      type: String,
      default: "rect"
    },
    // 是否和父容器一样宽度
    block: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick(e) {
      this.$emit("click", e)
    }
  }
}
</script>

<style lang="scss" scoped>
$wb-button-color: #FF8A44;
$wb-button-active: #b1511a;

$wb-button-small: 28px;
$wb-button-regular: 32px;
$wb-button-big: 40px;

.wb-button {
  line-height: 1.499;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  padding: 0 15px;
  outline: none;
  border: none;
  transition: all 0.1s;
  -webkit-appearance: button;

  &[shape=rect] {
    border-radius: 4px;
  }

  &[shape=round] {
    border-radius: 100px;
  }

  &[size=small] {
    font-size: 13px;
    height: $wb-button-small;
  }

  &[size=regular] {
    font-size: 14px;
    height: $wb-button-regular;
  }

  &[size=big] {
    font-size: 16px;
    height: $wb-button-big;
  }
}

.wb-button-block {
  width: 100%;
}

.wb-button-primary {
  color: #fff;
  background-color: $wb-button-color;

  &:active {
    background-color: $wb-button-active;
  }
  &[shape=round] {
    padding: 0 20px;
    margin-bottom: 10px;
    box-shadow: 0 5px 10px transparentize($color: $wb-button-color, $amount: 0.4);

    &:active {
      box-shadow: 0 5px 10px transparentize($color: $wb-button-active, $amount: 0.4);
    }
  }
}
</style>