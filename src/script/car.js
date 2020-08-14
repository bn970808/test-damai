/*
 * @Author: DongBingnan
 * @Date: 2020-08-11 14:54:09
 * @LastEditors: DongBingnan
 * @LastEditTime: 2020-08-14 12:16:21
 * @Description: file content
 * @FilePath: \wampRoot\damaiwang\src\script\car.js
 */
!function ($) {
    class Car {
        constructor() {
            this.itemlist = $('.item-list')
        }
        init() {
            this.show()
            this.topback()
            // this.quanxuan()
            if ($.cookie('cookiesids') && $.cookie('cookienums') && $.cookie('cookieprices')) {
                let arrsid1 = $.cookie('cookiesids').split(',')
                let arrnum1 = $.cookie('cookienums').split(',')
                let arrprice1 = $.cookie('cookieprices').split(',')
                for (let i = 0; i < arrsid1.length; i++) {
                    this.rendercartlist(arrsid1[i], arrnum1[i], arrprice1[i])
                }
            }

        }
        //渲染
        rendercartlist(sid, num, price) {
            $.ajax({
                url: 'http://10.31.152.66/damaiwang/php/list.php',
            }).done((data) => {
                let arrdata = JSON.parse(data)
                for (let value of arrdata) {
                    if (value.sid === sid) {//数据里的sid 和 cookie里的sid 相同
                        let strhtml = ''
                        strhtml += `
                        <div class="goods-item goods-item-sele" style="display: block;">
                        <div class="goods-info">
                            <div class="cell b-checkbox">
                                <div class="one-checkbox">
                                    <input type="checkbox" checked="" name="" id="" class='che'
                                        value="" />
                                    <span class="line-circle"></span>
                                </div>
                            </div>
                            <div class="cell b-goods">
                                <div class="goods-name">
                                    <div class="goods-pic">
                                        <a href=""><img
                                                src="${value.url}"
                                                alt="" /></a>
                                    </div>
                                    <div class="goods-msg">
                                        <div class="goods-d-info">
                                            <a href="">${value.title}</a>
                                        </div>
                                        <div class="goods-ex">
                                            <span class="promise"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="cell b-props">
                                <div class="prop-text"></div>
                            </div>
                            <div class="cell b-price">
                                <strong>￥${price}元</strong>
                                <div class="sales-promotion-dropdown">
                                </div>
                            </div>
                            <div class="cell b-quantity">
                                <div class="quantity-form">
                                    <a class="quantity-down" href="javascript:void(0)">-</a>
                                    <input type="text" value="${num}" />
                                    <a class="quantity-add" href="javascript:void(0)">+</a>
                                </div>
                            </div>
                            <div class="cell b-sum">
                                <strong>${(num * price).toFixed(2)}</strong>
                            </div>
                            <div class="cell b-action">
                                <a href="javascript:void(0)">删除</a>
                            </div>
                        </div>
                    </div>
                        `
                        this.itemlist[0].innerHTML += strhtml
                        this.lastEffect()

                        // let a = (num * price)
                        // this.priceBox += a
                        // console.log(this.priceBox)
                        // let zongjia = ''
                        // zongjia += `<span class="txt">总价（不含运费）：</span>
                        // <span class="totalprice">￥${this.priceBox}</span>`
                        // $('.price-sum')[0].innerHTML += zongjia
                        // // $('.price-sum').detach().not($(".price-sum span").eq(-2))
                    }
                }
            })

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
        lastEffect() {
            this.quanxuan()
            this.zongjia()

        }
        //全选
        quanxuan() {
            const $topAllselect = $('.allselect')
            const $bottomAllSelect = $('.allselect2')
            const $otherSelect = $('input[type="checkbox"]').not('.allselect,.allselect2')
            $topAllselect.on('click', () => {
                $otherSelect.prop('checked', $topAllselect.prop('checked'))
                $bottomAllSelect.prop('checked', $topAllselect.prop('checked'))
            })
            $bottomAllSelect.on('click', () => {
                $otherSelect.prop('checked', $bottomAllSelect.prop('checked'))
                $topAllselect.prop('checked', $bottomAllSelect.prop('checked'))
            })
            $otherSelect.on('click', () => {
                let bool = true
                $otherSelect.each((index, item) => {
                    if ($(item).prop('checked') === false) bool = false
                })
                $bottomAllSelect.prop('checked', bool)
                $topAllselect.prop('checked', bool)
            })
        }
        //总价
        zongjia() {
            let priceBox = 0
            $('.b-sum strong').each((index, value) => {
                priceBox += parseInt(value.innerHTML)
                $('.totalprice').html(`￥${priceBox}`)
            })
        }
        //数量
    }
    new Car().init()
}(jQuery)