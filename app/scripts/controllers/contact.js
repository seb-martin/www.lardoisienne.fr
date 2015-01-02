'use strict';

angular.module('lardoisienneApp')
    .controller('ContactCtrl', ['$scope', '$firebase', 'firebaseRef', function($scope, $firebase, firebaseRef) {

//        var contact = firebaseRef.child('/contact');
        var contact = $firebase(firebaseRef.child('/contact')).$asObject();
        contact.$bindTo($scope, 'contact');

    }]);