/*global $:false, Firebase:false*/
/*http://stackoverflow.com/questions/8852765/jshint-strict-mode-and-jquery-is-not-defined*/
'use strict';

angular.module('lardoisienneApp')
    .constant('firebaseContext', {location: 'https://lardoisienne.firebaseio.com'})


    .factory('firebaseRef', ['firebaseContext', function(firebaseContext) {
        return new Firebase(firebaseContext.location);
    }])


    .factory('AuthService', ['$rootScope', '$firebase', 'firebaseRef', function($rootScope, $firebase, firebaseRef) {
        var data;
        var authCallback;
        var sync = $firebase(firebaseRef);


        authCallback = function (error, authData) {
            if (error) {
                // an error occurred while attempting login
                data.loginFail = error;
                $rootScope.$broadcast('auth:loginFail', error);
            } else if (authData) {
                // user authenticated with Firebase
                data.user = authData;
                $rootScope.$broadcast('auth:loginSuccess', authData);
            } else {
                // user is logged out
                data.user = {};
                $rootScope.$broadcast('auth:logout');
            }
        };

        data = {
            user: {},
            login: function () {
                delete this.loginFail;
                sync.authWithPassword(this.user, authCallback);
            },
            logout: function () {
                sync.unauth();
            }
        };

        return  data;
    }])
    .factory('SendMailService', ['$q', '$http', function($q, $http) {
//        var sendMailUrl = 'http://www.lardoisienne.fr/seb/send_mail.php';
        // DID changer l'url pour ./services/send_mail.php
        var sendMailUrl = './services/send_mail.php';

        /**
         * data {rs: string, from: string, tel: string, message: string}
         */
        return function(data) {

            var deferred = $q.defer();

            var headers = {'Content-Type': 'application/x-www-form-urlencoded'};
            var xsrf = $.param(data);

            $http({method: 'POST', url: sendMailUrl, data: xsrf, headers: headers})/*.post(sendMailUrl, data*//*, config*//*)*/
                .success(function(data/*, status, headers, config*/) {
                    deferred.resolve({ severite: 'success', message: data });
                })
                .error(function(data, status/*, headers, config*/) {
                    if(status === 400) { // Bad Request
                        deferred.reject({ severite: 'warning', message: data });
                    } else {
                        deferred.notify('Statut : ' + status);
                        deferred.reject({ severite: 'danger', message: data || 'Echec de l\'envoi du message.' });
                    }
                });

            return deferred.promise;
        };

    }])
;