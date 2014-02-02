"use strict";

angular.module('lardoisienneApp')
    .directive('menu', ['$location', function($location) {


        return {
            restrict: 'A',
            templateUrl: 'views/components/menu.html',
            replace: true,
            link: function(scope) {

                scope.isActive = function(viewLocation) {
                    return viewLocation === $location.path();
                };

                scope.isMenuActive = function(viewLocationBase) {
                    return $location.path().indexOf(viewLocationBase) === 0;
                };

            }
        };
    }])
;