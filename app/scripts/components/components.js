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
            restrict: 'A',
            templateUrl: 'views/components/logout.html',
            scope: { },
            replace: true,
            link: function (scope) {
                var update = function () {
                    scope.user = auth.user;
                };

                scope.$on('auth:loginSuccess', function () {
                    scope.$apply(update);
                });

                scope.$on('auth:logout', function () {
                    scope.$apply(update);
                });

                scope.logout = function () {
                    auth.logout();
                };
            }
        };
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
    .directive('ardEditableText', ['AuthService', function(authService) {
        return {
            restrict: 'EA',
            templateUrl: 'views/components/editableText.html',
            replace: true,
            scope: {
                text: '='
            },
            link: function (scope) {
                // Event listeners
                scope.$on('auth:loginSuccess', function (event, user) {
                    scope.$apply(function () {
                        scope.user = user;
                    });
                });
                scope.$on('auth:logout', function () {
                    scope.$apply(function () {
                        scope.user = {};
                    });
                });

                // Model
                scope.user = authService.user;

                scope.edition = false;


                // Behaviours

                var enterEdition = function () {
                    scope.editedText = angular.copy(scope.text);
                    scope.edition = true;
                };

                var validEdition = function () {
                    scope.text = scope.editedText;
                };

                var exitEdition = function () {
                    delete scope.editedText;
                    scope.edition = false;
                };

                scope.enterEdition = function () {
                    enterEdition();
                };

                scope.keypress = function (event) {
                    console.log(event);
                    if (event.keyCode === 13) { // Enter
                        validEdition();
                        exitEdition();
                    } else if (event.keyCode === 27) { // Escape
                        exitEdition();
                    }
                };


                scope.ok = function () {
                    validEdition();
                    exitEdition();
                };

                scope.cancel = function () {
                    exitEdition();
                };


            }
        };
    }])
;