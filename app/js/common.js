
var loginWin = {
  diagEle: null,
  myreg: /^0?[1][358][0-9]{9}$/,
  loginStr: `<div id="login-content">
      <div class="title">
        登录蓝图网
        <div class="dialog__simple_closebtn" onClick="loginWin.closeDialog()"></div>
      </div>
      <div class="content">
        <div class="content-table">
          <div>
            <input id="login-phone" type="text" class="textinput" placeholder="手机号" />
          </div>
          <div class="password-cotnent">
            <input id="login-code" type="password" class="textinput" placeholder="短信验证码"/>
            <button class="send-code button"  onClick="loginWin.sendCode()">发送验证码</button>
          </div>
          <button class="login-btn" onClick="loginWin.login()">
            登  录
          </button>
        </div>
      </div>
      <div class="login-content-bottom clearfix">
        <div class="social-btn float_left" onClick="loginWin.openSocialLogin()">
          <span>社交账号登录</span>
        </div>
        <div class="register-btn float_right">
          <span>没有账号?</span><span class="register"  onClick="loginWin.openRegister()">立即注册</span>
        </div>
      </div>
    </div>`,
  socialLoginStr: `<div id="login-content">
      <div class="title">
        登录蓝图网
        <div class="dialog__simple_closebtn" onClick="loginWin.closeDialog()"></div>
      </div>
      <div class="content">
        <div class="login-img clearfix">
            <div class="social-tab float_left">
                <a href="https://graph.qq.com/oauth2.0/show?which=Login&display=pc&response_type=code&client_id=101495653&redirect_uri=http://www.lanimg.com/huiyuan/jjlogin/qqlogin/callback.php&state=fe891576ceaad9875d08033a2ebcafb0&scope=get_user_info,add_share,list_album,add_album,upload_pic,add_topic,add_one_blog,add_weibo,check_page_fans,add_t,add_pic_t,del_t,get_repost_list,get_info,get_other_info,get_fanslist,get_idolist,add_idol,del_idol,get_tenpay_addr">
                    <img class="qq-img" src="./i/login/QQ.png" alt="QQ">
                    <a class="sub">QQ</a>
                </a>
            </div>
            <div class="social-tab float_right">
                <a href="https://open.weixin.qq.com/connect/qrconnect?appid=wx76e544f0bdb40340&redirect_uri=http%3A%2F%2Fwww.lanimg.com%2Fhuiyuan%2Fjjlogin%2Fvxlogin%2Fcallback.php&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect" >
                    <img class="wechat-img" src="./i/login/wechat.png" alt="weChat">
                    <a class="sub">微信</a>
                </a>
            </div>
        </div>
      </div>
      <div class="login-content-bottom clearfix">
        <div class="social-btn float_left" onClick="loginWin.openLogin()">
          <span>短信登录</span>
        </div>
        <div class="register-btn float_right">
          <span>没有账号?</span><span class="register" onClick="loginWin.openRegister()">立即注册</span>
        </div>
      </div>
    </div>`,
  registerStr: `<div id="login-content">
      <div class="title">
        注册蓝图网
        <div class="dialog__simple_closebtn" onClick="loginWin.closeDialog()"></div>
      </div>
      <div class="content">
        <div class="login-img clearfix">
          <div class="social-tab float_left">
            <a href="">
                <img class="qq-img" src="./i/login/QQ.png" alt="QQ">
                <a class="sub">QQ注册</a>
            </a>
          </div>
          <div class="social-tab float_right">
            <a href="">
                <img class="wechat-img" src="./i/login/wechat.png" alt="weChat">
                <a class="sub">微信注册</a>
            </a>
          </div>
        </div>
      </div>
      <div class="login-content-bottom " style="margin-top: 30px;">
        <div class="ali02">
          <span><input type="checkbox" id="sing-1" name="hobby-1" value="唱歌" /><label for="sing-1" class="hand">我已经阅读并接受</label><a class="underLine">《注册声明》</a><a class="underLine">《版权声明》</a></span>
        </div>
        <div class="register-btn ali02 margin_top10">
          <span>已有账号?</span><span class="register" onClick="loginWin.openLogin()">立即登录</span>
        </div>
      </div>
    </div>`,
  init() {
    this.openLogin()
  },
  // 社交账号登录
  openSocialLogin() {
    this.openDialog(this.socialLoginStr)
    this.eventListen()
  },
  // 账号密码登录
  openLogin() {
    this.openDialog(this.loginStr)
    this.eventListen()
  },
  // 注册
  openRegister() {
    this.openDialog(this.registerStr)
    this.eventListen()
  },
  // 打开模态框
  openDialog(htmlStr) {
    console.log(this.diagEle)
    if (this.diagEle != null) {
      this.closeDialog()
    }
    this.diagEle = new Dialog();
    this.diagEle.Style = "custom";
    this.diagEle.InnerHtml = htmlStr;
    this.diagEle.show();
  },
  // 关闭模态框
  closeDialog() {
    const _this = this;
    this.diagEle.close()
    this.num = 0
    setTimeout(() => {
      _this.num = 60
    }, 10);
    $('.send-code').attr('disabled', 'none')
  },
  // 发送验证码
  sendCode() {
    const myreg = this.myreg
    const $phone = $('#login-phone')
    const phoneVal = $phone.val()
    // 验证手机号
    if (myreg.test(phoneVal)) {
      // 开始倒计时
      this.countDown()
    } else {
      this.showTip($phone, "请输入正确的手机号")
    }
  },
  // 展示tip
  showTip($obj, str) {
    $obj.tip({
      showCloseBtn: true,
      content: str
    })
  },
  num: 60,
  // 倒计时
  countDown() {
    const _this = this;
    if (_this.num != 0) {
      _this.num--
      $('.send-code').text(`重新发送(${this.num})`)
      $('.send-code').attr('disabled', 'disabled')
      setTimeout(() => {
        _this.sendCode()
      }, 1000);
    } else {
      _this.num = 60
      $('.send-code').text('发送验证码')
      $('.send-code').attr('disabled', 'none')
    }
  },
  // 登录操作
  login() {
    const $phone = $('#login-phone')
    const $code = $('#login-code')
    const phoneVal = $phone.val()
    const codeVal = $code.val()
    if (!this.myreg.test(phoneVal)) {
      this.showTip($phone, "请输入正确的手机号")
      return
    }
    if (!codeVal) {
      this.showTip($code, '请输入验证码')
      return
    }

  },
  // 监听点击事件
  eventListen() {
    const _this = this;
    const $phone = $('#login-phone')
    const $code = $('#login-code')
    $phone.bind("enter", function () {
      $code.focus();
    })
    $code.bind("enter", function () {
      _this.login()
    })
  }
}

// 签到事件
var signWin = {
    diagEle : null,
    init() {
        this.openWin()
    },
    openWin() {
        this.diagEle = new Dialog();
        this.diagEle.Style = "custom";
        this.diagEle.InnerHtml = $('#signContent').html();
        this.diagEle.show();
    },
    closeWin() {
        this.diagEle.close()
    }
}
// signWin.init()

//loginWin.init()


$(function(){

    //个人中心的隐藏与显示
    // $(".login_success_img").mouseover(function(){
    //     $(".order_info").show();  
    // });
    // $(".login_success_img").mouseout(function(){
    //     $(".order_info").hide(); 
    // });

    //楼层导航的显示隐藏
    $(window).scroll(function() {
        if ($(this).scrollTop() > 800) {
        $('.floors_nav').fadeIn(800);
        } else {
        $('.floors_nav').fadeOut(800);
        }
        });
   
})
