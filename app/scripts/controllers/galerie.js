'use strict';

angular.module('lardoisienneApp').controller(
    'GalerieCtrl',
    ['$scope', '$http', 'api500px', function ($scope, $http, api500px) {

        var PhotoEndpoint = api500px.photos;

        $scope.photos = PhotoEndpoint.query();

        $scope.displayCliche = function(photoId) {
            $scope.clicheDisplayed = PhotoEndpoint.get({id: photoId}, function() {
                angular.element('#clicheModal').modal('show');
            })
        };

    } ]
);
