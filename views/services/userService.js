define(['angularAMD'], function () {
    var app = angular.module('userService', []);
    app.service('userService', ['$http', '$location', '$window',
                function ($http, $location, $window) {
        var getUserProfile = function (userID, success, failure) {
            $http.get('/user/getUserProfile/' + userID).then(success, failure);
        }

        return {
            getUserProfile: getUserProfile
        }
    }])
});
