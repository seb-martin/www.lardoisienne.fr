/*global $:false, Firebase:false, FirebaseSimpleLogin:false */
/*http://stackoverflow.com/questions/8852765/jshint-strict-mode-and-jquery-is-not-defined*/
'use strict';

angular.module('lardoisienneApp')
    .constant('firebaseContext', {location: 'https://lardoisienne.firebaseio.com'})

    .constant('api500pxContext', {
        location: 'https://api.500px.com/v1',
        endpoints: {
            photo: {
                path: '/photos/:photoId/:command',
                paramsDefault: {
                    'consumer_key': 'c3tGzQCO86xaC09ljTCV8hm4oNO0zeV0EojqTYIT',
                    'username': 'sebmartin94',
                    'feature': 'user'
                },
                actions:{
                    query:{method: 'GET', params:{sort:'created_at', 'image_size':3}, isArray:false}
                }
            }
        }
    })

    .factory('firebase', ['$firebase', 'firebaseContext', function($firebase, firebaseContext) {
        var ref = new Firebase(firebaseContext.location);
        return $firebase(ref);
    }])

    .factory('api500px', ['$resource', 'api500pxContext', function($resource, api500pxContext) {
        var photoEndpoint = $resource(
            api500pxContext.location + api500pxContext.endpoints.photo.path,
            api500pxContext.endpoints.photo.paramsDefault,
            api500pxContext.endpoints.photo.actions
        );

        return {
            photos: photoEndpoint
        };
    } ])

    .factory('AuthService', ['$rootScope', 'firebaseLocation', function($rootScope, firebaseLocation) {
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

        var auth = new FirebaseSimpleLogin(new Firebase(firebaseLocation), function (error, user) {
            if (error) {
                // an error occurred while attempting login
                data.loginFail = error;
                $rootScope.$broadcast('auth:loginFail', error);
            } else if (user) {
                // user authenticated with Firebase
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
    .factory('GalerieService', ['firebase', function(firebase) {
        return function(theme) {
            var result;
            var query = '/galerie';
            if(theme) {
                query += '/' + theme;
                result = firebase.$child(query);
            } else {
                var galerie = firebase.$child(query);
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
                });

            return deferred.promise;
        };

    }])
;