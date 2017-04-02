define(['angularAMD'], function(){
    var app = angular.module('adminService',[]);
    app.service('adminService',['$rootScope','$http',function($rootScope, $http){
        var getAdmin = function(){
            $http.get('/auth/admin')
                .then(
                    // success callback
                    function(res){
                        // console.log(res.data);
                        
                    },
                    // failure callback
                    function(res){
                        console.log('get /auth/admin failure');
                        console.log(res.data);
                    }
                );
        };
        return {
            getAdmin : getAdmin
        }
    }])
});