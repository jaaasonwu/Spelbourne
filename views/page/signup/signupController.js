define(['app'], function (app) {
    app.controller('signupController', ['$scope', '$http', '$location', 'adminService',
        function ($scope, $http, $location, adminService) {
            $scope.signUp = function () {
                $http.post('/auth/signup', {email: $scope.email, password: $scope.password})
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
        }]
    );
});
