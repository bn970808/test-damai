<?php
/*
 * @Author: DongBingnan
 * @Date: 2020-08-12 11:26:20
 * @LastEditors: DongBingnan
 * @LastEditTime: 2020-08-12 11:42:57
 * @Description: file content
 * @FilePath: \wampRoot\damaiwang\php\enter.php
 */
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
//连接数据库
$conn = new mysqli('localhost', 'root', '', 'hangzhouxx');

//检测用户名和密码是否正确
if (isset($_POST['username']) && isset($_POST['password'])) { //如果有这两个
    $name = $_POST['username'];
    $pass = sha1($_POST['password']);
    //在数据中搜索
    $result = $conn->query("select * from demo1 where username = '$name' and password = '$pass'");

    if ($result->fetch_assoc()) { //登录成功
        echo "true"; //1
    } else { //登录失败
        echo "false"; //空
    }
}