'use strict';

angular.module('lardoisienneApp')
    .controller('ContactCtrl', function($scope, SendMailService) {
        $scope.data = {};
        $scope.reponse = undefined;

        $scope.envoyer = function() {
            new SendMailService($scope.data).then(
                function(reponse) {
                    $scope.reponse = reponse;
                },
                function(reponse) {
                    $scope.reponse = reponse;
                }
            );
        };
    });