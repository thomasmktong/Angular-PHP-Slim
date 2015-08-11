'use strict';

/**
 * @ngdoc overview
 * @name ngSlimSampleApp
 * @description
 * # ngSlimSampleApp
 *
 * Main module of the application.
 */
angular
  .module('ngSlimSampleApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router', 'satellizer'
  ])
  .constant('urlConfig', {
    "url": "http://localhost",
    "port": 8080
  })
  .config(function ($stateProvider, $urlRouterProvider, $authProvider, urlConfig) {

            // Satellizer configuration that specifies which API
            // route the JWT should be retrieved from
            $authProvider.loginUrl = urlConfig.url + ":" + urlConfig.port + '/api/token';

            // Redirect to the auth state if any other states
            // are requested other than users
            $urlRouterProvider.otherwise('/auth');
            
            $stateProvider
                .state('auth', {
                    url: '/auth',
                    templateUrl: 'views/auth.html',
                    controller: 'AuthCtrl as auth'
                })
                .state('user', {
                    url: '/user',
                    templateUrl: 'views/user.html',
                    controller: 'UserCtrl as user'
                });

    /*
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/auth', {
        templateUrl: 'views/auth.html',
        controller: 'AuthCtrl',
        controllerAs: 'auth'
      })
      .when('/user', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl',
        controllerAs: 'user'
      })
      .otherwise({
        redirectTo: '/'
      });
    */
  });
