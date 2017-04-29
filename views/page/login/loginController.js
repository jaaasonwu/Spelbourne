define(['app'], function (app) {
    app.controller('loginController', ['$scope', '$http', '$location','$rootScope', 'adminService', '$routeParams',
        function ($scope, $http, $location, adminService, $routeParams, $rootScope) {
            // you can't go to login page or sign up page once you logged in
            if ($rootScope.username){
                $location.path('/');
            }

            $scope.ret = $routeParams.ret || '/';
            $scope.logIn = function () {
                console.log('clicked');
                $http.post('/auth/login', {email: $scope.email, password: $scope.password})
                    .then(
                        // success callback
                        function (res) {
                            console.log(res);
                            adminService.getAdmin(function(){
                                $location.path($scope.ret);
                            });
                        },
                        // failure callback
                        function (res) {
                            $scope.errMsg = res.data.msg[0];
                        }
                    )
            };
        }]);
});
