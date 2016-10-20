<?php
header('Access-Control-Allow-Origin: *');  

//prevent direct access to this php for security, disable for debugging
//if($_SERVER['HTTP_REFERER'] == "") exit("Direct access not permitted.");

//Azure Server
/*
db connection string php Server: luisespinal.database.windows.net,1433 \r\nSQL Database: projects\r\nUser Name: luisespinal\r\n\r\nPHP Data Objects(PDO) Sample Code:\r\n\r\ntry {\r\n   $conn = new PDO ( \"sqlsrv:server = tcp:luisespinal.database.windows.net,1433; Database = projects\", \"luisespinal\", \"{your_password_here}\");\r\n    $conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );\r\n}\r\ncatch ( PDOException $e ) {\r\n   print( \"Error connecting to SQL Server.\" );\r\n   die(print_r($e));\r\n}\r\n\rSQL Server Extension Sample Code:\r\n\r\n$connectionInfo = array(\"UID\" => \"luisespinal@luisespinal\", \"pwd\" => \"{your_password_here}\", \"Database\" => \"projects\", \"LoginTimeout\" => 30, \"Encrypt\" => 1, \"TrustServerCertificate\" => 0);\r\n$serverName = \"tcp:luisespinal.database.windows.net,1433\";\r\n$conn = sqlsrv_connect($serverName, $connectionInfo);
server name: luisespinal.database.windows.net
server admin luisespinal
password projects80%
db name projects80%
*/

// $host = "projectsUser.db.2596913.hostedresource.com";
// $user = "projectsUser";
// $pass = "Projects80%";
// $db =  "projectsUser";


$conn = new mysqli($host, $user, $pass, $db);
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "
CREATE TABLE MyGuests (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
firstname VARCHAR(30) NOT NULL,
lastname VARCHAR(30) NOT NULL,
email VARCHAR(50),
reg_date TIMESTAMP
)
";

/*

*/



if ($conn->query($sql) === TRUE) {
    echo "Table MyGuests created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

$conn->close();

?>