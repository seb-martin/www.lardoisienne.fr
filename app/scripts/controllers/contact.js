'use strict';

angular.module('lardoisienneApp')
    .controller('ContactCtrl', ['$scope', 'firebase', function($scope, firebase) {
        console.log("ContactCtrl start", $scope, firebase);

        var contact = firebase.$child('/contact');
        contact.$bind($scope, 'contact');

        console.log("ContactCtrl end");

    }]);