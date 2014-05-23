'use strict';

angular.module('500px', [])
    .constant('api500pxContext', {
        location: 'https://api.500px.com/v1',
        endpoints: {
            photo: {
                path: '/photos/:id/:command',
                paramsDefault: {
                    'consumer_key': 'c3tGzQCO86xaC09ljTCV8hm4oNO0zeV0EojqTYIT',
                    'username': 'sebmartin94',
                    'feature': 'user'
                },
                actions: {
                    query: {method: 'GET', params: {sort: 'created_at', 'image_size': 3}, isArray: false},
                    get: {method: 'GET', params: {'image_size': 4, 'id': '@id'}, isArray: false}
                }
            }
        }
    })
    .factory('api500px', ['$resource', 'api500pxContext', function ($resource, api500pxContext) {
        var photoEndpoint = $resource(
            api500pxContext.location + api500pxContext.endpoints.photo.path,
            api500pxContext.endpoints.photo.paramsDefault,
            api500pxContext.endpoints.photo.actions
        );

        return {
            photos: photoEndpoint
        };
    } ]);
