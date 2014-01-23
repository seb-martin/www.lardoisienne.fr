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
        templateUrl: 'views/contact.html',
            controller: 'MenuCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
;
