/*
 * @Author: DongBingnan
 * @Date: 2020-07-30 15:04:17
 * @LastEditors: DongBingnan
 * @LastEditTime: 2020-08-12 17:07:00
 * @Description: file content
 * @FilePath: \wampRoot\damaiwang\src\script\list.js
 */


!function ($) {
    class Render {
        constructor() {
            this.list = $('.itembox')
        }
        init() {
            this.Renderdiv()
            this.show()
            this.top()
        }
        Renderdiv() {
            $.ajax({
                url: 'http://10.31.152.66/damaiwang/php/list.php'
            }).done((data) => {
                let $dataArr = JSON.parse(data)
                let $strhtml = ''
                console.log($dataArr)
                $($dataArr).each((index, ele) => {
                    $strhtml += `
                    <div class='box'>
        <div class='box-l'>
            <a href='./detail.html?sid=${ele.sid}'>
                <img src='${ele.url}'>
            </a>
        </div>
        <div class='box-r'>
            <div class='title'>
                <a href='./detail.html?sid=${ele.sid}'>
                    <p>${ele.title}</p>
                </a>
            </div>

            <div class='people'>
                <a href='./detail.html?sid=${ele.sid}'>
                    <p>${ele.people}</p>
                </a>
            </div>

            <div class='where'>
                <a href='./detail.html?sid=${ele.sid}'>
                    <span>${ele.where}</span>
                </a>
            </div>

            <div class='time'>
                <a href='./detail.html?sid=${ele.sid}'>
                    <span>${ele.time}</span>
                </a>
            </div>

            <div class='price'>
                <a href='./detail.html?sid=${ele.sid}'>
                    <span>${ele.price}</span>
                </a>
            </div>
        </div>
    </div>
                    `
                })

                this.list.html($strhtml)
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
                console.log(2)
                $('html').animate({ scrollTop: 0 })

            })
        }
    }
    new Render().init()
}(jQuery)

