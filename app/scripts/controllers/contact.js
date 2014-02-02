'use strict';

angular.module('lardoisienneApp')
    .controller('ContactCtrl', ['$scope', 'SendMailService', function($scope, SendMailService) {
        $scope.data = {};
        $scope.reponse = undefined;

        $scope.envoyer = function() {
            new SendMailService($scope.data).then(
                function(reponse) {
                    $scope.reponse = reponse;
                    delete $scope.data.message;
                },
                function(reponse) {
                    $scope.reponse = reponse;
                }
            );
        };
    }]);