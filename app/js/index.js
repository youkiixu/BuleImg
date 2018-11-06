
var login = {
    diagEle : null,
    myreg : /^0?[1][358][0-9]{9}$/,
    loginStr: `<div id="login-content">
      <div class="title">
        登录蓝图网
        <div class="dialog__simple_closebtn" onClick="login.closeDialog()"></div>
      </div>
      <div class="content">
        <div class="content-table">
          <div width="284">
            <input id="login-phone" type="text" placeholder="手机号" />
            

          </div>
          <div class="password-cotnent">
            <input id="login-code" type="password" placeholder="短信验证码"/>
            <button class="send-code"  onClick="login.sendCode()">发送验证码</button>
          </div>
          <button class="login-btn" onClick="login.login()">
            登  录
          </button>
        </div>
      </div>
      <div class="login-content-bottom clearfix">
        <div class="social-btn float_left">
          <span>社交账号登录</span>
        </div>
        <div class="register-btn float_right">
          <span>没有账号?</span><span class="register">立即注册</span>
        </div>
      </div>
    </div>`,
    init () {
        this.openLogin()
    },
    openLogin () {
        this.openDialog(this.loginStr)
        this.eventListen()
    },
    openDialog (htmlStr) {
        this.diagEle = new Dialog();
        this.diagEle.Style = "custom";
        this.diagEle.InnerHtml = htmlStr;
        this.diagEle.show();
        
    },
    closeDialog () {
        const _this = this;
        this.diagEle.close()
        this.num = 0
        setTimeout(() => {
            _this.num = 60
        }, 1000);
        $('.send-code').attr('disabled', 'none')
    },
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
    showTip ($obj , str) {
        $obj.tip({
          showCloseBtn: true,
          content: str
        })
    },
    num: 60,
    countDown () {
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
    login () {
        const $phone = $('#login-phone')
        const $code = $('#login-code')
        const phoneVal = $phone.val()
        const codeVal = $code.val()
        if(!this.myreg.test(phoneVal)) {
            this.showTip($phone, "请输入正确的手机号")
            return
        } 
        if (!codeVal) {
            this.showTip($code , '请输入验证码')
            return
        }

    },
    eventListen () {
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



// login.init()