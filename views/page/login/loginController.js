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
            // Should not be return to login and signUp anymore
            if ($scope.ret === '/login' || $scope.ret === '/signup') {
                $scope.ret = '/';
            }
            $scope.successCallback = function(res){
                // Go back to the page you were on after logging in, or home
                // page if you are not from any page
                adminService.getAdmin(function(){
                    $location.path($scope.ret);
                });
            };
            $scope.failureCallback = function(res) {
                // Update the error message to show on the page if login failed
                $scope.errMsg = res.data.msg[0];
            };
            $scope.logIn = adminService.logIn;
        }]);
});
