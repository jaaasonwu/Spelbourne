/**
 * Created by zhai7 on 4/2/2017.
 */
define(['app'],function(app){
    app.controller('loginController', ['$scope','$http', function($scope, $http){
        $scope.logIn = function(){
            console.log('clicked');
            $http.post('/login',{email: $scope.email, password: $scope.password})
                .then(
                    // success callback
                    function(res){
                        console.log(res);
                    },
                    // failure callback
                    function(res){
                        $scope.errMsg = res.data.msg[0];
                    }
                )
        }
    }]);
});