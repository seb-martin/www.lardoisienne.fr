'use strict';

angular.module('lardoisienneApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute'
    ])
    .config(function ($routeProvider) {
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
    })
;
