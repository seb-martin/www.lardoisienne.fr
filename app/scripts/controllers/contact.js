/*global Firebase:false */
'use strict';

angular.module('lardoisienneApp')
    .controller('ContactCtrl', ['$scope', '$firebase', /*'CloudData', */'SendMailService', function($scope, $firebase, /*CloudData, */SendMailService) {

        var ref = new Firebase('https://lardoisienne.firebaseio.com/contact');
        $scope.contact = $firebase(ref);

//        $scope.contact = new CloudData('/contact');

        var atelierTelRef = ref.child('atelier/coordonnees/tel');
        var atelierTel = $firebase(atelierTelRef);
        atelierTel.$bind($scope, 'tel');




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