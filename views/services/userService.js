define(['angularAMD'], function () {
    var app = angular.module('userService', []);
    app.service('userService', ['$http', '$location', '$window',
                function ($http, $location, $window) {

        // var getUserProfile() 

        return {
            signup: signup
        }
    }])
});
