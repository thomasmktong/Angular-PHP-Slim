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
        'ngSanitize',
        'ngTouch',
        'ui.router', 'ui.grid', 
        'satellizer', 'restangular'
    ])
    .constant('urlConfig', {
        "url": "http://localhost",
        "port": 8080
    })
    .config(function($stateProvider, $urlRouterProvider, $authProvider, $httpProvider, $provide, urlConfig) {

        function redirectWhenLoggedOut($q, $injector) {
            return {
                responseError: function(rejection) {
                    // Need to use $injector.get to bring in $state or else we get
                    // a circular dependency error
                    var $state = $injector.get('$state');

                    // TODO
                    debugger;

                    // Instead of checking for a status code of 400 which might be used
                    // for other reasons in Laravel, we check for the specific rejection
                    // reasons to tell us if we need to redirect to the login state
                    var rejectionReasons = ['token_not_provided', 'token_expired', 'Token not found', 'token_invalid'];

                    // Loop through each rejection reason and redirect to the login
                    // state if one is encountered
                    angular.forEach(rejectionReasons, function(value, key) {

                        if (rejection.data.status === 'error' && rejection.data.message === value) {

                            // If we get a rejection corresponding to one of the reasons
                            // in our array, we know we need to authenticate the user so 
                            // we can remove the current user from local storage
                            localStorage.removeItem('user');

                            // Send the user to the auth state so they can login
                            $state.go('auth');
                        }
                    });

                    return $q.reject(rejection);
                }
            };
        }

        // Setup for the $httpInterceptor
        $provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);

        // Push the new factory onto the $http interceptor array
        $httpProvider.interceptors.push('redirectWhenLoggedOut');

        // Satellizer configuration that specifies which API
        // route the JWT should be retrieved from
        $authProvider.loginUrl = urlConfig.url + ":" + urlConfig.port + '/api/token';

        // Redirect to the auth state if any other states
        // are requested other than users
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'views/main.html',
                controller: 'MainCtrl as main'
            })
            .state('auth', {
                url: '/auth/:goto',
                templateUrl: 'views/auth.html',
                controller: 'AuthCtrl as auth'
            })
            .state('user', {
                url: '/user',
                templateUrl: 'views/user.html',
                controller: 'UserCtrl as user'
            })
            .state('stat', {
                url: '/user/stat',
                templateUrl: 'views/stat.html',
                controller: 'StatCtrl as stat'
            });

    }).run(function($rootScope, $state) {

        // $stateChangeStart is fired whenever the state changes. We can use some parameters
        // such as toState to hook into details about the state as it is changing
        $rootScope.$on('$stateChangeStart', function(event, toState) {

            // Grab the user from local storage and parse it to an object
            var user = JSON.parse(localStorage.getItem('user'));

            // If there is any user data in local storage then the user is quite
            // likely authenticated. If their token is expired, or if they are
            // otherwise not actually authenticated, they will be redirected to
            // the auth state because of the rejected request anyway
            if (user) {

                // The user's authenticated state gets flipped to
                // true so we can now show parts of the UI that rely
                // on the user being logged in
                $rootScope.authenticated = true;

                // Putting the user's data on $rootScope allows
                // us to access it anywhere across the app. Here
                // we are grabbing what is in local storage
                $rootScope.currentUser = user;

                // TODO: Verify - this case should never happen in normal flow
                // consider how to provide best UX when users bookmarked auth link, etc

                // If the user is logged in and we hit the auth route we don't need
                // to stay there and can send the user to the main state
                if (toState.name === "auth") {

                    // Preventing the default behavior allows us to use $state.
                    // go change states
                    event.preventDefault();

                    // go to the "main" state which in our case is users
                    $state.go('user');
                }

            } else {

                if (toState.url.indexOf("/user") === 0) {
                    event.preventDefault();              
                    $state.go('auth', { 'goto': toState.name });
                }
            }
        });
    });
