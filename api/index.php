<?php
require_once 'db.php';
require 'vendor/autoload.php';

/*
 * RESTful API framework
 */
$app = new \Slim\Slim();

/*
 * Authentication Logic
 * For all the "path" defined below, run the following Slim middleware before
 * getting into API business logic
 */
$app->add(new \Slim\Middleware\HttpBasicAuthentication(array(
    "path" => array("/test/basic-auth", "/token"), /* or ["/admin", "/api"] */
    "secure" => false, /* SSL */
    "realm" => "Protected",
    "authenticator" => function ($arguments) use ($app) {

        $userName = addslashes($arguments["user"]);
        if(!empty($userName)) {

            $db = dbConx();
            $q = $db->query("select * from IWA_ClientUser where LoginID='$userName';");

            if($q) {
                $r = $q->fetchArray();

                if(strcmp($r['password'], $arguments['password']) === 0) {
                    return true;
                }
            }
        }
        return false;
    },
    "error" => function ($arguments) use ($app) {
        $response["status"] = "error";
        $response["message"] = $arguments["message"];
        $app->response->write(json_encode($response, JSON_UNESCAPED_SLASHES));
    }
)));

$app->add(new \Slim\Middleware\JwtAuthentication(array(
    "secure" => false,
    "secret" => "supersecretkeyyoushouldnotcommittogithub",
    "rules" => array(
        new \Slim\Middleware\JwtAuthentication\RequestPathRule(array(
            "path" => "/",
            "passthrough" => array("/test/basic-auth", "/token", "/public")
        )),
        new \Slim\Middleware\JwtAuthentication\RequestMethodRule(array(
            "passthrough" => array("OPTIONS")
        ))),
    "callback" => function ($options) use ($app) {
        $app->jwt = $options["decoded"];
    },
    "error" => function ($arguments) use ($app) {
        $response["status"] = "error";
        $response["message"] = $arguments["message"];
        $app->response->write(json_encode($response, JSON_UNESCAPED_SLASHES));
    }
)));

// for getting token for JWT authentication, POST only
$app->post('/token', function () use ($app) {
    $key = "supersecretkeyyoushouldnotcommittogithub";
    $token = array(
        "iss" => "https://YOUR_NAMESPACE",
        "sub" => $app->environment["PHP_AUTH_USER"],
        "aud" => $app->environment["PHP_AUTH_USER"], // "YOUR_CLIENT_ID",
        "exp" => strtotime('10 hour'),
        "iat" => time());

    // we are using firebase/php-jwt ~2.0 due to dependency of tuupola/slim-jwt-auth 0.4.0
    // for php-jwt 3.0 we need a reference to namespace "use \Firebase\JWT\JWT;" 
    $jwt = \JWT::encode($token, $key);

    // example - eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvWU9VUl9OQU1FU1BBQ0UiLCJzdWIiOiJUZXN0aW5nMSIsImF1ZCI6IllPVVJfQ0xJRU5UX0lEIiwiZXhwIjoxNDM4NjI3NDM2LCJpYXQiOjE0Mzg1OTE0MzZ9.GroL5De0tEZTdwr6GfPsj5LCV5IioY0DGXbfZxL3CAM
    // $decoded = \JWT::decode($jwt, $key, array('HS256'));

    $response["token"] = $jwt;
    echo '{"d": ' . json_encode($response) . '}';
});

/*
 * JWT Endpoint
 */
$app->map('/test', function () {
    $response["status"] = "ok";
    $response["auth"] = "nil";
    echo '{"d": ' . json_encode($response) . '}';
})->via('GET', 'POST');

$app->map('/test/basic-auth', function () {
    // Header ["Authorization"] = "Basic XXXXXXXXXX"
    $response["status"] = "ok";
    $response["auth"] = "basic";
    echo '{"d": ' . json_encode($response) . '}';
})->via('GET', 'POST');

$app->map('/test/jwt-auth', function () {
    // Header ["Authorization"] = "Bearer XXXXXXXXXX"
    $response["status"] = "ok";
    $response["auth"] = "jwt";
    echo '{"d": ' . json_encode($response) . '}';
})->via('GET', 'POST');

/*
 * API Endpoint
 */
$app->get('/return/weekly/:year/:month/:day', function ($year, $month, $day) {

    // example - http://localhost:8080/api/return/weekly/2015/07/08
    // $asof = new DateTime("$year-$month-$day");

    $db = dbConx();
    $q = $db->query("call sp_IWAGetClientSeriesReturns('$year-$month-$day','Testing1');");
    $r = $q->fetchAllObject();

    echo '{"d": ' . json_encode($r) . '}';
});

$app->run();