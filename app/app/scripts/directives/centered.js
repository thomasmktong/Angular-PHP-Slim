'use strict';

/**
 * @ngdoc directive
 * @name ngSlimSampleApp.directive:centered
 * @description
 * # centered
 */
angular.module('ngSlimSampleApp')
    .directive('centered', function() {
        return {
            restrict: "ECA",
            transclude: true,
            template: "<div style=\"position: fixed; top:0; left:0; height:100%; width:100%; display:table; z-index:9999;\">\
						<div style=\"display: table-cell; vertical-align: middle; text-align: center;\" ng-transclude>\
						</div>\
					</div>"
        };
    });
