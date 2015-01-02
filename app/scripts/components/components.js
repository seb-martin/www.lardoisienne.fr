(function(angular) {
    'use strict';

    angular.module('lardoisienneApp')

        .directive('ardNavigation', ['$window', '$location', '$firebase', 'firebaseRef', function($window, $location, $firebase, firebaseRef) {
            return {
                restrict: 'E',
                templateUrl: 'views/components/navigation.html',
                replace: true,
                link: function(scope, elem) {

                    scope.menu = $firebase(firebaseRef.child('/header/menu')).$asArray();

                    scope.isActive = function(menuItem) {
                        if(menuItem.menu) {
                            return $location.path().indexOf(menuItem.location) === 0;
                        } else {
                            return menuItem.location === $location.path();
                        }

                    };

                    // Le menu n'a besoin d'être "collapsé" que lorsqu'il est accessible via le bouton .navbar-toggle
                    scope.collapse = function(selector) {

                        if($window.innerWidth < 768) {

                            elem.find(selector).collapse('hide');
                        }
                    };
                }
            };
        }])
        .directive('ardMasthead', [function() {
            return {
                restrict: 'E',
                templateUrl: 'views/components/masthead.html',
                replace: true
            };
        }])
        .directive('ardHeader', [function() {
            return {
                restrict: 'E',
                templateUrl: 'views/components/header.html',
                replace: true,
                transclude: true
            };
        }])
        .directive('ardFooter', ['$firebase', 'firebaseRef', function($firebase, firebaseRef) {
            return {
                restrict: 'E',
                templateUrl: 'views/components/footer.html',
                replace: true,
                link: function (scope) {
                    scope.data = $firebase(firebaseRef.child('/footer/content')).$asObject();
                }
            };
        }])
        .directive('menu', ['$location', '$firebase', 'firebaseRef', function($location, $firebase, firebaseRef) {
            return {
                restrict: 'A',
                templateUrl: 'views/components/menu.html',
                replace: true,
                link: function(scope) {

                    scope.menu = $firebase(firebaseRef.child('/header/menu')).$asArray();

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
                restrict: 'EA',
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
        .directive('ardSendMessage', ['SendMailService', function(SendMailService) {
            return {
                restrict: 'EA',
                templateUrl: 'views/components/send-message.html',
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


        .directive('ardEditableList2', [function() {

            return {
                restrict: 'E',
                templateUrl: 'views/components/editableList2.html',
                replace: true,
                transclude: true,
                scope: {
                    newItem: '&',
                    editMode:'='
                },
                controller: ['$scope', function ($scope) {
                    var ctrl = this;

                    ctrl.items = [];

                    ctrl.remove = function (elem) {

                        for (var i = 0; i < ctrl.items.length; i++) {
                            if(angular.equals(elem, ctrl.items[i])) {
                                ctrl.items.slice(i, 1);
                            }

                        }

/*
                        ctrl.items = _.filter(ctrl.items, function (item) {
                            return !angular.equals(elem, item);
                        });
*/
                    };

                    ctrl.add = function(elem){
                        ctrl.items.push(elem);
                    };

                    ctrl.isEditable = function() {
                        return $scope.editMode;
                    };

                }]
            };
        }])
        .directive('ardEditableListItem2', [function() {
            return {
                restrict: 'E',
                templateUrl: 'views/components/editableListItem2.html',
                replace: true,
                transclude: true,
                require: '^ardEditableList2',
                scope: {
                    removeItem: '&',
                    upItem: '&'
                },
                link: function (scope, element, attrs, ardEditableListCtrl) {
                    ardEditableListCtrl.add(scope);

                    scope.isEditable = ardEditableListCtrl.isEditable;

                    scope.$on('$destroy', function () {
                        ardEditableListCtrl.remove(scope);
                    });
                }
            };

        }])
        .controller('MyController', function() {
            var ctrl = this;

            ctrl.data = ['A', 'B', 'C', 'D' ];
            ctrl.edit = true;

            ctrl.addData = function(d) {
                ctrl.data.push(d || {});
            };

            ctrl.removeData = function(index) {
                ctrl.data.splice(index, 1);
            };

        })
    ;
})(angular);

