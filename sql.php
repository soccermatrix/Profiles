<?php

//prevent direct access to this php for security
//if($_SERVER['HTTP_REFERER'] == "") exit("Direct access not permitted.");

$host = "projectsUser.db.2596913.hostedresource.com";
$user = "projectsUser";
$pass = "Projects80%";
$db =  "projectsUser";


$conn = new mysqli($host, $user, $pass, $db);

$sql = $conn->query("SELECT * FROM employee_tbl");

$data = "";
while($rs = $sql->fetch_array(MYSQLI_ASSOC)) {
    if ($data != "") {$data .= ",";}
    $data .= '{';
    $data .= '"id":"'  . $rs["ID"] . '",';
    $data .= '"fullName":'  . $rs["NAME"] . ',';
    $data .= '"title":'  . $rs["TITLE"] . ',';
    $data .= '"sub_title":'  . $rs["SUB_TITLE"] . ',';
    $data .= '"skills":'  . $rs["SKILLS"] . ',';
    $data .= '"count":'  . $rs["COUNT"] . ',';
    $data .= '"description":'  . $rs["DESCRIPTION"] . ',';
    $data .= '"quote":'  . $rs["QUOTE"] . ',';
    $data .= '"available":'  . $rs["AVAILABLE"] . ',';
    $data .= '"price":"'  . $rs["PRICE"] .'"';    
    $data .= '}';
}
$data ='{"employees":['.$data.']}';

$conn->close();
echo($data);

?>