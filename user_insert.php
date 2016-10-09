<?php

//prevent direct access to this php for security
//if($_SERVER['HTTP_REFERER'] == "") exit("Direct access not permitted.");

$data = json_decode(file_get_contents("php://input"));

$fullName           = mysql_real_escape_string($data ->fullName);
$fullName = '"' . $fullName . '"';

$title          = mysql_real_escape_string($data->title);
$title = '"' . $title . '"';

$sub_title      = mysql_real_escape_string($data->sub_title);
//$sub_title = '"' . $sub_title . '"';

$skills         = mysql_real_escape_string($data->skill);
//$skills = '["' . $skills . '"]';

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

//$sql = $conn->query('INSERT INTO employee_tbl (NAME) VALUES ("""LUIS""")');
//$sql = $conn->query("INSERT INTO employee_tbl (NAME,TITLE,SUB_TITLE,SKILLS,COUNT,DESCRIPTION,QUOTE,AVAILABLE,PRICE) VALUES (" .$name . ")");
$sql = $conn->query("INSERT INTO employee_tbl (NAME,TITLE,SUB_TITLE,SKILLS,COUNT,DESCRIPTION,QUOTE,AVAILABLE,PRICE) VALUES ('" 
     . $fullName . "','" 
     . $title . "','"
     . $sub_title . "','"
     . $skills . "','"
     . $count . "','"
     . $description . "','"
     . $quote . "','"
     . $available . "','"
     . $price . "')"
    );


if($conn->query($sql) === TRUE) {
    echo "New recod created";
} else {
    echo "Error: " . $sql . "<br" . $conn->error;
}

$conn->close();

?>