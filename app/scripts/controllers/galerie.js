/*global $:false */
'use strict';

angular.module('lardoisienneApp').controller(
    'GalerieCtrl',
    ['$scope', '$http', 'api500px', function ($scope, $http, api500px) {

        var PhotoEndpoint = api500px.photos;

        // Charge la première page de vignettes
        $scope.vignettes = PhotoEndpoint.query();



        $scope.displayCliche = function(photoId) {
            PhotoEndpoint.get({id: photoId}, function(cliche) {
                $scope.displayedCliche = cliche;
                var html = $('html');
                $scope.vignettesScrollTop = html.scrollTop();
                html.scrollTop(0);
            });
        };

        $scope.hideCliche = function(){
            $scope.displayedCliche = null;
            $('html').scrollTop($scope.vignettesScrollTop);
        };


        $scope.hasName = function(cliche) {
            return cliche && cliche.name && cliche.name !== 'Untitled';
        };

        $scope.hasDescription = function(cliche) {
            return cliche && cliche.description;
        };

    } ]
);
