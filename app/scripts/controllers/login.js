/*global Firebase:false, FirebaseSimpleLogin:false */
'use strict';

angular.module('lardoisienneApp')
    .controller('LoginCtrl', ['$scope', 'AuthService', function ($scope, auth) {

        var update = function(){
            $scope.user = auth.user;
            $scope.loginFail = auth.loginFail;
        };

        $scope.$on('auth:loginSuccess', function(event, user) {
            $scope.$apply(function() {
                update();
/*
                $scope.user = user.user;
                delete $scope.loginFail;
*/
            })
        });
        $scope.$on('auth:loginFail', function(event, error) {
            $scope.$apply(function() {
                update();
//                $scope.loginFail = error;
            })
        });
        $scope.$on('auth:logout', function() {
            $scope.$apply(function() {
                update();
/*
                $scope.user = {};
                delete $scope.loginFail;
*/
            })
        });

        $scope.login = function() {
            auth.login();
        };

        $scope.logout = function() {
            auth.logout();
        };

        // Init
        update();

    }]);
