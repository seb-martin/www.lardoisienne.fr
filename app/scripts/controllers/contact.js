/*global Firebase:false */
'use strict';

angular.module('lardoisienneApp')
    .controller('ContactCtrl', ['$scope', '$firebase', 'AuthService', /*'CloudData', */'SendMailService', function($scope, $firebase, authService, /*CloudData, */SendMailService) {

        var ref = new Firebase('https://lardoisienne.firebaseio.com/contact');
//        $scope.contact = $firebase(ref);

//        $scope.contact = new CloudData('/contact');

//        var atelierTelRef = ref.child('atelier/coordonnees/tel');
//        var atelierTel = $firebase(atelierTelRef);
//        atelierTel.$bind($scope, 'tel');
        var cloudContact = $firebase(ref);
        cloudContact.$bind($scope, 'contact');

        $scope.user = authService.user;

        $scope.$on('auth:loginSuccess', function (event, user) {
            $scope.$apply(function () {
                $scope.user = user;
            });
        });
        $scope.$on('auth:logout', function () {
            $scope.$apply(function () {
                $scope.user = {};
            });
        });

        $scope.editLigneAdresse = -1;
        $scope.$watch('editLigneAdresse', function (newValue) {
            console.log('editLigneAdresse', newValue);
        });

        $scope.editLigne = function(index) {
            $scope.editLigneAdresse = index;
        };

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