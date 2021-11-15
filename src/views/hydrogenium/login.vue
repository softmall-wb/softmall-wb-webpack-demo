<template>
  <div wb:style-var-bind>
    <div :style="{'background-image': 'url('+ theme_background_img+ ')'}" class="login">
      <ul class="login-form">
        <div class="login-logo">
          <img style="width: 100%; height: 100%" :src="mall_head_img" alt />
        </div>
        <div class="login-logo_title">欢迎登录{{ mall_name }}</div>
        <li class="form-item ">
          <icon-base class="icon" :width="iconSize" :height="iconSize" iconColor>
            <user-icon />
          </icon-base>
          <input
            ref="input-phone"
            name="phone"
            @input="handleInput"
            :placeholder="formItems.phone.placeholder"
            type="number"
            v-model="loginService.phone"
          />
        </li>
        <li class="form-item" v-if="visible_password">
          <icon-base class="icon" :width="iconSize" :height="iconSize" iconColor>
            <password-icon />
          </icon-base>
          <input
            ref="input-password"
            name="password"
            @input="handleInput"
            :placeholder="formItems.password.placeholder"
            type="password"
            v-model="loginService.password"
          />
        </li>
        <li class="form-item" v-if="loginService.vcode_force">
          <icon-base class="icon" :width="iconSize" :height="iconSize" iconColor>
            <captcha-icon />
          </icon-base>
          <input
            ref="input-captcha"
            name="captcha"
            @input="handleInput"
            :placeholder="formItems.captcha.placeholder"
            type="text"
            v-model="loginService.vcode"
          />
          <button id="get-captcha" @click="sendCode">{{!loginService.able_to_send_vcode? loginService.vcode_second: '获取验证码'}}</button>
        </li>
        <li class="form-item">
          <div class="keep-password" v-if="visible_remember">
            <input type="checkbox" id="keep-password" v-model="loginService.isRemember" />
            <label for="keep-password">
              <span>记住密码</span>
            </label>
          </div>
          <span @click="toChangePassword" class="to-forget-password">忘记密码？</span>
        </li>
        <li class="form-item submit">
          <button @click="submit" class="form-submit"><p>登录</p></button>
        </li>
        <li class="form-item to-register">
          <div>
            还没注册？
            <a @click="toRegister">点击注册</a>
          </div>
        </li>
      </ul>
      <footer class="login-footer">{{bottom_cv_text}}</footer>
    </div>
  </div>
</template>

<script>
import iconBase from "../../components/IconBase.vue";
import userIcon from "../../components/icons/user.vue";
import passwordIcon from "../../components/icons/password.vue";
import captchaIcon from "../../components/icons/captcha.vue";
import WBPropertyUtil from "softmall-wb/Property/WBPropertyUtil";
import {
  LoginService,
  VCodeCheckLifeCycle,
  PasswordCheckLifeCycle,
  PhoneCheckLifeCycle,
} from 'softmall-wb/index'
export default {
  name: "Login",
  components: {
    iconBase,
    userIcon,
    passwordIcon,
    captchaIcon,
  },
  props: {
    group_title: {
      主题配置: {
        tip: "设置页面的主题，如主体颜色等",
      },
      商城图标: {
        tip: "温馨提示：弧度大小为零时显示正方形图片，反之圆形。图片背景为白色时，可选择边框",
      },
      商城名称: {},
      输入框: {},
      登录按钮: {
        // tip: "获取验证码的字体颜色受此处控制",
      },
      注册与忘记密码: {},
      "链接、文字与辅助性颜色": {
        tip: "调整视觉效果，如“点击注册”、“记住与忘记密码”",
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
      "https://cdn.rmao.cn/dms/shared/compoents/wb-login-hydrogenium/background.jpg"
    ),

    /* 商城图标 */
    mall_head_img: new WBPropertyUtil.Image(
      "商城图标",
      "商城图标",
      "https://cdn.rmao.cn/dms/shared/compoents/wb-login-hydrogenium/avator.jpg"
    ),
    mall_head_img_size: new WBPropertyUtil.PixelSlider(
      "商城图标",
      "商城图标尺寸",
      100,
      50,
      200
    ),
    mall_head_img_radius: new WBPropertyUtil.PercentSlider(
      "商城图标",
      "弧度大小",
      100,
      0,
      100
    ),

    /* 商城名称 */
    mall_name: new WBPropertyUtil.Input(
      "商城名称",
      "商城名称",
      "软猫",
      "商城名称",
      true,
      true,
      30
    ),
    mall_name_color: new WBPropertyUtil.ColorPicker(
      "商城名称",
      "文字颜色",
      "#000"
    ),
    mall_name_font_size: new WBPropertyUtil.PixelSlider(
      "商城名称",
      "文字大小",
      18,
      10,
      30
    ),
    mall_name_font_weight: new WBPropertyUtil.Slider(
      "商城名称",
      "文字粗细",
      600,
      300,
      900,
      50,
      false
    ),
    mall_name_top: new WBPropertyUtil.PixelSlider(
      "商城名称",
      "上边距",
      10,
      2,
      30
    ),
    mall_name_bottom: new WBPropertyUtil.PixelSlider(
      "商城名称",
      "下边距",
      1,
      1,
      20
    ),
    mall_name_letter_space: new WBPropertyUtil.PixelSlider(
      "商城名称",
      "文字间距",
      1,
      1,
      5
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

    /* 登录按钮 */
    login_button_font_letter_spacing: new WBPropertyUtil.PixelSlider(
      "登录按钮",
      "字间距",
      1,
      0,
      100
    ),
    login_button_border_radius: new WBPropertyUtil.PixelSlider(
      "登录按钮",
      "按钮圆角",
      25,
      0,
      70
    ),
    login_button_width: new WBPropertyUtil.PercentSlider(
      "登录按钮",
      "按钮宽度",
      100,
      30,
      100
    ),
    login_button_margin_top: new WBPropertyUtil.PixelSlider(
      "登录按钮",
      "上边距",
      20,
      10,
      50
    ),
    login_button_height: new WBPropertyUtil.PixelSlider(
      "登录按钮",
      "按钮高度",
      50,
      40,
      70
    ),
    login_button_color: new WBPropertyUtil.ColorPicker(
      "登录按钮",
      "文字颜色",
      "#fff"
    ),
    login_button_font_size: new WBPropertyUtil.PixelSlider(
      "登录按钮",
      "文字大小",
      18,
      10,
      30
    ),
    login_button_font_weight: new WBPropertyUtil.Slider(
      "登录按钮",
      "文字粗细",
      400,
      300,
      900,
      50,
      false
    ),

    /* 注册与忘记密码 */
    go_register_top: new WBPropertyUtil.PixelSlider(
      "注册与忘记密码",
      "上边距",
      17,
      15,
      35
    ),

    /* 链接、文字与辅助性颜色 */
    text_font_zoom: new WBPropertyUtil.Slider(
      "链接、文字与辅助性颜色",
      "文字大小",
      1,
      0.7,
      2,
      0.1
    ),
    // text_font_size: new WBPropertyUtil.PixelSlider(
    //   "链接、文字与辅助性颜色",
    //   "文字大小",
    //   15,
    //   10,
    //   35
    // ),
    text_font_weight: new WBPropertyUtil.Slider(
      "链接、文字与辅助性颜色",
      "文字粗细",
      450,
      300,
      900,
      50,
      false
    ),
    text_color: new WBPropertyUtil.ColorPicker(
      "链接、文字与辅助性颜色",
      "文字颜色",
      "#363636"
    ),
    link_color: new WBPropertyUtil.ColorPicker(
      "链接、文字与辅助性颜色",
      "链接颜色",
      "#363636"
    ),
    assistant_color: new WBPropertyUtil.ColorPicker(
      "链接、文字与辅助性颜色",
      "辅助颜色",
      "#aaa"
    ),

    /* 控制元素是否显示 */
    visible_password: new WBPropertyUtil.Switch(
      "自定义元素",
      "显示密码输入框/验证码输入框",
      false
    ),
    visible_remember: new WBPropertyUtil.Switch(
      "自定义元素",
      "是否显示记住密码框",
      true
    ),

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

    const loginService = new LoginService(
      !this.visible_password,
      this.visible_password,
      phoneCheck,
      passwordCheck,
      codeCheck,
      Core
    )

    return {
      // 主题(icon)颜色
      iconSize: 25,
      kkk: false,

      // logoSrc: require("/src/components/hydrogenium/logo.png"),
      formItems: {
        phone: {
          placeholder: "请输入手机号",
          defaultErrorMsg: "请输入手机号",
        },
        password: {
          placeholder: "请输入密码",
          defaultErrorMsg: "请输入密码",
        },
        captcha: {
          placeholder: "请输入验证码",
          defaultErrorMsg: "请输入验证码",
        },
      },
      codeCheck,
      loginService,

      formData: {
        phone: "",
        password: "",
        captcha: "",
      },
    };
  },
  watch: {
    visible_password(val) {
      this.loginService.vcode_force = !val
    }
  },
  methods: {
    errorPop(item, error) {
      Core.Pop.Alert({ msg: error })
      this.verifyFail({ name: item, errorMsg: error })
    },

    sendCode() {
      if (!this.loginService.able_to_send_vcode)
        return ;
      this.loginService.send({
        when_vcode_sending_error(error) {
          Core.Pop.Alert({ msg: error })
        },

        when_vcode_sending_success() {
          console.log("completed")
        }
      })
    },

    toChangePassword() {
      this.loginService.toForget()
    },

    toRegister() {
      this.loginService.toRegister()
    },

    submit() {
      this.loginService.login()
      // 验证错误提示函数 用例:
      // this.verifyFail(
      //   { name: "phone", errorMsg: "请输入正确的手机号码" },
      //   "password",
      //   { name: "captcha", errorMsg: "请输入正确的验证码" }
      // );
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
.login {
  min-height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  background-image: $background;
  background-repeat: no-repeat;
  background-size: contain;
}

.login-form {
  flex: 1;
  height: 200px;
  width: 95vw;
  margin-top: $card-wrapper-top;
  padding: 50px 20px 60px 20px;
  box-sizing: border-box;
  position: relative;
  border-radius: 7px;
  background-color: rgba($color: #fff, $alpha: 0.95);
  box-shadow: 0px 5px 15px 1px rgb(245, 244, 255);
  -webkit-box-shadow: 0px 5px 15px 1px rgb(245, 244, 255);
  -moz-box-shadow: 0px 5px 15px 1px rgb(245, 244, 255);
}

.login-logo {
  height: $logo-size;
  width: $logo-size;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
}

.login-logo > img {
  border-radius: $logo-radius;
}
.login-logo_title {
  // overflow: hidden;
  margin: auto;
  display: block;
  text-align: center;
  color: $title-color;
  font-size: $title-font-size;
  font-weight: $title-font-weight;
  margin-top: $title-top;
  padding-bottom: $title-bottom;
  letter-spacing: $title-space;
  white-space: normal;
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
.keep-password {
  zoom: $text-font-zoom;
  font-size: $text-font-size;
  font-weight: $text-font-weight;
  color: $text-color;
  vertical-align: middle;
}
.to-forget-password {
  zoom: $text-font-zoom;
  font-size: $text-font-size;
  font-weight: $text-font-weight;
  color: $link-color;
  vertical-align: middle;
}
input[type="checkbox"] {
  -webkit-appearance: none;
  appearance: none;
  outline: none;
  margin: 0;
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  vertical-align: center;
  background: #fff;
  border: 1px solid #ccc;
  position: relative;
  vertical-align: middle;
}
input[type="checkbox"]:checked::after {
  content: "\2713";
  position: absolute;
  width: 1rem;
  height: 1rem;
  line-height: 1rem;
  color: $color-theme;
  font-size: 1rem;
  font-weight: bold;
}
.submit {
  margin-top: $button-margin-top;
}
.form-item > .form-submit {
  margin: auto;
  // width: 100%;
  width: $button_width;
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
}
.form-submit > p:first-letter{
  letter-spacing: $button_font_letter_spacing;
}
.form-item.to-register {
  margin-top: $go-register-top;
  justify-content: center;
  zoom: $text-font-zoom;
  font-size: $text-font-size;
  font-weight: $text-font-weight;
  color: $assistant-color;
}
.form-item.to-register a {
  font-size: $text-font-size;
  font-weight: $text-font-weight;
  color: $link-color;
}
.login-footer {
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