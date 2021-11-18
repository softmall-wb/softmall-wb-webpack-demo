<template>
  <div wb:style-var-bind>
    <div :style="{'background-image': 'url('+ theme_background_img+ '@w_750,h_750)'}" class="forget-password">
      <ul class="forget-password-form">
        <li class="form-item">
          <icon-base class="icon" :width="iconSize" :height="iconSize" iconColor>
            <phone-icon />
          </icon-base>
          <input
            ref="input-phone"
            name="phone"
            @input="handleInput"
            :placeholder="formItems.phone.placeholder"
            type="text"
            v-model="forgetService.phone"
            :disabled="!forgetService.isPhoneEditable"
          />
        </li>
        <li class="form-item" v-if="true">
          <icon-base class="icon" :width="iconSize" :height="iconSize" iconColor>
            <captcha-icon />
          </icon-base>
          <input
            ref="input-captcha"
            name="captcha"
            @input="handleInput"
            :placeholder="formItems.captcha.placeholder"
            type="text"
            v-model="forgetService.vcode"
          />
          <button id="get-captcha" @click="sendCode">{{!forgetService.able_to_send_vcode? forgetService.vcode_second: '获取验证码'}}</button>
        </li>
        <li class="form-item">
          <icon-base class="icon" :width="iconSize" :height="iconSize" iconColor>
            <password-icon />
          </icon-base>
          <input
            ref="input-password"
            name="password"
            @input="handleInput"
            :placeholder="formItems.password.placeholder"
            type="password"
            v-model="forgetService.password"
          />
        </li>
        <li class="form-item">
          <icon-base class="icon" :width="iconSize" :height="iconSize" iconColor>
            <password-icon />
          </icon-base>
          <input
            ref="input-confirmPassword"
            name="confirmPassword"
            @input="handleInput"
            :placeholder="formItems.confirmPassword.placeholder"
            type="password"
            v-model="forgetService.passwordConfirm"
          />
        </li>
        <li class="form-item submit">
          <button @click="submit" class="form-submit"><p>确认修</p><p>改</p></button>
        </li>
      </ul>
      <footer class="forget-password-footer">{{bottom_cv_text}}</footer>
    </div>
  </div>
</template>

<script>
import iconBase from "../../components/IconBase.vue";
import phoneIcon from "../../components/icons/phone.vue";
import passwordIcon from "../../components/icons/password.vue";
import captchaIcon from "../../components/icons/captcha.vue";
import WBPropertyUtil from "softmall-wb/Property/WBPropertyUtil";
import {
  ForgetService,
  PhoneCheckLifeCycle,
  PasswordCheckLifeCycle,
  ConfirmCheckLifeCycle,
  VCodeCheckLifeCycle
} from 'softmall-wb/index'

export default {
  name: "ForgetPassword",
  components: {
    iconBase,
    phoneIcon,
    passwordIcon,
    captchaIcon,
  },
  props: {
    group_title: {
      主题配置: {
        tip: "设置页面的主题，如主体颜色等",
      },
      输入框: {},
      修改按钮: {
        // tip: "获取验证码的字体颜色受此处控制"
      },
      自定义元素: {
        tip: "控制元素的显示和隐藏",
      },
      底部介绍: {},
    },

    /* 主题色 */
    theme_main_color: new WBPropertyUtil.ColorPicker(
      "主题配置",
      "主题颜色",
      "#ff8c44"
    ),
    theme_background_img: new WBPropertyUtil.Image(
      "主题配置",
      "主题背景",
      "https://cdn.rmao.cn/dms/shared/compoents/wb-login-hydrogenium/background.jpg",
      url => url + "@w_750,h_750"
    ),
    card_wrapper_top_forget: new WBPropertyUtil.PixelSlider(
      "主题配置",
      "卡片与上方的间距",
      150,
      50,
      400
    ),

    /* 输入框 */
    button_captcha_color: new WBPropertyUtil.ColorPicker(
      "输入框",
      "获取验证码按钮文字颜色",
      "rgb(255, 255, 255)"
    ),
    input_color: new WBPropertyUtil.ColorPicker(
      "输入框",
      "文字颜色",
      "rgb(51, 51, 51)"
    ),
    input_placeholder_color: new WBPropertyUtil.ColorPicker(
      "输入框",
      "提示文字颜色",
      "rgb(157, 157, 157)"
    ),
    input_font_size: new WBPropertyUtil.PixelSlider(
      "输入框",
      "文字大小",
      15,
      10,
      20
    ),
    input_font_weight: new WBPropertyUtil.Slider(
      "输入框",
      "文字粗细",
      450,
      300,
      900,
      50,
      false
    ),
    input_gap: new WBPropertyUtil.PixelSlider("输入框", "垂直间距", 32, 10, 50),

    /* 修改按钮 */
    login_button_font_letter_spacing: new WBPropertyUtil.PixelSlider(
      "修改按钮",
      "字间距",
      1,
      0,
      100
    ),
    login_button_border_radius: new WBPropertyUtil.PixelSlider(
      "修改按钮",
      "按钮圆角",
      25,
      0,
      70
    ),
    login_button_width: new WBPropertyUtil.PercentSlider(
      "修改按钮",
      "按钮宽度",
      100,
      30,
      100
    ),
    login_button_margin_top: new WBPropertyUtil.PixelSlider(
      "修改按钮",
      "上边距",
      20,
      10,
      50
    ),
    login_button_height: new WBPropertyUtil.PixelSlider(
      "修改按钮",
      "按钮高度",
      50,
      40,
      70
    ),
    login_button_color: new WBPropertyUtil.ColorPicker(
      "修改按钮",
      "文字颜色",
      "#fff"
    ),
    login_button_font_size: new WBPropertyUtil.PixelSlider(
      "修改按钮",
      "文字大小",
      18,
      10,
      30
    ),
    login_button_font_weight: new WBPropertyUtil.Slider(
      "修改按钮",
      "文字粗细",
      400,
      300,
      900,
      50,
      false
    ),

    // /* 控制元素是否显示 */
    // visible_code: new WBPropertyUtil.Switch(
    //   "自定义元素",
    //   "是否显示验证码输入框",
    //   true
    // ),

    /* 底部介绍 */
    bottom_cv_text: new WBPropertyUtil.Input(
      "底部介绍",
      "文本内容",
      "技术支持 | 软猫"
    ),
    bottom_cv_color: new WBPropertyUtil.ColorPicker(
      "底部介绍",
      "文字颜色",
      "#aaa"
    ),
    bottom_cv_font_size: new WBPropertyUtil.PixelSlider(
      "底部介绍",
      "文字大小",
      12,
      10,
      30
    ),
    bottom_cv_font_weight: new WBPropertyUtil.Slider(
      "底部介绍",
      "文字粗细",
      400,
      300,
      900,
      50,
      false
    ),
    bottom_cv_letter_space: new WBPropertyUtil.PixelSlider(
      "底部介绍",
      "文字间距",
      1,
      1,
      5
    ),
  },
  data() {
    const phoneCheck = new PhoneCheckLifeCycle(Core)
    const passwordCheck = new PasswordCheckLifeCycle(Core)
    const confirmCheck = new ConfirmCheckLifeCycle(Core)
    const codeCheck = new VCodeCheckLifeCycle(Core)

    phoneCheck
      // .error(e => this.errorPop('phone', e))
      .error(e => this.verifyFail({ name: "phone", errorMsg: e }))
      .empty(() => this.verifyFail({ name: "phone" }))

    codeCheck
      // .error(e => this.errorPop('captcha', e))
      .error(e => this.verifyFail({ name: "captcha", errorMsg: e }))
      .empty(() => this.verifyFail({ name: "captcha" }))

    passwordCheck
      // .error(e => this.errorPop('password', e))
      .error(e => this.verifyFail({ name: "password", errorMsg: e }))
      .empty(() => this.verifyFail({ name: "password" }))

    confirmCheck
      // .error(e => this.errorPop('confirmPassword', e))
      .error(e => this.verifyFail({ name: "confirmPassword", errorMsg: e }))
      .empty(() => this.verifyFail({ name: "confirmPassword" }))

    const forgetService = new ForgetService(true, phoneCheck, passwordCheck, confirmCheck, codeCheck, Core)

    return {
      // 主题(icon)颜色
      iconSize: 25,
      formItems: {
        phone: {
          placeholder: "请输入手机号",
          defaultErrorMsg: "请输入手机号",
        },
        captcha: {
          placeholder: "请输入验证码",
          defaultErrorMsg: "请输入验证码",
        },
        password: {
          placeholder: "请输入新的密码",
          defaultErrorMsg: "请输入新的密码",
        },
        confirmPassword: {
          placeholder: "请再次输入密码",
          defaultErrorMsg: "请再次输入密码",
        },
      },
      formData: {
        phone: "",
        captcha: "",
        password: "",
        confirmPassword: "",
      },
      forgetService
    };
  },
  methods: {
    errorPop(item, error) {
      Core.Pop.Alert({ msg: error })
      this.verifyFail({ name: item, errorMsg: error })
    },

    sendCode() {
      if (!this.forgetService.able_to_send_vcode)
        return ;
      this.forgetService.send({
        when_vcode_sending_error(error) {
          Core.Pop.Alert({ msg: error })
        },

        when_vcode_sending_success() {
          console.log("completed")
        }
      })
    },

    toRegister() {
      this.forgetService.toRegister()
    },

    submit() {
      this.forgetService.submit()
    },

    /**
     * @desc 用于提示用户表单填写错误的函数, 该函数会根据参数的name对应表单相关的input输入框 进行标红并且显示错误信息, 在输入的参数为纯字符串时, 错误信息会显示formItem中设置的值; 在用户再次填入数据到input框会自动回复成原来的状态
     * @param 输入参数为任意个fromData中对应数据的名字如"phone","password"; 或 输入对象{name: (String), errorMsg: (String)}, 可混合使用
     */
    verifyFail(...inputName) {
      inputName.forEach((item) => {
        let inputElement = this.$refs["input-" + (item.name || item)];
        inputElement.classList.add("error");
        inputElement.value = ""
        // this.formData[item.name || item] = "";
        inputElement.placeholder = item.errorMsg
          ? item.errorMsg
          : this.formItems[item.name || item].defaultErrorMsg;
      });
    },

    handleInput(e) {
      let inputElement = e.target;
      if (inputElement.classList.contains("error")) {
        inputElement.classList.remove("error");
        inputElement.placeholder =
          this.formItems[inputElement.name].placeholder;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/views/hydrogenium/var.scss";
.forget-password {
  min-height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  background-image: $background;
  background-repeat: no-repeat;
  background-size: contain;
}
.forget-password-form {
  flex: 1;
  height: 200px;
  width: 95vw;
  margin-top: $card_wrapper_top_forget;
  padding: 20px 20px 60px 20px;
  box-sizing: border-box;
  position: relative;
  border-radius: 7px;
  background-color: rgba($color: #fff, $alpha: 0.95);
  box-shadow: 0px 5px 15px 1px rgb(245, 244, 255);
  -webkit-box-shadow: 0px 5px 15px 1px rgb(245, 244, 255);
  -moz-box-shadow: 0px 5px 15px 1px rgb(245, 244, 255);
}
.form-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: $input-gap;
}
.icon {
  margin-right: $input-icon-margin-right;
  fill: $color-theme;
}
.form-item > input {
  width: 0;
  outline-style: none;
  flex: 1;
  border: 0;
  padding: 5px 5px;
  color: $input-color;
  font-size: $input-font-size;
  font-weight: $input-font-weight;
  border-bottom: $input-border;
}
.form-item > input::-webkit-input-placeholder{
  color: $input_placeholder_color;
}
.form-item > input::-moz-placeholder{
  color: $input_placeholder_color;
}
 .form-item > input::-ms-input-placeholder{
  color: $input_placeholder_color;
}
 .form-item > input:-moz-placeholder{
  color: $input_placeholder_color;
}

/* 校验错误样式 */
.error {
  color: $color-error !important;
  border-bottom: 2px solid $color-error !important;
  transition: 0.3s;
}
.error::placeholder {
  color: $color-error !important;
}
/* 校验错误样式 */

#get-captcha {
  font-size: calc(#{$input-font-size} - 2px);
  // color: $button-color;
  color: $button-captcha-color;
}
.form-item button {
  min-width: 5rem;
  height: 24px;
  background-color: $color-theme;
  margin: 0 5px;
  padding: 2px 8px;
  border: 0;
  border-radius: 5px;
  color: #fff;
}
.form-item > .form-submit {
  margin: auto;
  width: $button_width;
  // width: 100%;
  height: $button-height;
  font-size: $button-font-size;
  font-weight: $button-font-weight;
  color: $button-color;
  border-radius: $button_border_radius;
  box-shadow: 0px 3px 8px 0px $color-theme;
  -webkit-box-shadow: 0px 3px 8px 0px $color-theme;
  -moz-box-shadow: 0px 3px 8px 0px $color-theme;
}
.form-submit > p{
  margin: 0;
  letter-spacing: $button_font_letter_spacing;
  display: inline-block;
}
.form-submit > p:last-child{
  letter-spacing: 0;
}
.submit {
  margin-top: $button-margin-top;
}
.forget-password-footer {
  margin-top: 20px;
  width: 100%;
  text-align: center;
  color: $footer-color;
  font-size: $footer-font-size;
  font-weight: $footer-font-weight;
  height: $footer-height;
  letter-spacing: $footer-space;
}
</style>