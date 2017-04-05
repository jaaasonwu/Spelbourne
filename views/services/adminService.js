define(['angularAMD'], function() {
    var app = angular.module('adminService',[]);
    app.service('adminService', ['$rootScope','$http',function($rootScope, $http) {
        var getAdmin = function() {
            $http.get('/auth/admin')
                .then(
                    // success callback
                    function(res){
                        console.log(res.data);
                        if (res.data.loggedIn){
                            $rootScope.username = res.data.user.local.email;
                        } else {
                            $rootScope.username = undefined;
                        }
                    },
                    // failure callback
                    function(res){
                        console.log('get /auth/admin failure');
                        console.log(res.data);
                    }
                );
        };

        var logOut = function() {
            $http.get('/auth/logout')
                .then(
                    // success callback
                    function(res) {
                        console.log('logout success');
                        getAdmin();
                    },
                    // failure callback
                    function(res) {
                        console.log('logout failure');
                    }
                )
        };
        return {
            getAdmin : getAdmin,
            logOut : logOut
        }
    }])
});
