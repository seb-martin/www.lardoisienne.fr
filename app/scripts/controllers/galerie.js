'use strict';

angular.module('lardoisienneApp').controller(
    'GalerieCtrl',
    function ($scope, $http, theme) {
        // Charge la structure des données de la galerie
        $http.get('./medias/galerie/galerie.json')
            .success(function(galerie/*, status, headers, config*/) {
                if(theme && galerie[theme]) {
                    // La galerie du thème
                    $scope.galerie = galerie[theme];
                } else {
                    // Toute la galerie
                    $scope.galerie = [];
                    angular.forEach(galerie, function (cliche/*, key*/) {
                        $scope.galerie.push(cliche);
                    });
                }

            })
            .error(function(data, status/*, headers, config*/) {
                console.log('Echec chargement galerie: ' + status + ' - ' + data);
            });

        $scope.previousSlide = function() {
            angular.element('#carousel').carousel('prev');
        };

        $scope.nextSlide = function() {
            angular.element('#carousel').carousel('next');
        };
    }
);
