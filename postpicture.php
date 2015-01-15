<?php
# Script to accept dataURI containing images and additional Text via POST
# to succesfully call this script from a foreign domain you have to configure 
# your Webserver to use .htaccess-files and create one with the following line: 
# Header set Access-Control-Allow-Origin "*" 

#Globals
$DIR = "files"; #check permission for directory
$TEXTFIELDNAME = "name";
$IMAGEFIELDNAME = "image";





$date = date_create();
$timestamp =  date_timestamp_get($date);

#save text
file_put_contents($DIR."/".$timestamp.".txt", $_POST[$TEXTFIELDNAME]);

#save image
$data = $_POST[$IMAGEFIELDNAME];
$uri = substr($data,strpos($data,",")+1);
file_put_contents($DIR."/".$timestamp.".png", base64_decode($uri));
?>
