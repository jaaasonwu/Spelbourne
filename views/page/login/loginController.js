define(['app'], function (app) {
    app.controller('loginController', ['$scope', '$http', '$location', 'adminService', '$routeParams',
        function ($scope, $http, $location, adminService, $routeParams) {
            var ret = $routeParams.ret || '/';
            $scope.logIn = function () {
                console.log('clicked');
                $http.post('/auth/login', {email: $scope.email, password: $scope.password})
                    .then(
                        // success callback
                        function (res) {
                            console.log(res);
                            adminService.getAdmin(function(){
                                $location.path(ret);
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
