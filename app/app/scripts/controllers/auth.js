// public/scripts/authController.js

(function() {

    'use strict';

    angular
        .module('ngSlimSampleApp')
        .controller('AuthCtrl', AuthController);


    function AuthController($auth, $state, $http, apiService, $rootScope) {

        var vm = this;

        vm.login = function() {

            var credentials = {
                user: vm.user,
                password: vm.password
            }

            // Ref: https://github.com/sahat/satellizer/issues/285
            // $http.defaults.headers.common.Authorization = 'Basic ' + btoa(credentials.user + ':' + credentials.password);
            // * at the end I am handling this in server site by poviding an additional token endpoint which
            //   accepts POST parameters instead of HTTP Basic Auth, refer PHP side for more information

            // Use Satellizer's $auth service to login
            $auth.login(credentials).then(function(data) {

                // Return an $http request for the now authenticated
                // user so that we can flatten the promise chain
                return $http.get(apiService.concatAndResolveUrl('api/user'));

                // delete $http.defaults.headers.common['Authorization'];
            }, function(error) {

                vm.loginError = true;
                vm.loginErrorText = error.data.error;

                // Because we returned the $http.get request in the $auth.login
                // promise, we can chain the next promise to the end here
            }).then(function(response) {

                // Stringify the returned data to prepare it
                // to go into local storage
                var user = JSON.stringify(response.data.user);

                // Set the stringified user data into local storage
                localStorage.setItem('user', user);

                // The user's authenticated state gets flipped to
                // true so we can now show parts of the UI that rely
                // on the user being logged in
                $rootScope.authenticated = true;

                // Putting the user's data on $rootScope allows
                // us to access it anywhere across the app
                $rootScope.currentUser = response.data.user;

                // Everything worked out so we can now redirect to
                // the users state to view the data
                $state.go('user');
            });
        }

    }

})();
