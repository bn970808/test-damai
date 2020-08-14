/*
 * @Author: DongBingnan
 * @Date: 2020-08-11 09:15:30
 * @LastEditors: DongBingnan
 * @LastEditTime: 2020-08-13 20:22:32
 * @Description: file content
 * @FilePath: \wampRoot\damaiwang\src\script\detail.js
 */
!function ($) {
    class Detail {
        constructor() {
            this.content = $('.content')
            this.sid = location.search.substring(1).split('=')[1]
            this.arrsid = []
            this.arrnum = []
            this.arrprice = []
        }
        init() {
            this.show()
            this.topback()
            this.Renderdiv()

        }
        //渲染 点击div渲染红色 价格相关 存cookie
        Renderdiv() {
            let flag = 1
            $.ajax({
                url: 'http://10.31.152.66/damaiwang/php/detail.php',
                type: 'post',
                data: `sid=${window.location.search.slice(-1)}`
            }).done((data) => {
                let $dataArr = JSON.parse(data)
                let $strhtml = ''
                console.log($dataArr)

                $strhtml += `
                
                <div class="con-l">
                <div class="left">
                    <img src="${$dataArr.url}" alt="">
                </div>
                <div class="right">
                    <div class="title">${$dataArr.title}</div>
                    <div class="time">时间：${$dataArr.time}</div>
                    <div class="where">场馆：${$dataArr.where}</div>
                    <div class="changci">
                        <span>场次:</span>
    
                        <div id='ac'>2020年9月19-20日16:00-22:00</div>
                        <div>2020年9月19日16:00-22:00</div>
                        <div>2020年9月20日16:00-22:00</div>
                    </div>
                    <div class="piaodang">票档：
                        <div class='a' id='ac'>A档位</div>
                        <div class='b' >B档位</div>
                    </div>
                    <div class="quantity">数量：
                        <i class='les'>-</i>
                        <span>1张</span>
                        <i class='add'>+</i>
                    </div>
                    <div class="total">合计：
                        <span>￥${$dataArr.price}元</span>
                    </div>
                    <div class="btn">立即购买</div>
                </div>
            </div>
            <div class="con-r">
                <img src="./img.png" alt="">
            </div>
                `
                this.content.html($strhtml)
                //click div
                function clickdiv() {
                    $('.piaodang div,.changci div').on('click', function () {
                        let $this = $(this)
                        $this.attr('id', 'ac').siblings('div').attr('id', '')
                    })
                    priceAddLex()
                }
                // A B
                function priceAB() {
                    $('.piaodang .a').on('click', function () {
                        $(".total span").html(`￥${$dataArr.price}元`)
                        priceAddLex()
                    })
                    $('.piaodang .b').on('click', function () {
                        $(".total span").html(`￥${$dataArr.price * 2}元`)
                        priceAddLex()
                    })
                }
                // quantity +-
                function QuantityAddLex() {
                    $('.quantity .les').on('click', function () {
                        if (flag == 1) flag = 1
                        else {
                            flag--
                            $('.quantity span').html(`${flag}张`)
                            priceAddLex()
                        }
                    })
                    $('.quantity .add').on('click', function () {
                        flag++
                        $('.quantity span').html(`${flag}张`)
                        priceAddLex()
                    })
                }
                //price+-
                function priceAddLex() {
                    if ($('.piaodang #ac').attr('class') === 'b') {
                        $(".total span").html(`￥${$dataArr.price * flag * 2}元`)
                    }
                    if ($('.piaodang #ac').attr('class') === 'a') {
                        $(".total span").html(`￥${$dataArr.price * flag}元`)
                    }
                }
                //存cookie
                (() => {
                    // console.log($(".total span").html().substring(1, $(".total span").html().length - 1))
                    let _this = this//把this存下来是为了下面的属性绑定在原型链上 一会可以用
                    function cookietoarray() {
                        if ($.cookie('cookiesids') && $.cookie('cookienums') && $.cookie('cookieprices')) {//不是第一次添加
                            _this.arrsid = $.cookie('cookiesids').split(',')
                            _this.arrnum = $.cookie('cookienums').split(',')
                            _this.arrprice = $.cookie('cookieprices').split(',')

                        } else {//第一次添加
                            _this.arrsid = []
                            _this.arrnum = []
                            _this.arrprice = []
                        }
                    }
                    $('.right .btn')[0].onclick = () => {//点击添加
                        cookietoarray()//判断
                        if (this.arrsid.indexOf(this.sid) === -1) {//没有遍历到 也就是第一次点击
                            //添加
                            this.arrsid.push(this.sid);
                            $.cookie('cookiesids', this.arrsid, {
                                expires: 7,
                                path: '/'
                            })
                            this.arrnum.push(flag)
                            $.cookie('cookienums', this.arrnum, {
                                expires: 7,
                                path: '/'
                            })
                            //($('.piaodang #ac').attr('class'))=='a'?($dataArr.price):($dataArr.price*2)  单价
                            // this.arrprice.push($(".total span").html().substring(1, $(".total span").html().length - 1))
                            this.arrprice.push(($('.piaodang #ac').attr('class')) == 'a' ? ($dataArr.price) : ($dataArr.price * 2))
                            $.cookie('cookieprices', this.arrprice, {
                                expires: 7,
                                path: '/'
                            })
                        } else {//不是第一次了
                            //获取前面的数量 + 现在的数量
                            //获取this.sid对应的位置
                            let index = this.arrsid.indexOf(this.sid)//当前sid在数组arrsid里的索引【这个数组里存放了多个sid】
                            //覆盖之前的cookie
                            this.arrnum[index] = parseInt(flag)
                            $.cookie('cookienums', this.arrnum, {
                                expires: 7,
                                path: '/'
                            })
                            // this.arrprice[index] = $(".total span").html().substring(1, $(".total span").html().length - 1)
                            this.arrprice[index] = ($('.piaodang #ac').attr('class')) == 'a' ? ($dataArr.price) : ($dataArr.price * 2)

                            $.cookie('cookieprices', this.arrprice, {
                                expires: 7,
                                path: '/'
                            })
                        }
                        window.location.href = "http://10.31.152.66/damaiwang/dist/car.html"//跳转到登录
                    }
                })()
                clickdiv()
                priceAB()
                QuantityAddLex()
                priceAddLex()


            })
            return false
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
    new Detail().init()
}(jQuery)