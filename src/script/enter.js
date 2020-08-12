/*
 * @Author: DongBingnan
 * @Date: 2020-08-12 11:21:19
 * @LastEditors: DongBingnan
 * @LastEditTime: 2020-08-12 15:14:50
 * @Description: file content
 * @FilePath: \wampRoot\damaiwang\src\script\enter.js
 */
!function ($) {
    class Enter {
        constructor() {
            this.btn = $('.btn')
            this.username = $('.username')
            this.password = $('.password')

        }
        init() {
            this.clickbtn()
        }
        clickbtn() {
            this.btn.on('click', () => {
                if (this.username.val() !== '' && this.password.val() !== '') {
                    $.ajax({
                        type: 'post',
                        url: 'http://localhost/damaiwang/php/enter.php',
                        data: `username=${this.username.val()}&password=${this.password.val()}`
                    }).done((data) => {
                        if (data === 'true') {
                            console.log("登陆成功")
                            //创建一个cookie并设置 cookie的有效路径
                            $.cookie('username', `${this.username.val()}`, {
                                expires: 7,
                                path: '/',
                                // domain: "/damaiwang/dist/index1.html"
                            })
                            $.cookie('password', `${this.password.val()}`, {
                                expires: 7,
                                path: '/',
                                // domain: "/damaiwang/dist/index1.html"
                            })

                            window.location.href = "http://10.31.152.66/damaiwang/dist/index1.html"//跳转到首页

                        } else {
                            $(".markdiv").show()
                            $(".markdiv span").on('click', () => $(".markdiv").hide())
                        }
                    })
                }
            })
        }
    }

    new Enter().init()
}(jQuery)