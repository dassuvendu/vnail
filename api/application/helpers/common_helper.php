<?php 
defined('BASEPATH') OR exit('No direct script access allowed');

function pr($var)
{
	if (is_array($var)) {
		echo '<pre>';
		print_r($var);
		echo '</pre>';
	} else {
		echo $var;
	}
	
	exit();
}