'use strict';

angular.module('lardoisienneApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'firebase'
    ])


//    .config(['$sceDelegateProvider', function($sceDelegateProvider) {
//        // http://docs.angularjs.org/api/ng/provider/$sceDelegateProvider
//        $sceDelegateProvider.resourceUrlWhitelist(['self', 'http://www.lardoisienne.fr/**']);
//    }])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html'
            })
            .when('/contact', {
                templateUrl: 'views/contact.html'
            })
            .when('/galerie', {
                controller: 'GalerieCtrl',
                templateUrl: 'views/galerie.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }])
;
