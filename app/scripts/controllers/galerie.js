'use strict';

angular.module('lardoisienneApp').controller(
    'GalerieCtrl',
    ['$scope', '$http', 'theme', 'GalerieService', 'api500px', function ($scope, $http, theme, GalerieService, api500px) {

        $scope.photos = api500px.photos();


        var selectTheme = function(theme){
            $scope.theme = theme;
            $scope.galerie = new GalerieService(theme);
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
