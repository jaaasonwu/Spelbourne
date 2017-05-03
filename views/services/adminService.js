define(['angularAMD'], function () {
    var app = angular.module('adminService', []);
    app.service('adminService', ['$rootScope', '$http', '$location', '$window',
        function ($rootScope, $http, $location, $window) {
        var getAdmin = function (callback) {
            $http.get('/auth/admin')
                .then(
                    // success callback
                    function (res) {
                        console.log(res.data);
                        if (res.data.loggedIn) {
                            $rootScope.username = res.data.user.email;
                            if (callback) {
                                callback(true, null);
                            }
                        } else {
                            $rootScope.username = undefined;
                            if (callback) {
                                callback(false, null);
                            }
                        }
                    },
                    // failure callback
                    function (res) {
                        console.log('get /auth/admin failure');
                        console.log(res.data);
                        if (callback) {
                            callback(false, "get /auth/admin failure");
                        }
                    }
                );
        };

        var logOut = function () {
            $http.get('/auth/logout')
                .then(
                    // success callback
                    function (res) {
                        console.log('logout success');
                        getAdmin();
                    },
                    // failure callback
                    function (res) {
                        console.log('logout failure');
                    }
                )
        };

        var google = function(ret){
            $window.location.href='/auth/google' + '?ret=' + encodeURIComponent(ret);
        };

        var facebook = function(ret){
            $window.location.href='/auth/facebook' + '?ret=' + encodeURIComponent(ret);
        };

        var signUp = function(profile, email, password, successCallback, failureCallback){
            $http.post('/auth/signup', {email: email, password: password, profile: profile})
                .then(
                    // success callback
                    successCallback,
                    // failure callback
                    failureCallback
                )
        };

        var logIn = function(email, password, successCallback, failureCallback){
            $http.post('/auth/login', {email: email, password: password})
                .then(
                    successCallback,
                    failureCallback
                );
        };

        return {
            getAdmin: getAdmin,
            logOut: logOut,
            google: google,
            facebook: facebook,
            signUp: signUp,
            logIn: logIn
        }
    }])
});
