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
    "path" => "/test/basic-auth", /* or ["/admin", "/api"] */
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
    "path" => "/test/jwt-auth",
    "secure" => false,
    "secret" => "supersecretkeyyoushouldnotcommittogithub",
    "rules" => array(
        new \Slim\Middleware\JwtAuthentication\RequestPathRule(array(
            "path" => "/",
            "passthrough" => array()
        )),
        new \Slim\Middleware\JwtAuthentication\RequestMethodRule(array(
            "passthrough" => array("OPTIONS")
        ))
))));

/*
 * Testing Endpoint
 */
$app->get('/test/basic-auth', function () {
    $response["status"] = "ok";
    $response["auth"] = "basic";
    echo '{"d": ' . json_encode($response) . '}';
});

$app->get('/test/jwt-auth', function () {
    $response["status"] = "ok";
    $response["auth"] = "jwt";
    echo '{"d": ' . json_encode($response) . '}';
});

/*
 * API Endpoint
 */
$app->get('/return/weekly/:year/:month/:day', function ($year, $month, $day) {

    // http://localhost:8080/return/weekly/2015/07/08
    // $asof = new DateTime("$year-$month-$day");

    $db = dbConx();
    $q = $db->query("call sp_IWAGetClientSeriesReturns('$year-$month-$day','Testing1');");
    $r = $q->fetchAllObject();

    echo '{"d": ' . json_encode($r) . '}';
});

$app->run();