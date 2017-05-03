define(['app'], function (app) {
    app.controller('loginController', ['$scope', '$http', '$location', 'adminService', '$routeParams', '$rootScope',
        function ($scope, $http, $location, adminService, $routeParams, $rootScope) {
            // you can't go to login page or sign up page once you logged in
            if ($rootScope.username){
                $location.path('/');
            }
            $scope.google = adminService.google;
            $scope.facebook = adminService.facebook;

            $scope.ret = $routeParams.ret || '/';
            $scope.successCallback = function(res){
                adminService.getAdmin(function(){
                    $location.path($scope.ret);
                });
            };
            $scope.failureCallback = function(res) {
                $scope.errMsg = res.data.msg[0];
            };
            $scope.logIn = adminService.logIn;
        }]);
});
