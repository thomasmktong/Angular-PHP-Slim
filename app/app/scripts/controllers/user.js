// public/scripts/userController.js

(function() {

    'use strict';

    function UserController(accService) {

        var vm = this;

        // We would normally put the logout method in the same
        // spot as the login method, ideally extracted out into
        // a service. For this simpler example we'll leave it here
        vm.logout = accService.logout;
    }

    angular
        .module('ngSlimSampleApp')
        .controller('UserCtrl', UserController);

})();