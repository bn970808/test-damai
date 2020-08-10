<?php
/*
 * @Author: DongBingnan
 * @Date: 2020-08-10 15:50:43
 * @LastEditors: DongBingnan
 * @LastEditTime: 2020-08-10 16:03:11
 * @Description: file content
 * @FilePath: \wampRoot\damaiwang\php\list.php
 */
//1.置字符编码
header('content-type:text/html;charset=utf-8');

//2.数据库连接
$conn = @new mysqli('localhost', 'root', '', 'hangzhouxx');
if ($conn->connect_error) {
    die('数据库连接错误，请检查用户名和密码！' . $conn->connect_error);
}
$conn->query('SET NAMES UTF8');

$sql = "select * from damai"; //获取所有的数据
$result = $conn->query($sql); //获取数据的结果集(记录集)
$arr = array();
for ($i = 0; $i < $result->num_rows; $i++) {
    $arr[$i] = $result->fetch_assoc();
}
echo json_encode($arr);//输出接口