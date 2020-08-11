/*
 * @Author: DongBingnan
 * @Date: 2020-08-11 11:10:54
 * @LastEditors: DongBingnan
 * @LastEditTime: 2020-08-11 14:22:51
 * @Description: file content
 * @FilePath: \wampRoot\damaiwang\src\script\index.js
 */
!function ($) {
    class Index {
        constructor() {

        }
        init() {
            this.close()
            this.hover()
            this.show()
            this.top()
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

    }
    new Index().init()
}(jQuery)