// public/scripts/userController.js

(function() {

    'use strict';

    angular
        .module('ngSlimSampleApp')
        .controller('UserCtrl', UserController);  

    function UserController($http, apiService) {

        var vm = this;
        
        vm.user;
        vm.error;

        vm.getUsers = function() {

            // This request will hit the index method in the AuthenticateController
            // on the Laravel side and will return the list of users
            $http.get(apiService.concatAndResolveUrl('api/test/jwt-auth')).success(function(user) {

                vm.user = user.d;
            }).error(function(error) {
                vm.error = error;
            });
        }
    }
    
})();