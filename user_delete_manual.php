<?php
header('Access-Control-Allow-Origin: *');  

//prevent direct access to this php for security
//if($_SERVER['HTTP_REFERER'] == "") exit("Direct access not permitted.");

$host = "projectsUser.db.2596913.hostedresource.com";
$user = "projectsUser";
$pass = "Projects80%";
$db =  "projectsUser";


$conn = new mysqli($host, $user, $pass, $db);

$sql = $conn->query("DELETE FROM employee_tbl WHERE ID > 126"); 


if($conn->query($sql) === TRUE) {
    echo "New recod created";
} else {
    echo "Error: " . $sql . "<br" . $conn->error;
}

$conn->close();

?>