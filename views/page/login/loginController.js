define(['app'], function (app) {
    app.controller('loginController', ['$scope', '$http', '$location', 'adminService',
        function ($scope, $http, $location, adminService) {
            $scope.logIn = function () {
                console.log('clicked');
                $http.post('/login', {email: $scope.email, password: $scope.password})
                    .then(
                        // success callback
                        function (res) {
                            console.log(res);
                            adminService.getAdmin();
                            $location.path('/');
                        },
                        // failure callback
                        function (res) {
                            $scope.errMsg = res.data.msg[0];
                        }
                    )
            }
        }]);
});
