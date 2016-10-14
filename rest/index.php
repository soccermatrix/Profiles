<?php

//process client request (VIA URL)
header("Content-Type:application/json");
include("rest_sql_function.php");
if(!empty($_GET['name'])){
	//
	$name = $_GET['name'];
	$price=get_price($name);
	if(empty($price)){
		//book not found
		deliver_response(200, "book not found",NULL);
	} else {
		//respond book price
		deliver_response(200, "book found",$price);
	}

} else {
	//throw invalid request
	deliver_response(200, "Invalid Request",NULL);
}

function deliver_response($status,$status_message,$data){
	header("HTTP/1.1 $status $status_message");
	//create array
	$response['status'] = $status;
	$response['status_message']=$status_message;
	$response['data']=$data;

	$jason_response=json_encode($response);
	echo($jason_response);
}




?>