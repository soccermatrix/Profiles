<?php
header('Access-Control-Allow-Origin: *');  

//prevent direct access to this php for security, disable for debugging
//if($_SERVER['HTTP_REFERER'] == "") exit("Direct access not permitted.");

//Windows Server
$host = "projectsUser.db.2596913.hostedresource.com";
$user = "projectsUser";
$pass = "Projects80%";
$db =  "projectsUser";

//Linux Server

// $host = "projectsUser2.db.3872119.hostedresource.com";
// $user = "projectsUser2";
// $pass = "Projects80%";
// $db =  "projectsUser2";


$conn = new mysqli($host, $user, $pass, $db);

$sql = $conn->query("SELECT * FROM employee_tbl");

$data = "";
while($rs = $sql->fetch_array(MYSQLI_ASSOC)) {
    if ($data != "") {$data .= ",";}
    $data .= '{';
    $data .= '"id":"'  . $rs["ID"] . '",';
    $data .= '"fullName":"'  . $rs["NAME"] . '",';
    $data .= '"title":"'  . $rs["TITLE"] . '",';
    $data .= '"sub_title":"'  . $rs["SUB_TITLE"] . '",';
    $data .= '"skills":"'  . $rs["SKILLS"] . '",';
    $data .= '"count":"'  . $rs["COUNT"] . '",';
    $data .= '"description":"'  . $rs["DESCRIPTION"] . '",';
    $data .= '"quote":"'  . $rs["QUOTE"] . '",';
    $data .= '"available":"'  . $rs["AVAILABLE"] . '",';
    $data .= '"price":"'  . $rs["PRICE"] . '",';
    $data .= '"avatar":"'  . $rs["AVATAR"] .'"';    
    $data .= '}';
}
$data ='{"employees":['.$data.']}';



$conn->close();
//echo($data);
//new line added Oct 13 to support RESTful web service
//$result = json_decode($data);
echo($data)
//echo($data->$data['employees'])

?>