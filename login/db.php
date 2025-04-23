<?php
$host = "localhost";
$username = "root";
$password = "";
$dbname = "login_system";

$conn = mysqli_connect($host,$username,$password,$dbname);
//create using class new mysql();
//$conn->connect_errorno

if(!$conn) {
    die("connection failed".mysqli_connect_error());
}else {
    echo "database connection successfully <br>";
}
?>