// public/scripts/authController.js

(function() {

    'use strict';

    angular
        .module('ngSlimSampleApp')
        .controller('AuthCtrl', AuthController);


    function AuthController($auth, $state, $http) {

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

                // If login is successful, redirect to the users state
                $state.go('user', {});

                // delete $http.defaults.headers.common['Authorization'];
            });
        }

    }

})();