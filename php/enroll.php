<?php
/*
 * @Author: DongBingnan
 * @Date: 2020-08-11 16:51:45
 * @LastEditors: DongBingnan
 * @LastEditTime: 2020-08-12 11:01:26
 * @Description: file content
 * @FilePath: \wampRoot\damaiwang\php\enroll.php
 */
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
//连接数据库
$conn = new mysqli('localhost', 'root', '', 'hangzhouxx');

$user = $_POST['username'];
$pass = sha1($_POST['password']); //加密
$phone = $_POST['phone'];
$submit = $_POST['submit'];

//判断用户名是否注册过
if (isset($_POST['name'])) { //如果获取到了
    $name = $_POST['name'];
    $result = $conn->query("select * from demo1 where username = '$name'");
    if ($result->fetch_assoc()) {
        echo "true";
    } else {
        echo "false";
    }
}
//往数据库里添加
if (isset($submit)) { //获取到了 也就是点了submit
    //获取前端发过来的数据
    $conn->query("insert demo1 values(null,'$user','$pass',null,'$phone')");
}