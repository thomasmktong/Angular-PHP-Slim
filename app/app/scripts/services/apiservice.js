'use strict';

/**
 * @ngdoc service
 * @name ngSlimSampleApp.apiService
 * @description
 * # apiService
 * Service in the ngSlimSampleApp.
 */
angular.module('ngSlimSampleApp')
  .service('apiService', function (urlConfig) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.resolveUrl = function (concat) {
      var url = urlConfig.url + ":" + urlConfig.port;
	  var url1 = url.split('/');
	  var url2 = concat.split('/');
	  var url3 = [ ];
	  for (var i = 0, l = url1.length; i < l; i ++) {
	    if (url1[i] == '..') {
	      url3.pop();
	    } else if (url1[i] == '.') {
	      continue;
	    } else {
	      url3.push(url1[i]);
	    }
	  }
	  for (var i = 0, l = url2.length; i < l; i ++) {
	    if (url2[i] == '..') {
	      url3.pop();
	    } else if (url2[i] == '.') {
	      continue;
	    } else {
	      url3.push(url2[i]);
	    }
	  }
	  return url3.join('/');
	}
  });
