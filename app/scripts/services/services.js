/*global $:false, Firebase:false, FirebaseSimpleLogin:false */
/*http://stackoverflow.com/questions/8852765/jshint-strict-mode-and-jquery-is-not-defined*/
'use strict';

angular.module('lardoisienneApp')
    .factory('FirebaseRef', ['cloudDataLocation', function(cloudDataLocation) {
        var rootRef = new Firebase(cloudDataLocation);

        return {
            ref: function(path) {
                if(path) {
                    return rootRef.child(path);
                } else {
                    return rootRef;
                }
            }
        };
    }])
    .factory('CloudData', ['$firebase', 'FirebaseRef', function($firebase, FirebaseRef) {

        return function(query) {
            var ref = FirebaseRef.ref(query);
            return $firebase(ref);
        };

    }])
    .factory('AuthService', ['$rootScope', 'FirebaseRef', function($rootScope, FirebaseRef) {
        var data = {
            user: {},
            login: function () {
                delete this.loginFail;
                auth.login('password', this.user);
            },
            logout: function() {
                auth.logout();
            }
        };

        var auth = new FirebaseSimpleLogin(FirebaseRef.ref(), function (error, user) {
            if (error) {
                // an error occurred while attempting login
                console.log(error);
                data.loginFail = error;
                $rootScope.$broadcast('auth:loginFail', error);
            } else if (user) {
                // user authenticated with Firebase
                console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
                data.user = user;
                $rootScope.$broadcast('auth:loginSuccess', user);
            } else {
                // user is logged out
                data.user = {};
                $rootScope.$broadcast('auth:logout');
            }
        });

        return  data;
    }])
    .factory('GalerieService', ['CloudData', function(CloudData) {
        return function(theme) {
            var result;
            var query = '/galerie';
            if(theme) {
                query += '/' + theme;
                result = new CloudData(query);
            } else {
                var galerie = new CloudData(query);
                result = [];
                angular.forEach(galerie, function (clichesTheme) {
                    result.push(clichesTheme);
                });
            }

            return result;
        };
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
                    console.log(data);
                });

            return deferred.promise;
        };

    }])
;