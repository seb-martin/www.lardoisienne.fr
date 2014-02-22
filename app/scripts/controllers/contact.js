'use strict';

angular.module('lardoisienneApp')
    .controller('ContactCtrl', ['$scope', 'firebase', function($scope, firebase) {

        var contact = firebase.$child('/contact');
        contact.$bind($scope, 'contact');

    }]);