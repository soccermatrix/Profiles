<?php

//prevent direct access to this php for security
//if($_SERVER['HTTP_REFERER'] == "") exit("Direct access not permitted.");

$data = json_decode(file_get_contents("php://input"));

$id           = mysql_real_escape_string($data ->id);
//$id = 53;

$fullName           = mysql_real_escape_string($data ->fullName);
$fullName = '"' . $fullName . '"';
//$fullName = '"luis"';

$title          = mysql_real_escape_string($data->title);
$title = '"' . $title . '"';

$sub_title      = mysql_real_escape_string($data->sub_title);

$skills         = mysql_real_escape_string($data->skill);

$count          = mysql_real_escape_string($data->count);

$description    = mysql_real_escape_string($data->description);
$description = '"' . $description . '"';

$quote          = mysql_real_escape_string($data->quote);
$quote = '"' . $quote . '"';

$available      = mysql_real_escape_string($data->available);

$price          = mysql_real_escape_string($data->price);

$host = "projectsUser.db.2596913.hostedresource.com";
$user = "projectsUser";
$pass = "Projects80%";
$db =  "projectsUser";


$conn = new mysqli($host, $user, $pass, $db);

/*
*/

$sql = $conn->query("UPDATE employee_tbl SET 
    NAME = '" . $fullName . "', 
    TITLE = '" . $title . "',
    SUB_TITLE = '" . $sub_title . "',
    SKILLS = '" . $skills . "',
    COUNT = '" . $count . "',
    DESCRIPTION = '" . $description . "',
    QUOTE = '" . $quote . "',
    AVAILABLE = '" . $available . "',
    PRICE = '" . $price . "'

    WHERE ID = '" . $id ."'")


//  if($conn->query($sql) === TRUE) {
//      echo "Recod updated";
//  } else {
//      echo "Error: " . $sql . "<br" . $conn->error;
//  }

// $conn->close();

?>