define(['angularAMD'], function () {
    var app = angular.module('userService', []);
    app.service('userService', ['$http', '$location', '$window',
        function ($http, $location, $window) {

            var getProfile = function (eventID, success, failure) {
                $http.get('/events/getEvent/' + eventID).then(
                    success,
                    failure
                );
            };

            var getEvent = function (userID, success, failure) {
                console.log("about to run the eventID on the user/route");
                $http.get('/user/profile/' + userID).then(
                    success,
                    failure
                );
            };
            return {
                getProfile: getProfile,
                getEvent: getEvent
            }
        }])
});
