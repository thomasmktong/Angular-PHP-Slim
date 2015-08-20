'use strict';

/**
 * @ngdoc service
 * @name ngSlimSampleApp.accService
 * @description
 * # accService
 * Service in the ngSlimSampleApp.
 */
angular.module('ngSlimSampleApp')
  .service('accService', function ($auth, $http, apiService) {
    // AngularJS will instantiate a singleton by calling "new" on this function\

    this.login = function(userid, password) {

        // Ref: https://github.com/sahat/satellizer/issues/285
        // $http.defaults.headers.common.Authorization = 'Basic ' + btoa(credentials.user + ':' + credentials.password);
        // * at the end I am handling this in server site by poviding an additional token endpoint which
        //   accepts POST parameters instead of HTTP Basic Auth, refer PHP side for more information

        var self = this;

        // Use Satellizer's $auth service to login
        return $auth.login({ user: userid, password: password }).then(function(data) {

            // Return an $http request for the now authenticated
            // user so that we can flatten the promise chain
            return $http.get(apiService.resolveUrl('api/user'));

            // delete $http.defaults.headers.common['Authorization'];
        }, function(error) {

        	error = apiService.resolveError(error);

            self.loginError = true;
            self.loginErrorText = error.data.message;

            // Because we returned the $http.get request in the $auth.login
            // promise, we can chain the next promise to the end here

        }).then(function(response) {

        	var user = null;
        	if(response && response.data) user = response.data.user;

            // Stringify the returned data
            // Set the stringified user data into local storage
            localStorage.setItem('user', JSON.stringify(user));

            // Update VM
            self.updateViewModel(user);
        });
    };

    this.loadSavedLogin = function() {

        // Grab the user from local storage and parse it to an object
        var user = JSON.parse(localStorage.getItem('user'));

        // If there is any user data in local storage then the user is quite
        // likely authenticated. If their token is expired, or if they are
        // otherwise not actually authenticated, they will be redirected to
        // the auth state because of the rejected request anyway
        this.updateViewModel(user);
    };

    this.logout = function() {

    	var self = this;
        return $auth.logout().then(function() {

            // Remove the authenticated user from local storage
            localStorage.removeItem('user');

            // Update VM
            self.updateViewModel();
        });
    };

    this.updateViewModel = function(userid) {

    	if(userid) {

    		// The user's authenticated state gets flipped to
	        // true so we can now show parts of the UI that rely
	        // on the user being logged in
	        this.authenticated = true;

	        // Putting the user's data on this allows
	        // us to access it anywhere across the app
	        this.currentUser = userid;
	        this.currentAvator = GeoPattern.generate(userid).toDataUri();    	

    	} else {

    		// Flip authenticated to false so that we no longer
            // show UI elements dependant on the user being logged in
            this.authenticated = false;

            // Remove the current user info from this
            this.currentUser = null;
            this.currentAvator = null;
    	}
    }

    this.authenticated = false;
    this.currentUser = null;
    this.currentAvator = null;
  });
