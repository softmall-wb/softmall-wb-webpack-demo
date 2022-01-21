<template>
  <div class="wb-input-wrapper" v-bind="$attrs">
    <slot name="icon">
      <span class="title" :style="{minWidth: labelwidth + 'px'}">
        {{ title }}
      </span>
    </slot>
    <slot>
      <input v-model="modelValue" :type="type" class="input" v-bind="{ disabled: disable, maxlength, error }" :placeholder="placeholder" @keypress="handleChange">
    </slot>
    <slot name="postfix" />
  </div>
</template>

<script>

export default {
  name: "InputWithLabel",
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: "Label",
    },
    maxlength: {
      type: [String, Number],
      default: null
    },
    type: {
      type: String,
      default: "text"
    },
    value: {
      type: [String, Number],
      default: "",
    },
    placeholder: {
      type: [String, Number],
      default: "",
    },
    labelwidth: {
      type: [String, Number],
      default: 80,
    },
    disable: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      modelValue: this.value
    }
  },
  watch: {
    modelValue(val) {
      if (this.type === 'number') {
        val = Number(val)
      }
      this.$emit("input", val)
    }
  },
  methods: {
    handleChange(e) {
      if (this.maxlength && this.modelValue.toString().length >= this.maxlength){
        e.preventDefault();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$input-bottom-line: #ebebeb;
$input-font-color: #999999;
.wb-input-wrapper {
  display: flex;
  position: relative;
  align-items: center;
  margin-bottom: 7px;
  .title {
    font-size: 12px;
    color: black;
    letter-spacing: -0.18px;
    font-weight: 450;
    margin-right: 8px;
  }

  .input {
    flex: 1;
    align-self: flex-end;
    margin-left: 0.63rem;
    padding: 5px 5px;
    font-size: 0.92rem;
    line-height: 1.14rem;
    border: none;
    color: $input-font-color;
    border-bottom: solid $input-bottom-line 1px;
    outline: none;

    &[error] {
      color: red;
    }
  }

  .postfix {
    margin-left: 8px;
    min-width: 30px;
    font-size: 12px;
    letter-spacing: -0.24px;
  }
}
</style>