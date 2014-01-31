/*global $:false */ /*http://stackoverflow.com/questions/8852765/jshint-strict-mode-and-jquery-is-not-defined*/
'use strict';

angular.module('lardoisienneApp')
    .factory('SendMailService', function($q, $http) {
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

    })
    .factory('GalerieService', function($q, $http, galerieMapUrl) {
        var cachedPromiseGalerie;

        var loadGalerie = function() {

            var deferred = $q.defer();

            $http.get(galerieMapUrl)
                .success(function(galerie/*, status, headers, config*/) {
                    deferred.resolve(galerie);
                })
                .error(function(data, status/*, headers, config*/) {
                    console.log('Echec chargement galerie: ' + status + ' - ' + data);

                    deferred.reject('Echec chargement galerie: ' + status + ' - ' + data);
                });

            return deferred.promise;
        };

        var filtreParTheme = function(galerie, theme) {
            var result;
            if(theme && galerie[theme]) {
                result = galerie[theme];
            } else {
                // Toute la galerie
                result = [];
                angular.forEach(galerie, function (clichesTheme/*, key*/) {
                    result.push(clichesTheme);
                });
            }
            return result;
        };

        return function(theme) {
            if(!cachedPromiseGalerie) {
                cachedPromiseGalerie = loadGalerie();
            }
            return cachedPromiseGalerie.then(function(galerie) {
                return filtreParTheme(galerie, theme);
            });
        };
    })
;