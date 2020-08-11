/*
 * @Author: DongBingnan
 * @Date: 2020-08-11 16:24:18
 * @LastEditors: DongBingnan
 * @LastEditTime: 2020-08-11 21:02:34
 * @Description: file content
 * @FilePath: \wampRoot\damaiwang\src\script\enroll.js
 */
!function ($) {
    class Enroll {
        constructor() {
            this.form = $('from')
            this.username = $('.username')
            this.phone = $('.phone')
            this.password = $('.password')
            this.passwordII = $('.passwordII')
            this.aSpan = $('form span')

            this.usernameflag = true
            this.phoneflag = true
            this.passflag = true
            this.passIIflag = true
            this.cartidflag = true
        }
        init() {
            this.limituser()
        }
        //用户名验证
        limituser() {
            this.username.on('focus', () => {
                this.aSpan.eq(0).html('请输入5-14个字符[字母数字下划线]')
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
                                console.log(data)
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

                // $.ajax({
                //     type: 'post',
                //     url: 'http://10.31.152.66/damaiwang/php/enroll.php',
                //     data: `name=${this.username.val()}`
                // }).done((data) => {
                //     console.log(data)
                //     if (data === 'true') {
                //         this.aSpan.eq(0).html = '该用户名已被注册'
                //         this.aSpan.eq(0).css('color', 'red')
                //         this.usernameflag = false
                //     }
                //     else {
                //         this.aSpan.eq(0).html = '√'
                //         this.aSpan.eq(0).css('color', 'green')
                //     }

                // })
            })
        }
    }
    new Enroll().init()
}(jQuery)









// // 用户重名检测
// const username = document.querySelector('.username')
// username.onblur = function () {//失去焦点的时候判断是否注册过
//     //1 创建ajax核心对象
//     let ajax = new XMLHttpRequest()
//     //2 open打开与后端的连接
//     ajax.open('post', 'http://10.31.152.66/damaiwang/php/enroll.php', true)
//     //3 send发送数据到后端
//     ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
//     ajax.send('name=' + this.value)//name=啥啥啥
//     //4 获取响应体
//     ajax.onreadystatechange = function () {
//         if (ajax.readyState === 4) {
//             if (!ajax.responseText) { //不存在，可以注册
//                 document.querySelector('span').innerHTML = '√'
//                 document.querySelector('span').style.color = 'green'
//             } else { //存在
//                 document.querySelector('span').innerHTML = '该用户名已被注册'
//                 document.querySelector('span').style.color = 'red'
//             }
//         }
//     }
// }