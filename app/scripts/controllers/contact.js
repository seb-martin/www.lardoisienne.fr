'use strict';

angular.module('lardoisienneApp')
    .controller('ContactCtrl', ['$scope', 'CloudData', 'SendMailService', function($scope, CloudData, SendMailService) {

/*
        var ref = new Firebase('https://lardoisienne.firebaseio.com/contact');
        $scope.contactInfos = $firebase(ref);
*/

        $scope.contact = new CloudData('/contact');

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