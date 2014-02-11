'use strict';

angular.module('lardoisienneApp')
    .controller('LoginCtrl', ['$scope', 'AuthService', function ($scope, auth) {

        var failPopover = angular.element('#loginButton');

        var update = function(){
            $scope.user = auth.user;
            $scope.loginFail = auth.loginFail;
        };

        $scope.$on('auth:loginSuccess', function(/*event, user*/) {
            $scope.$apply(function () {
                update();
            });
        });
        $scope.$on('auth:loginFail', function(/*event, error*/) {
            $scope.$apply(function () {
                update();
            });
        });
        $scope.$on('auth:logout', function() {
            $scope.$apply(function () {
                update();
            });
        });

        $scope.$watch('loginFail', function(error) {
            if(error) {
                failPopover.popover('show');
            } else {
                failPopover.popover('hide');
            }
        });

        $scope.login = function() {
            delete $scope.loginFail;
            auth.login();
        };

        $scope.logout = function() {
            auth.logout();
        };

        // Init modèle
        update();

        // Init popover des échecs de login
        failPopover.popover({
            trigger: 'manual'
        });


    }]);
