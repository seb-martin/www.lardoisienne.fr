'use strict';

angular.module('lardoisienneApp').controller(
    'GalerieCtrl',
    ['$scope', '$http', 'theme', 'GalerieService', 'api500px', function ($scope, $http, theme, GalerieService, api500px) {

        var PhotoEndpoint = api500px.photos;

        $scope.photos = PhotoEndpoint.query();

        $scope.displayCliche = function(photoId) {
            $scope.clicheDisplayed = PhotoEndpoint.get({id: photoId}, function() {
                angular.element('#clicheModal').modal('show');
            })
        };


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
