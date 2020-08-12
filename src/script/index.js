/*
 * @Author: DongBingnan
 * @Date: 2020-08-11 11:10:54
 * @LastEditors: DongBingnan
 * @LastEditTime: 2020-08-12 16:18:16
 * @Description: file content
 * @FilePath: \wampRoot\damaiwang\src\script\index.js
 */
!function ($) {
    class Index {
        constructor() {
            this.list = $('.con .box-right')
            this.flag = 0
        }
        init() {
            this.close()
            this.hover()
            this.show()
            this.top()
            this.denglu()
            this.banner()
        }
        // 隐藏
        close() {
            $('.close').on('click', () => {
                $('.guanggao').animate({
                    height: 0,
                }, () => {
                    $('.guanggao').hide()
                })
            })
        }
        // hover效果
        hover() {
            $('.user a').css('color', '#111')
            $('.user').on('mouseover', () => {

                $('.user a').css('color', '#ff1268')
            }).on('mouseout', () => {
                $('.user a').css('color', '#111')
            })
        }
        // 显示
        show() {
            $(window).on('scroll', () => {
                $(window).scrollTop() > 120 ? $('.sidebar .top').show() : $('.sidebar .top').hide()
            })
        }
        //回到顶部
        top() {
            $('.sidebar .top').on('click', function () {
                $('html').animate({ scrollTop: 0 })
            })
        }
        //登录用户
        denglu() {
            if ($.cookie('username') && $.cookie('password')) {//cookie存在
                $('.sea .right .user').hide()
                $('.sea .right .login').show()
                $('.sea .right .login span').html(`${$.cookie('username')}`)
            }
            $('.sea .right .login a').on('click', () => {
                $('.sea .right .user').show()
                $('.sea .right .login').hide()
                $.cookie('username', '', {
                    expires: -1,
                    path: '/'
                })
                $.cookie('password', '', {
                    expires: -1,
                    path: '/'
                })
            })
        }
        //轮播图
        banner() {
            const $lunbo = $('.banner')
            const $piclist = $('.banner .box a')
            const $btnlist = $('.banner ul li')
            const $left = $('.banner .left')
            const $right = $('.banner .right')
            let $num = 0
            let $time1 = null
            let $time2 = null

            //圆圈
            $btnlist.on('click', function () {
                $num = $(this).index()
                clearTimeout($time1)
                $time1 = setTimeout(() => {
                    tabswitch()
                }, 100)
            })

            //左右箭头
            $right.on('click', () => {
                $num++
                if ($num > $btnlist.length - 1) $num = 0//到最后一张让它回到0
                tabswitch()
            })
            $left.on('click', () => {
                $num--
                if ($num < 0) $num = $btnlist.length - 1
                tabswitch()
            })

            //自动
            $time2 = setInterval(() => {
                $right.click()
            }, 2000)

            //鼠标移入
            $lunbo.hover(() => {
                clearInterval($time2)
            }, () => {
                $time2 = setInterval(() => {
                    $right.click()
                }, 2000)
            })

            //封装
            function tabswitch() {
                $btnlist.eq($num).addClass('ac').siblings('li').removeClass('ac')
                $piclist.eq($num).stop(true).animate({ opacity: 1 }).siblings('a').stop(true).animate({ opacity: 0 })
            }
        }
    }
    new Index().init()
}(jQuery)