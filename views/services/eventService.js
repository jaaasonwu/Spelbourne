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

        var getEventList = function (success, failure) {
            $http.get('/event/getEventList').then(
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
        //get my events
        var getMyEvents = function(userID,success,failure){
            $http.get('user/profile/'+ userID).then(
                success,
                failure
            );
        };
        //get my friend
        var createEvent = function(data, success, failure) {
            $http.post('/event/createEvent', data).then(
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
            getMyEvents: getMyEvents
        }
    }])
});
