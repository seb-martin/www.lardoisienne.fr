'use strict';

angular.module('lardoisienneApp')

    .directive('menu', ['$location', 'CloudData', function($location, CloudData) {
        return {
            restrict: 'A',
            templateUrl: 'views/components/menu.html',
            replace: true,
            link: function(scope) {

                scope.menu = new CloudData('/header/menu');

                scope.isActive = function(menuItem) {
                    if(menuItem.menu) {
                        return $location.path().indexOf(menuItem.location) === 0;
                    } else {
                        return menuItem.location === $location.path();
                    }

                };
            }
        };
    }])
    .directive('ardLogout', ['AuthService', function(auth) {

        return {
            restrict:'A',
            templateUrl: 'views/components/ard-logout.html',
            scope: { },
            replace: true,
            link: function(scope) {
                var update = function(){
                    scope.user = auth.user;
                };

                scope.$on('auth:loginSuccess', function() {
                    scope.$apply(update)
                });

                scope.$on('auth:logout', function() {
                    scope.$apply(update)
                });

                scope.logout = function() {
                    auth.logout();
                };
            }
        }
    }])
    .directive('footer', ['CloudData', function(CloudData) {
        return {
            restrict: 'C',
            templateUrl: 'views/components/footer.html',
            replace: false,
            link: function (scope) {
                scope.data = new CloudData('/footer');
            }
        };
    }])
;