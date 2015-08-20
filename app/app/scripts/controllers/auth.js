// public/scripts/authController.js

(function() {

    'use strict';

    function AuthController($state, $stateParams, $scope, apiService, accService) {

        $scope.login = function() {

            $scope.$broadcast('show-errors-check-validity');

            if(this.userForm.$valid) {
                accService.login(this.user.userid, this.user.password).then(function() {

                    if(accService.authenticated) {

                        // Everything worked out so we can now redirect to
                        // the users state to view the data
                        var loc = $stateParams.goto !== '' ? $stateParams.goto : 'main';
                        $state.go(loc);

                    } else {

                        // error message auto binds to UI
                        // not allowing page to refresh
                        return false;
                    }
                });
            }
        };
    }

    angular
        .module('ngSlimSampleApp')
        .controller('AuthCtrl', AuthController);

})();
