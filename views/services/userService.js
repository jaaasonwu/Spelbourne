/*
 * Services related to user
 */
define(['angularAMD'], function () {
    var app = angular.module('userService', []);
    app.service('userService', ['$rootScope', '$http', '$location', '$window',
                function ($rootScope, $http) {
        var getUserProfile = function (userID, success, failure) {
            $http.get('/user/getUserProfile/' + userID).then(success, failure);
        };

        /**
         * To see whether a user is joined one event, no matter he is creator
         * or participant
         *
         * @param event
         * @returns {boolean}
         */
        var isJoinedEvent = function (event) {
            if (event.organizerID === $rootScope.userID) {
                return true;
            }
            return event.participants.indexOf($rootScope.userID) >= 0;
        }

        var updateProfile = function(data, success, failure) {
            $http.post('/user/updateUserProfile', data).then(
                success,
                failure
            );
        };

        return {
            getUserProfile: getUserProfile,
            isJoinedEvent: isJoinedEvent,
            updateProfile: updateProfile
        }
    }])
});
