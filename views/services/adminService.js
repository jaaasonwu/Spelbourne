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

        var google = function(){
            $window.location.href='/auth/google';
        };

        var facebook = function(){
            $window.location.href='/auth/facebook';
        };

        return {
            getAdmin: getAdmin,
            logOut: logOut,
            google: google,
            facebook: facebook
        }
    }])
});
