'use strict';

/**
 * @ngdoc function
 * @name ngSlimSampleApp.controller:StatCtrl
 * @description
 * # StatCtrl
 * Controller of the ngSlimSampleApp
 */
angular.module('ngSlimSampleApp')
  .controller('StatCtrl', function ($scope, Restangular, apiService) {

  	$scope.settings = {
  		columnDefs: [
  			{ field: 'fundname' },
  			{ field: 'holdingnav' },
  			{ field: 'mtd' },
  			{ field: 'ytd' }
  		],
  		data: Restangular.allUrl('return', apiService.resolveUrl('api/return/weekly/2013/07/19')).getList().$object
  	};

  });
