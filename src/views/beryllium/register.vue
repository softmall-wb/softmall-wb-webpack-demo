<template>
  <div wb:style-var-bind>
    <div :style="{'background-image': 'url('+ theme_background_img+ '@w_750,h_750)'}" class="register">
      <!-- logo -->
      <div class="logo_container">
        <div class="logo">
          <img style="width: 100%; height: 100%" :src="mall_head_img + '@w_200,h_200'" alt />
        </div>
        <div class="logo_title">欢迎注册{{ mall_name }}</div>
      </div>
      <!-- logo -->
      <ul class="register-form">

        <!-- 用户名 -->
        <li class="form-item" v-if="need_username">
          <icon-base class="icon" :width="iconSize" :height="iconSize" iconColor>
            <user-icon />
          </icon-base>
          <input
            ref="input-username"
            name="username"
            @input="handleInput"
            :placeholder="formItems.username.placeholder"
            type="text"
            v-model="registerService.username"
          />
        </li>
        <!-- 用户名 -->

        <!-- 手机号 -->
        <li class="form-item">
          <icon-base class="icon" :width="iconSize" :height="iconSize" iconColor>
            <phone-icon />
          </icon-base>
          <input
            ref="input-phone"
            name="phone"
            @input="handleInput"
            :placeholder="formItems.phone.placeholder"
            type="number"
            v-model="registerService.phone"
          />
        </li>
        <!-- 手机号 -->

        <!-- 密码 -->
        <li class="form-item" v-if="need_password">
          <icon-base class="icon" :width="iconSize" :height="iconSize" iconColor>
            <password-icon />
          </icon-base>
          <input
            ref="input-password"
            name="password"
            @input="handleInput"
            :placeholder="formItems.password.placeholder"
            type="password"
            v-model="registerService.password"
          />
        </li>
        <!-- 密码 -->

        <!-- 确认密码-->
        <li class="form-item" v-if="need_password">
          <icon-base class="icon" :width="iconSize" :height="iconSize" iconColor>
            <password-icon />
          </icon-base>
          <input
            ref="input-confirmPassword"
            name="confirmPassword"
            @input="handleInput"
            :placeholder="formItems.confirmPassword.placeholder"
            type="password"
            v-model="registerService.passwordConfirm"
          />
        </li>
        <!-- 确认密码-->

        <!-- 微信-->
        <li class="form-item" v-if="need_wechat">
          <icon-base class="icon" :width="iconSize" :height="iconSize" iconColor>
            <wechat-icon />
          </icon-base>
          <input
            ref="input-wechat"
            name="wechat"
            @input="handleInput"
            :placeholder="formItems.wechat.placeholder"
            type="text"
            v-model="registerService.wechat"
          />
        </li>
        <!-- 微信-->

        <!-- 邮箱-->
        <li class="form-item" v-if="need_mail">
          <icon-base class="icon" :width="iconSize" :height="iconSize" iconColor>
            <mail-icon />
          </icon-base>
          <input
            ref="input-mail"
            name="mail"
            @input="handleInput"
            :placeholder="formItems.mail.placeholder"
            type="text"
            v-model="registerService.email"
          />
        </li>
        <!-- 邮箱-->

        <!-- QQ-->
        <li class="form-item" v-if="need_qq">
          <icon-base class="icon" :width="iconSize" :height="iconSize" iconColor>
            <qq-icon />
          </icon-base>
          <input
            ref="input-qq"
            name="qq"
            @input="handleInput"
            :placeholder="formItems.qq.placeholder"
            type="text"
            v-model="registerService.qq"
          />
        </li>
        <!-- QQ-->

        <!-- 支付宝-->
        <li class="form-item" v-if="need_alipay">
          <icon-base class="icon" :width="iconSize" :height="iconSize" iconColor>
            <alipay-icon />
          </icon-base>
          <input
            ref="input-alipay"
            name="alipay"
            @input="handleInput"
            :placeholder="formItems.alipay.placeholder"
            type="text"
            v-model="registerService.alipay"
          />
        </li>
        <!-- 支付宝-->

        <!-- 验证码-->
        <li class="form-item">
          <icon-base class="icon" :width="iconSize" :height="iconSize" iconColor>
            <captcha-icon />
          </icon-base>
          <input
            ref="input-captcha"
            name="captcha"
            @input="handleInput"
            :placeholder="formItems.captcha.placeholder"
            type="text"
            v-model="registerService.vcode"
          />
          <button id="get-captcha" @click="sendCode">{{!registerService.able_to_send_vcode? registerService.vcode_second: '获取验证码'}}</button>
        </li>
        <!-- 验证码-->

        <!-- 头像 -->
        <li class="form-item" v-if="need_avatar">
          <div class="avatar-upload">
            <span>选择头像</span>
            <label for="avatar" v-if="registerService.avatorUrl === ''" @click="uploadAvator">
              <div class="avatar-upload-icon">
                <icon-base
                  class="upload_icon"
                  :width="avatar_upload_icon_size"
                  :height="avatar_upload_icon_size"
                  iconColor
                >
                  <upload-icon />
                </icon-base>
                <span>上传图片</span>
              </div>
            </label>

            <div class="avatar_image" v-else>
              <div class="delete_avatar" @click="deleteAvatar">
                <icon-base
                  :width="avatar_delete_icon_size"
                  :height="avatar_delete_icon_size"
                  iconColor
                >
                  <delete-icon />
                </icon-base>
              </div>
              <img :src="registerService.avatorUrl" alt />
            </div>
          </div>
        </li>
        <!-- 头像 -->

        <!-- 性别 -->
        <li class="form-item" v-if="need_gender">
          <div class="sex-select">
            <span>选择性别</span>
            <div class="sex-select-options">
              <label for="secrecy" v-if="sex_select_allow_confidential">
                <div
                  :class="{ 'sex-option-checked': registerService.gender == Gender.confidential }"
                  class="sex-select-options-item"
                >
                  <span>保密</span>
                  <input
                    type="radio"
                    name="secrecy"
                    id="secrecy"
                    :value="Gender.confidential"
                    v-model="registerService.gender"
                  />
                </div>
              </label>
              <label for="male">
                <div
                  class="sex-select-options-item"
                  :class="{ 'sex-option-checked': registerService.gender == Gender.man }"
                >
                  <span>男士</span>
                  <input type="radio" name="male" id="male" :value="Gender.man" v-model="registerService.gender" />
                </div>
              </label>
              <label for="female">
                <div
                  class="sex-select-options-item"
                  :class="{ 'sex-option-checked': registerService.gender == Gender.female }"
                >
                  <span>女生</span>
                  <input
                    type="radio"
                    name="female"
                    id="female"
                    :value="Gender.female"
                    v-model="registerService.gender"
                  />
                </div>
              </label>
            </div>
          </div>
        </li>
        <!-- 性别 -->
        
        <!-- 注册按钮 -->
        <li class="form-item submit">
          <button @click="submit" class="form-submit"><p>注册</p></button>
        </li>
        <li class="form-item to-login">
          <div>
            已有账号？
            <a @click="toLogin">点击登录</a>
          </div>
        </li>
        <!-- 注册按钮 -->
        
      </ul>
      <footer class="register-footer">
        注册即代表您已阅读并同意《
        <span @click="serviceTerm">用户服务协议</span>》
      </footer>
    </div>
  </div>
</template>

<script>
import iconBase from "../../components/IconBase.vue";
import phoneIcon from "../../components/icons/phone.vue";
import userIcon from "../../components/icons/user.vue";
import passwordIcon from "../../components/icons/password.vue";
import wechatIcon from "../../components/icons/wechat.vue";
import mailIcon from "../../components/icons/mail.vue";
import qqIcon from "../../components/icons/qq.vue";
import alipayIcon from "../../components/icons/alipay.vue";
import captchaIcon from "../../components/icons/captcha.vue";
import uploadIcon from "../../components/icons/upload.vue";
import deleteIcon from "../../components/icons/delete.vue";
import WBPropertyUtil from "softmall-wb/Property/WBPropertyUtil";
import {
  RegisterService,
  UserNameCheckLifeCycle,
  PhoneCheckLifeCycle,
  PasswordCheckLifeCycle,
  ConfirmCheckLifeCycle,
  AvatorCheckLifeCycle,
  AlipayCheckLifeCycle,
  QQCheckLifeCycle,
  WeChatCheckLifeCycle,
  VCodeCheckLifeCycle,
  EmailCheckLifeCycle,
  Gender
} from 'softmall-wb/index'

export default {
  name: "Register",
  components: {
    iconBase,
    userIcon,
    passwordIcon,
    captchaIcon,
    phoneIcon,
    wechatIcon,
    mailIcon,
    qqIcon,
    alipayIcon,
    uploadIcon,
    deleteIcon
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
      表单元素: {},
      输入框: {},
      注册按钮: {
        // tip: "获取验证码的字体颜色受此处控制"
      },
      转到登录: {},
      "链接、文字与辅助性颜色": {
        tip: "调整视觉效果，如“点击登录”",
      },
      选择头像及选择性别: {},
      上传图片: {},
      性别选项: {},
      // 自定义元素: {
      //   tip: "控制元素的显示和隐藏",
      // },
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
      15,
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
      17,
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

    /* 表单元素 */
    need_username: new WBPropertyUtil.Switch(
      "表单元素",
      "需要输入用户名",
      true
    ),
    need_password: new WBPropertyUtil.Switch("表单元素", "需要输入密码", false),
    need_wechat: new WBPropertyUtil.Switch("表单元素", "需要输入微信", false),
    need_mail: new WBPropertyUtil.Switch("表单元素", "需要输入邮箱", false),
    need_qq: new WBPropertyUtil.Switch("表单元素", "需要输入QQ", false),
    need_alipay: new WBPropertyUtil.Switch("表单元素", "需要输入支付宝", false),
    need_avatar: new WBPropertyUtil.Switch("表单元素", "需要选择头像", false),
    need_gender: new WBPropertyUtil.Switch("表单元素", "需要选择性别", false),

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

    /* 注册按钮 */
    login_button_font_letter_spacing: new WBPropertyUtil.PixelSlider(
      "注册按钮",
      "字间距",
      1,
      1,
      100
    ),
    login_button_border_radius: new WBPropertyUtil.PixelSlider(
      "注册按钮",
      "按钮圆角",
      25,
      0,
      70
    ),
    login_button_width: new WBPropertyUtil.PercentSlider(
      "注册按钮",
      "按钮宽度",
      100,
      30,
      100
    ),
    login_button_margin_top: new WBPropertyUtil.PixelSlider(
      "注册按钮",
      "上边距",
      20,
      10,
      50
    ),
    login_button_height: new WBPropertyUtil.PixelSlider(
      "注册按钮",
      "按钮高度",
      45,
      40,
      70
    ),
    login_button_color: new WBPropertyUtil.ColorPicker(
      "注册按钮",
      "文字颜色",
      "#fff"
    ),
    login_button_font_size: new WBPropertyUtil.PixelSlider(
      "注册按钮",
      "文字大小",
      16,
      10,
      30
    ),
    login_button_font_weight: new WBPropertyUtil.Slider(
      "注册按钮",
      "文字粗细",
      400,
      300,
      900,
      50,
      false
    ),

    /* 转到登录 */
    go_register_top: new WBPropertyUtil.PixelSlider(
      "转到登录",
      "上边距",
      17,
      15,
      35
    ),

    /* 链接、文字与辅助性颜色 */
    text_font_size: new WBPropertyUtil.PixelSlider(
      "链接、文字与辅助性颜色",
      "文字大小",
      15,
      10,
      35
    ),
    text_font_weight: new WBPropertyUtil.Slider(
      "链接、文字与辅助性颜色",
      "文字粗细",
      450,
      300,
      900,
      50,
      false
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

    /* 选择头像及选择性别label */
    avatar_label_font_size: new WBPropertyUtil.PixelSlider(
      "选择头像及选择性别",
      "label文字大小",
      13,
      5,
      26
    ),
    avatar_label_font_color: new WBPropertyUtil.ColorPicker(
      "选择头像及选择性别",
      "文字颜色",
      "#aaaaaa"
    ),

    /* 上传图片 */
    avatar_font_size: new WBPropertyUtil.PixelSlider(
      "上传图片",
      "文字大小",
      10,
      5,
      26
    ),
    avatar_font_color: new WBPropertyUtil.ColorPicker(
      "上传图片",
      "文字颜色",
      "#aaaaaa"
    ),
    avatar_upload_icon_size: new WBPropertyUtil.PixelSlider(
      "上传图片",
      "icon大小",
      25,
      5,
      50
    ),
    avatar_img_size: new WBPropertyUtil.PixelSlider(
      "上传图片",
      "预览图片大小",
      70,
      40,
      150
    ),
    avatar_delete_icon_color: new WBPropertyUtil.ColorPicker(
      "上传图片",
      "删除图片按钮颜色",
      "#aaa"
    ),
    avatar_delete_icon_size: new WBPropertyUtil.PixelSlider(
      "上传图片",
      "删除图片按钮大小",
      18,
      10,
      40
    ),
    /* 性别选项 */
    sex_select_allow_confidential: new WBPropertyUtil.Switch(
      "性别选项",
      "是否可以设置为保密",
      true
    ),
    sex_select_font_size: new WBPropertyUtil.PixelSlider(
      "性别选项",
      "文字大小",
      12,
      8,
      26
    ),
    sex_select_font_color: new WBPropertyUtil.ColorPicker(
      "性别选项",
      "默认颜色",
      "#aaaaaa"
    ),

    sex_select_font_color_checked: new WBPropertyUtil.ColorPicker(
      "性别选项",
      "选中颜色",
      "#ff8c44"
    ),

    // /* 控制元素是否显示 */
    // visible_code: new WBPropertyUtil.Switch(
    //   "自定义元素",
    //   "是否显示验证码输入框",
    //   true
    // ),

    /* 底部介绍 */
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
    const avator = new AvatorCheckLifeCycle(Core)
    const phoneCheck = new PhoneCheckLifeCycle(Core)
    const passwordCheck = new PasswordCheckLifeCycle(Core)
    const confirmCheck = new ConfirmCheckLifeCycle(Core)
    const codeCheck = new VCodeCheckLifeCycle(Core)
    const wechat = new WeChatCheckLifeCycle(Core)
    const qq = new QQCheckLifeCycle(Core)
    const email = new EmailCheckLifeCycle(Core)
    const username = new UserNameCheckLifeCycle(Core)
    const alipay = new AlipayCheckLifeCycle(Core)

    phoneCheck
      // .error(e => this.errorPop('phone', e))
      .error(e => this.verifyFail({ name: "phone", errorMsg: e }))
      .empty(() => this.verifyFail({ name: "phone" }))
    passwordCheck
      // .error(e => this.errorPop('password', e))
      .error(e => this.verifyFail({ name: "password", errorMsg: e }))
      .empty(() => this.verifyFail({ name: "password" }))

    confirmCheck
      // .error(e => this.errorPop('confirmPassword', e))
      .error(e => this.verifyFail({ name: "confirmPassword", errorMsg: e }))
      .empty(() => this.verifyFail({ name: "confirmPassword" }))
    codeCheck
      // .error(e => this.errorPop('captcha', e))
      .error(e => {
        this.verifyFail({ name: "captcha", errorMsg: e })
        this.registerService.vcode = ""
      })
      .empty(() => this.verifyFail({ name: "captcha" }))
    wechat
      // .error(e => this.errorPop('wechat', e))
      .error(e => this.verifyFail({ name: "wechat", errorMsg: e }))
      .empty(() => this.verifyFail({ name: "wechat" }))
    qq
      // .error(e => this.errorPop('qq', e))
      .error(e => this.verifyFail({ name: "qq", errorMsg: e }))
      .empty(() => this.verifyFail({ name: "qq" }))
    email
      // .error(e => this.errorPop('mail', e))
      .error(e => this.verifyFail({ name: "mail", errorMsg: e }))
      .empty(() => this.verifyFail({ name: "mail" }))
    username
      // .error(e => this.errorPop('username', e))
      .error(e => this.verifyFail({ name: "username", errorMsg: e }))
      .empty(() => this.verifyFail({ name: "username" }))
    alipay
      // .error(e => this.errorPop('alipay', e))
      .error(e => this.verifyFail({ name: "alipay", errorMsg: e }))
      .empty(() => this.verifyFail({ name: "alipay" }))

    avator
      // .error(e => this.errorPop('alipay', e))
      .error(e => Core.Pop.Alert({ msg: e }))
      .empty(() => Core.Pop.Alert({ msg: "请上传用户头像！" }))


    const registerService = new RegisterService(
      username,
      passwordCheck,
      confirmCheck,
      wechat,
      email,
      qq,
      alipay,
      phoneCheck,
      avator,
      codeCheck,
      {
        username: this.need_username,
        password: this.need_password,
        wechat: this.need_wechat,
        qq: this.need_qq,
        alipay: this.need_alipay,
        vcode: true,
        email: this.need_mail,
        avator: this.need_avatar,
        gender: this.need_gender
      },
      Core
    )

    return {
      // 主题(icon)颜色
      iconSize: 25,

      formItems: {
        username: {
          placeholder: "请输入您的用户名",
          defaultErrorMsg: "请输入您的用户名",
        },
        phone: {
          placeholder: "请输入您的手机号",
          defaultErrorMsg: "请输入正确的手机号",
        },
        password: {
          placeholder: "请输入密码",
          defaultErrorMsg: "请输入密码",
        },
        confirmPassword: {
          placeholder: "请再次输入密码",
          defaultErrorMsg: "请输入密码",
        },
        wechat: {
          placeholder: "请输入您的微信号",
          defaultErrorMsg: "请输入您的微信号",
        },
        mail: {
          placeholder: "请输入您的邮箱",
          defaultErrorMsg: "请输入您的邮箱",
        },
        qq: {
          placeholder: "请输入您的QQ号",
          defaultErrorMsg: "请输入您的QQ号",
        },
        alipay: {
          placeholder: "请输入您的支付宝账号",
          defaultErrorMsg: "请输入您的支付宝账号",
        },
        captcha: {
          placeholder: "请输入验证码",
          defaultErrorMsg: "请输入验证码",
        },
      },
      formData: {
        username: "",
        phone: "",
        wechat: "",
        mail: "",
        qq: "",
        alipay: "",
        captcha: "",
        sex: "",
      },

      registerService,
      Gender
    };

  },
  methods: {
    errorPop(item, error) {
      Core.Pop.Alert({ msg: error })
      this.verifyFail({ name: item, errorMsg: error })
    },

    sendCode() {
      if (!this.registerService.able_to_send_vcode)
        return ;

      this.registerService.send({
        when_vcode_sending_error(error) {
          Core.Pop.Alert({ msg: error })
        },

        when_vcode_sending_success() {
          console.log("completed")
        }
      })
    },

    toLogin() {
      this.registerService.toLogin()
      // this.$emit("changeComponent", "Login");
    },
    submit() {
      this.registerService.submit()
      // 验证错误提示函数 用例:
      // this.verifyFail(
      //   "username",
      //   { name: "phone", errorMsg: "bbb" },
      //   "wechat",
      //   "mail",
      //   "captcha"
      // );
    },
    serviceTerm() {
      this.registerService.toServiceTerm()
    },
    uploadAvator() {
      this.registerService.uploadAvator()
    },
    deleteAvatar() {
      this.registerService.avatorUrl = ""
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
        inputElement.placeholder =
          this.formItems[inputElement.name].placeholder;
        inputElement.classList.remove("error");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/views/beryllium/var.scss";
@import "src/views/beryllium/public.scss";
.register {
  min-height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  background-image: $background;
  background-repeat: no-repeat;
  background-size: contain;
}
.register-form {
  flex: 1;
  height: 200px;
  width: calc(100vw);
  margin-top: calc($card_wrapper_top / 2);
  padding: 15px 20px;
  box-sizing: border-box;
  position: relative;
  border: 3.5px solid #fff;
  border-radius: 30px 30px 0 0;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(13px);
}

.avatar-upload > span {
  display: block;
  font-size: $avatar_label_font_size;
  color: $avatar_label_font_color;
}
.avatar-upload-icon {
  margin-top: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid $upload_avatar_font_color;
  border-radius: 4px;
  fill: $avatar_label_font_color;
}
.avatar-upload-icon > span {
  display: block;
  font-size: $upload_avatar_font_size;
  color: $upload_avatar_font_color;
}
.avatar_image {
  position: relative;
}
.delete_avatar {
  position: absolute;
  right: 0;
  top: 0;
  margin: 2px;
  z-index: 100;
}
.avatar_image > img {
  width: $upload_avatar_img_size;
  height: $upload_avatar_img_size;
  object-fit: contain;
}
.delete_avatar {
  fill: $upload_avatar_delete_icon_color;
}
.sex-select > span {
  display: block;
  font-size: $avatar_label_font_size;
  color: $avatar_label_font_color;
}
.sex-select-options {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
.sex-select-options-item {
  padding: 5px 10px;
  border: 1px solid $sex_select_font_color;
  border-radius: 3vh;
  margin: 0 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.sex-select-options-item span {
  font-size: $sex_select_font_size;
  color: $sex_select_font_color;
}
.sex-select-options-item input {
  display: none;
}
.sex-option-checked {
  border: 1px solid $sex_select_font_color_checked;
}
.sex-option-checked span {
  color: $sex_select_font_color_checked;
}

.form-item.to-login {
  margin-top: $go-register-top;
  justify-content: center;
  font-size: $text-font-size;
  font-weight: $text-font-weight;
  color: $assistant-color;
}
.form-item.to-login a {
  font-size: $text-font-size;
  font-weight: $text-font-weight;
  color: $link-color;
}
.register-footer {
  margin-top: 20px;
  width: 100%;
  text-align: center;
  color: $footer-color;
  font-size: $footer-font-size;
  font-weight: $footer-font-weight;
  height: $footer-height;
  letter-spacing: $footer-space;
}
.register-footer span {
  color: $color_theme;
}
</style>