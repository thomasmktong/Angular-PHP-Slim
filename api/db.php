<?php
require 'vendor/autoload.php';

// database connection config
$dotenv = new Dotenv\Dotenv(__DIR__);
$dotenv->load();

function dbConx() {
	return voku\db\DB::getInstance(getenv('DB_HOST'), getenv('DB_USER'), getenv('DB_PASSWORD'), getenv('DB_NAME'));
}

?>