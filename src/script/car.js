/*
 * @Author: DongBingnan
 * @Date: 2020-08-11 14:54:09
 * @LastEditors: DongBingnan
 * @LastEditTime: 2020-08-13 16:25:59
 * @Description: file content
 * @FilePath: \wampRoot\damaiwang\src\script\car.js
 */
!function ($) {
    class Car {
        constructor() {

        }
        init() {
            this.show()
            this.topback()
        }
        // 显示
        show() {
            $(window).on('scroll', () => {
                $(window).scrollTop() > 120 ? $('.sidebar .top').show() : $('.sidebar .top').hide()

            })
        }
        //回到顶部
        topback() {
            $('.sidebar .top').on('click', () => {
                $('html').animate({ scrollTop: 0 })
            })
        }
    }
    new Car().init()
}(jQuery)