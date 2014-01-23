"use strict";

angular.module('lardoisienneApp')
    .directive('menu', ['$location', function($location) {


        return {
            restrict: 'A',
            templateUrl: 'scripts/components/menu/menu.html',
            replace: true,
            link: function(scope) {

                scope.isActive = function(viewLocation) {
                    return viewLocation === $location.path();
                };

            }
        };
    }])
;