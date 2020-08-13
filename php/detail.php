<?php
/*
 * @Author: DongBingnan
 * @Date: 2020-08-12 20:08:52
 * @LastEditors: DongBingnan
 * @LastEditTime: 2020-08-12 20:15:49
 * @Description: file content
 * @FilePath: \wampRoot\damaiwang\php\detail.php
 */
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
//1.置字符编码
header('content-type:text/html;charset=utf-8');

//2.数据库连接
$conn = @new mysqli('localhost', 'root', '', 'hangzhouxx');
if ($conn->connect_error) {
    die('数据库连接错误，请检查用户名和密码！' . $conn->connect_error);
}
$conn->query('SET NAMES UTF8');

if (isset($_POST['sid'])) {
    $sid = $_POST['sid'];
    $result = $conn->query("select * from damai where sid=$sid");
    echo json_encode($result->fetch_assoc());
}