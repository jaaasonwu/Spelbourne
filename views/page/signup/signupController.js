/**
 * Created by zhai7 on 4/2/2017.
 */
define(['app'], function (app) {
    app.controller('signupController', ['$scope', '$http', '$location', 'adminService',
        function ($scope, $http, $location, adminService) {
            $scope.signUp = function () {
                console.log('clicked');
                $http.post('/signup', {email: $scope.email, password: $scope.password})
                    .then(
                        // success callback
                        function (res) {
                            console.log(res);
                            adminService.getAdmin();
                            location.path('/');
                        },
                        // failure callback
                        function (res) {
                            console.log(res);
                            $scope.errMsg = res.data.msg[0];
                        }
                    )
            }
        }]);
});