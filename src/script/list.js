/*
 * @Author: DongBingnan
 * @Date: 2020-08-10 15:42:49
 * @LastEditors: DongBingnan
 * @LastEditTime: 2020-08-10 16:09:49
 * @Description: file content
 * @FilePath: \wampRoot\damaiwang\src\script\list.js
 */
; !function () {
    // 渲染商品列表
    class Render {
        constructor() {
            this.list = document.querySelector('.itembox')
        }
        init() {
            $ajax(
                {
                    url: 'http://10.31.152.66//damaiwang/php/list.php'
                }
            ).then((data) => {
                console.log(data)
                let dataArr = JSON.parse(data)//把数据转换成json对象
                console.log(dataArr)
                let strhtml = ''
                for (var value of dataArr) {//遍历得到的数据
                    //渲染
                    strhtml += `
                    
                    <div>
                        <div>
                        <a href='./detail.html?sid=${value.sid}'>
                            <img src='${value.url}'>
                        </a>  
                        </div>

                        <div> 
                        <a href='./detail.html?sid=${value.sid}'>
                            <p>${value.title}</p>
                        </a>
                        </div> 

                        <div> 
                        <a href='./detail.html?sid=${value.sid}'>
                            <span>${value.where}</span>
                        </a>
                        </div>

                        <div> 
                        <a href='./detail.html?sid=${value.sid}'>
                            <span>${value.time}</span>
                        </a>
                        </div>
                        
                        <div> 
                        <a href='./detail.html?sid=${value.sid}'>
                            <span>${value.price}</span>
                        </a>
                        </div>  
                    </div>                 
                                   
                    `
                }
                this.list.innerHTML = strhtml
            })
        }
    }
}()