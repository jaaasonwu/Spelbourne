define(['app'], function (app) {
    app.controller('signupController', ['$scope', '$http', '$location', 'adminService',
        function ($scope, $http, $location, adminService) {
            $scope.signUp = function () {
                var profile = {
                    phone: "1234",
                    imagePath:"img/",
                    name: "YOLO"
                };
                $http.post('/auth/signup', {email: $scope.email, password: $scope.password, profile: profile})
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
