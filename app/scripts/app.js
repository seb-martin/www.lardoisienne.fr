'use strict';

angular.module('lardoisienneApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'firebase'
    ])

    .constant('cloudDataLocation', 'https://lardoisienne.firebaseio.com')

    .constant('galerieMapUrl', './medias/galerie/galerie-map.json')

    .config(['$sceDelegateProvider', function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist(['self', 'http://www.lardoisienne.fr/**']);
    }])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/contact', {
                templateUrl: 'views/contact.html'
            })
            .when('/galerie', {
                redirectTo: '/galerie/ardoises'
            })
            .when('/galerie/ardoises', {
                templateUrl: 'views/galerie.html',
                controller: 'GalerieCtrl',
                resolve: {
                    theme: function() {
                        return 'ardoises';
                    }
                }
            })
            .when('/galerie/chevalets', {
                templateUrl: 'views/galerie.html',
                controller: 'GalerieCtrl',
                resolve: {
                    theme: function() {
                        return 'chevalets';
                    }
                }
            })
            .when('/galerie/customisations', {
                templateUrl: 'views/galerie.html',
                controller: 'GalerieCtrl',
                resolve: {
                    theme: function() {
                        return 'customisations';
                    }
                }
            })
            .otherwise({
                redirectTo: '/'
            });
    }])
;
