/*global $:false, Firebase:false */
/*http://stackoverflow.com/questions/8852765/jshint-strict-mode-and-jquery-is-not-defined*/
'use strict';

angular.module('lardoisienneApp')
    .factory('CloudData', ['$firebase', 'cloudDataLocation', function($firebase, cloudDataLocation) {

        return function(query) {
            var ref = new Firebase(cloudDataLocation + query);
            return $firebase(ref);
        };

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