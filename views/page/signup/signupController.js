define(['app'], function (app) {
    app.controller('signupController', ['$scope', '$http', '$location', 'adminService', '$routeParams', '$rootScope',
        function ($scope, $http, $location, adminService, $routeParams, $rootScope) {
            // you can't go to login page or sign up page once you logged in
            if ($rootScope.username){
                $location.path('/');
            }
            $scope.ret = $routeParams.ret || '/';
            $scope.signUp = function () {
                var profile = {
                    phone: "1234",
                    imagePath:"img/",
                    name: "YOLO"
                };

                adminService.signup(
                    {email: $scope.email, password: $scope.password, profile: profile},
                    function (res) {
                        console.log(res);
                        adminService.getAdmin(function(){
                            $location.path($scope.ret);
                        });
                    },
                    function (res) {
                        $scope.errMsg = res.data.msg[0];
                    }
                );
            }
        }]
    );
});
