/*
 * Services for those action related to administration
 */
define(['angularAMD'], function () {
    var app = angular.module('adminService', []);
    app.service('adminService', ['$rootScope', '$http', '$location', '$window',
        function ($rootScope, $http, $location, $window) {
            /**
             * To hit the endpoint /auth/admin to retrieve user's information
             * mainly designed to tell the front end whether the user is logged in
             * it will set the username and userID in the rootScope automatically
             *
             * @param callback(loggedIn, errMsg) a callback with two params, first tell
             * whether the user is logged in, second show the error message if exists
             */
        var getAdmin = function (callback) {
            $http.get('/auth/admin')
                .then(
                    // success callback
                    function (res) {
                        console.log(res.data);
                        if (res.data.loggedIn) {
                            $rootScope.username = res.data.user.email;
                            $rootScope.userID = res.data.user._id;
                            if (callback) {
                                callback(true, null);
                            }
                        } else {
                            $rootScope.username = undefined;
                            $rootScope.userID = undefined;
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

            /**
             * Function used to hit the logout endpoint
             */
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

            /**
             * Function used to let user login with google account
             * @param ret The return redirect url
             */
        var google = function(ret) {
            $window.location.href='/auth/google' + '?ret=' + encodeURIComponent(ret);
        };
            /**
             * Similar to google, let user login with facebook account
             * @param ret
             */
        var facebook = function(ret) {
            $window.location.href='/auth/facebook' + '?ret=' + encodeURIComponent(ret);
        };
            /**
             * used to hit the local signUp endpoint
             */
        var signUp = function(profile, email, password, successCallback, failureCallback) {
            $http.post('/auth/signup', {email: email, password: password, profile: profile})
                .then(
                    // success callback
                    successCallback,
                    // failure callback
                    failureCallback
                )
        };
            /**
             * used to hit the local login endpoint
             */
        var logIn = function(email, password, successCallback, failureCallback) {
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
