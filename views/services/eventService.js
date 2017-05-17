define(['angularAMD'], function () {
    var app = angular.module('eventService', []);
    app.service('eventService', ['$http', '$location', '$window',
                function ($http, $location, $window) {
        var getEvent = function (eventID, success, failure) {
            $http.get('/event/getEvent/' + eventID).then(
                success,
                failure
            );
        };

        var getIcon = function (sportType, success, failure) {
            $http.get('/icon/' + sportType).then(
                success,
                failure
            );
        };

        var getEventList = function (success, failure, numEvents) {
            var query;
            numEvents == undefined ? query = '' : query = '?numEvents=' + numEvents;
            $http.get('/event/getEventList' + query).then(
                success,
                failure
            );
        };

        var joinEvent = function (data, success, failure) {
            $http.post('/event/joinEvent', data)
            .then(
                success,
                failure
            );
        };

        var createEvent = function(data, success, failure) {
            $http.post('/event/createEvent', data).then(
                success,
                failure
            );
        };
        var deleteEvent = function(eventID, success,failure) {
            $http.get('/event/deleteEvent/' + eventID).then(
                success,
                failure
            );
        };
        return {
            getEvent: getEvent,
            getIcon: getIcon,
            getEventList: getEventList,
            joinEvent: joinEvent,
            createEvent: createEvent,
            deleteEvent: deleteEvent
        }
    }])
});
