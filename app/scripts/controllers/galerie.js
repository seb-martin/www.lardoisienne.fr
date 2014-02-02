'use strict';

angular.module('lardoisienneApp').controller(
    'GalerieCtrl',
    ['$scope', '$http', 'theme', 'GalerieService', function ($scope, $http, theme, GalerieService) {

        var selectTheme = function(theme){
            $scope.theme = theme;
            new GalerieService(theme).then(
                function(galerie) {
                    $scope.galerie = galerie;
                }
            );
        };

        $scope.selectTheme = function(theme){
            selectTheme(theme);
        };

        $scope.previousSlide = function() {
            angular.element('#carousel').carousel('prev');
        };

        $scope.nextSlide = function() {
            angular.element('#carousel').carousel('next');
        };

        // Initialisation
        selectTheme(theme);

    } ]
);
