<?php
// simple GET request
if(isset($_POST['submit'])){

	$name = $_POST['name'];

	// Resource Address

	$url="http://localhost:8000/rest/$name";

	// Send request to Resource

	//CURL
	$client = curl_ini($url);


	//curl_setopt($client, CURLOPT_RETURNTRANSFER, 1)
	//	get response to Resource

	//$client = curl_exe($client)

	// decode
	//$client = json_decode($client)
	
	//echo $result->$data;


}






?>