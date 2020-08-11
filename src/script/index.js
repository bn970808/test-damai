/*
 * @Author: DongBingnan
 * @Date: 2020-08-11 11:10:54
 * @LastEditors: DongBingnan
 * @LastEditTime: 2020-08-11 16:48:51
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
            // this.rend()
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
        //渲染
        // rend() {
        //     $.ajax({
        //         url: 'http://10.31.152.66/damaiwang/php/list.php'
        //     }).done((data) => {
        //         let $dataArr = JSON.parse(data)
        //         let $strhtml = ''
        //         console.log($dataArr)
        //         $($dataArr).each((index, ele) => {
        //             this.flag++
        //             $strhtml += `
        //             <a href="./list.html" target="_blank" class='box-right-item'>
        //                     <div class='itemimg'>
        //                         <img class='lazy'
        //                             data-original="${ele.url}"
        //                             alt="">
        //                     </div>
        //                     <div class='iteminfo'>
        //                         <div class="title">${ele.title}</div>
        //                         <div class="venue">${ele.where}</div>
        //                         <div class="showtime">${ele.time}</div>
        //                         <div class="price">
        //                         ${ele.price}
        //                             <span>起</span>
        //                         </div>
        //                     </div>
        //                 </a>
        //             `
        //             if (this.flag = 6) return false
        //         })

        //         this.list.html($strhtml)
        //     })
        // }
    }
    new Index().init()
}(jQuery)