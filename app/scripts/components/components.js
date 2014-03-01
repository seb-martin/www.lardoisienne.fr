'use strict';

angular.module('lardoisienneApp')

    .directive('ardPage', [function() {
        return {
            restrict: 'E',
            templateUrl: 'views/components/page.html',
            replace: true,
            transclude: true,
            link: function (scope, element, attrs) {

            }
        };
    }])
    .directive('ardNavigation', ['$location', 'firebase', function($location, firebase) {
        return {
            restrict: 'E',
            templateUrl: 'views/components/navigation.html',
            replace: true,
            link: function(scope) {

                scope.menu = firebase.$child('/header/menu');

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
    .directive('ardMasthead', [function() {
        return {
            restrict: 'E',
            templateUrl: 'views/components/masthead.html',
            replace: true,
            link: function (scope, element, attrs) {

            }
        };
    }])
    .directive('ardHeader', [function() {
        return {
            restrict: 'E',
            templateUrl: 'views/components/header.html',
            replace: true,
            transclude: true
        }
    }])
    .directive('ardFooter', ['firebase', function(firebase) {
        return {
            restrict: 'E',
            templateUrl: 'views/components/footer.html',
            replace: true,
            link: function (scope) {
                scope.data = firebase.$child('/footer');
            }
        };
    }])
    .directive('menu', ['$location', 'firebase', function($location, firebase) {
        return {
            restrict: 'A',
            templateUrl: 'views/components/menu.html',
            replace: true,
            link: function(scope) {

                scope.menu = firebase.$child('/header/menu');

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
    .directive('ardEditableList', ['AuthService', function(authService) {
        return {
            restrict: 'EA',
            templateUrl: 'views/components/editableList.html',
            replace: true,
            transclude: true,
            scope: {
                list: '=',
                newValue: '='
            },
            controller: ['$scope', function ($scope) {

                this.remove = function (index) {
                    $scope.list.splice(index, 1);
                };

            }],
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
            }
        };
    }])
    .directive('ardEditableListItem', ['AuthService', function(authService) {
        return {
            restrict: 'EA',
            templateUrl: 'views/components/editableListItem.html',
            replace: true,
            transclude: true,
            require: '^ardEditableList',
            scope: false,
            link: function (scope, element, attrs, ardEditableListCtrl) {
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

                // Behaviours
                scope.remove = function (index) {
                    ardEditableListCtrl.remove(index);
                };

            }
        };

    }])
    .directive('ardEditableText', ['AuthService', function(authService) {
        return {
            restrict: 'EA',
            templateUrl: 'views/components/editableText.html',
            replace: true,
            transclude: true,
            scope: {
                text: '=',
                iconClass:'@'
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
    .directive('ardSendMail', ['SendMailService', function(SendMailService) {
        return {
            restrict: 'EA',
            templateUrl: 'views/components/sendMail.html',
            replace: true,
//            scope: {},
            link: function (scope) {
                scope.data = {};
                scope.reponse = undefined;

                scope.inputValidationClass = function (input) {
                    return {
                        'has-success': input.$dirty && input.$valid,
                        'has-error': input.$dirty && input.$invalid
                    };
                };


                scope.envoyer = function () {
                    new SendMailService(scope.data).then(
                        function (reponse) {
                            scope.reponse = reponse;
                            delete scope.data.message;
                            scope.messageForm.$setPristine();
                        },
                        function (reponse) {
                            scope.reponse = reponse;
                        }
                    );
                };

            }
        };
    }])
;