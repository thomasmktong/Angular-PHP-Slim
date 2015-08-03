<?php

// database connection config
define('DB_HOST', 'aaa');
define('DB_USER', 'bbb');
define('DB_PASSWORD', 'ccc');
define('DB_NAME', 'ddd');

function dbConx() {
	return voku\db\DB::getInstance(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
}

?>