define(['angularAMD'], function () {
    var app = angular.module('userService', []);
    app.service('userService', ['$rootScope', '$http', '$location', '$window',
                function ($rootScope, $http, $location, $window) {
        var getUserProfile = function (userID, success, failure) {
            $http.get('/user/getUserProfile/' + userID).then(success, failure);
        }


        var isJoinedEvent = function (event) {
            if (event.organizerID == $rootScope.userID) {
                return true;
            }
            return event.participants.indexOf($rootScope.userID) >= 0;
        }

        return {
            getUserProfile: getUserProfile,
            isJoinedEvent: isJoinedEvent
        }
    }])
});
