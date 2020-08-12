/*
 * @Author: DongBingnan
 * @Date: 2020-08-11 16:24:18
 * @LastEditors: DongBingnan
 * @LastEditTime: 2020-08-12 11:18:24
 * @Description: file content
 * @FilePath: \wampRoot\damaiwang\src\script\enroll.js
 */
!function ($) {
    class Enroll {
        constructor() {
            this.form = $('form')
            this.username = $('.username')
            this.phone = $('.phone')
            this.password = $('.password')
            this.passwordII = $('.passwordII')
            this.aSpan = $('form span')
            this.btn = $('.btn')

            this.usernameflag = true
            this.phoneflag = true
            this.passflag = true
            this.passIIflag = true
            this.cartidflag = true
        }
        init() {
            this.limituser()
            this.limitphone()
            this.limitpass()
            this.limitpassII()
            this.stopsubmit()

        }
        //用户名验证
        limituser() {
            this.username.on('focus', () => {
                this.aSpan.eq(0).html('请输入4-14个字符[字母数字下划线]')
                this.aSpan.eq(0).css('color', '#999')
            })
            this.username.on('blur', () => {
                if (this.username.val() !== '') {
                    const reg = /^[a-zA-Z0-9_-]{4,16}$/g
                    const len = (this.username.val()).length
                    if (len <= 14) {
                        if (reg.test(this.username.val())) {
                            this.aSpan.eq(0).html('√')
                            this.aSpan.eq(0).css('color', 'green')
                            this.usernameflag = true
                            $.ajax({
                                type: 'post',
                                url: 'http://10.31.152.66/damaiwang/php/enroll.php',
                                data: `name=${this.username.val()}`
                            }).done((data) => {

                                if (data === 'true') {
                                    this.aSpan.eq(0).html('该用户名已被注册')
                                    this.aSpan.eq(0).css('color', 'red')
                                    this.usernameflag = false
                                }
                                else {
                                    this.aSpan.eq(0).html('√')
                                    this.aSpan.eq(0).css('color', 'green')
                                }

                            })
                        } else {
                            this.aSpan.eq(0).html('格式不符合')
                            this.aSpan.eq(0).css('color', 'red')
                            this.usernameflag = false
                        }
                    } else {
                        this.aSpan.eq(0).html('长度不符合')
                        this.aSpan.eq(0).css('color', 'red')
                        this.usernameflag = false

                    }
                } else {
                    this.aSpan.eq(0).html('用户名不能为空')
                    this.aSpan.eq(0).css('color', 'red')
                    this.usernameflag = false
                }
            })
        }
        //手机验证
        limitphone() {
            this.phone.on('focus', () => {
                this.aSpan.eq(3).html('请输入手机号')
                this.aSpan.eq(3).css('color', '#999')
            })
            this.phone.on('blur', () => {
                if (this.phone.val() !== '') {
                    const reg = /^1[3578]\d{9}$/g
                    if (reg.test(this.phone.val())) {
                        this.aSpan.eq(3).html('√')
                        this.aSpan.eq(3).css('color', 'green')
                        this.phoneflag = true
                    } else {
                        this.aSpan.eq(3).html('格式有误')
                        this.aSpan.eq(3).css('color', 'red')
                        this.phoneflag = false
                    }
                } else {
                    this.aSpan.eq(3).html('手机号不能为空')
                    this.aSpan.eq(3).css('color', 'red')
                    this.phoneflag = false
                }
            })
        }
        //密码验证
        limitpass() {
            this.password.on('focus', () => {
                this.aSpan.eq(1).html('请输入6-12位密码')
                this.aSpan.eq(1).css('color', '#999')
            })
            this.password.on('input', () => {
                this.passwordII_blur()//密码发生改变的时候 确认密码再次判断
                if ((this.password.val()).length >= 6 && (this.password.val()).length <= 12) {
                    const regnum = /[0-9]/g
                    const regupcase = /[A-Z]/g
                    const reglowcase = /[a-z]/g
                    const regother = /[\W\_]/g
                    let count = 0

                    if (regnum.test(this.password.val())) count++
                    if (reglowcase.test(this.password.val())) count++
                    if (regupcase.test(this.password.val())) count++
                    if (regother.test(this.password.val())) count++

                    switch (count) {
                        case 1:
                            this.aSpan.eq(1).html('密码强度弱')
                            this.aSpan.eq(1).css('color', 'red')
                            this.passflag = false
                            break
                        case 2:
                        case 3:
                            this.aSpan.eq(1).html('密码强度中')
                            this.aSpan.eq(1).css('color', 'yellow')
                            this.passflag = true
                            break
                        case 4:
                            this.aSpan.eq(1).html('密码强度高')
                            this.aSpan.eq(1).css('color', 'green')
                            this.passflag = true
                            break
                    }
                } else {
                    this.aSpan.eq(1).html('密码长度有误')
                    this.aSpan.eq(1).css('color', 'red')
                    this.passflag = false
                }
            })
            this.password.on('blur', () => {
                if ((this.password.val()).length >= 6 && (this.password.val()).length <= 12 && this.passflag) {
                    this.aSpan.eq(1).html('√')
                    this.aSpan.eq(1).css('color', 'green')

                } else if ((this.password.val()).length === 0) {
                    this.aSpan.eq(1).html('密码不能为空')
                    this.aSpan.eq(1).css('color', 'red')
                    this.passflag = false
                } else {
                    this.aSpan.eq(1).html('密码不符合规范')
                    this.aSpan.eq(1).css('color', 'red')
                    this.passflag = false
                }
            })
        }
        //确认密码
        limitpassII() {
            this.passwordII.on('focus', () => {
                this.aSpan.eq(2).html('请输入相同的密码')
                this.aSpan.eq(2).css('color', '#999')
            })
            this.passwordII.on('blur', () => {
                this.passwordII_blur()
            })
        }
        //封装一个确认密码丢失焦点的函数
        passwordII_blur() {
            if (this.passwordII.val() === '') {
                this.aSpan.eq(2).html('确认密码不能为空')
                this.aSpan.eq(2).css('color', 'red')
                this.passflag = false
            } else {
                if (this.passwordII.val() === this.password.val()) {
                    this.aSpan.eq(2).html('√')
                    this.aSpan.eq(2).css('color', 'green')
                    this.passflag = true
                } else {
                    this.aSpan.eq(2).html('两次密码不相同')
                    this.aSpan.eq(2).css('color', 'red')
                    this.passflag = false
                }
            }

        }
        //阻止提交
        stopsubmit() {
            this.form.submit((event) => {
                if (this.username.val() === '') {
                    this.aSpan.eq(0).html('用户名不能为空')
                    this.aSpan.eq(0).css('color', 'red')
                    this.usernameflag = false
                }
                if (this.phone.val() === '') {
                    this.aSpan.eq(3).html('手机号不能为空')
                    this.aSpan.eq(3).css('color', 'red')
                    this.phoneflag = false
                }
                if (this.password.val() === '') {
                    this.aSpan.eq(1).html('密码不能为空')
                    this.aSpan.eq(1).css('color', 'red')
                    this.passflag = false
                }
                if (this.passwordII.val() === '') {
                    this.aSpan.eq(2).html('确认密码不能为空')
                    this.aSpan.eq(2).css('color', 'red')
                    this.passIIflag = false
                }
                //有一个为空就不让提交
                if (!this.usernameflag || !this.phoneflag || !this.passflag || !this.passIIflag) {
                    event.preventDefault()
                }
                //全都为true 给后端发送数据 跳转
                if (this.usernameflag && this.phoneflag && this.passflag && this.passIIflag) {
                    this.senddata()//提交的时候发送数据
                    window.location.href = "http://10.31.152.66/damaiwang/dist/enter.html"//跳转到登录
                }
            })
        }
        //注册
        senddata() {
            $.ajax({
                type: "POST",
                url: 'http://10.31.152.66/damaiwang/php/enroll.php',
                data: `username=${this.username.val()}&password=${this.password.val()}&phone=${this.phone.val()}&submit=1`
            })
        }
    }
    new Enroll().init()
}(jQuery)