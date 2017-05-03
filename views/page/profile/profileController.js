define(['app'], function (app) {
    app.controller('profileController',
        ['$scope', '$http', '$location', '$rootScope','$routeParams','userService','eventService', 'adminService',
        function ($scope, $http, $location,$rootScope ,$routeParams, userService, eventService, adminService) {
            console.log($scope.userID);
            userService.getUserProfile(
                $rootScope.userID,
                function(res) {
                    console.log(res.data);
                    $scope.events = [];
                    res.data.events.forEach(function (eventID) {
                        eventService.getEvent(
                            eventID,
                            function (res) {
                                $scope.events.push(res.data);
                            }
                        );
                    });
                },
                function(res) {
                    console.log(res.data.msg[0]);
                }
            );

            $scope.viewEvent = function (event) {
                console.log(event._id);
                $location.path("/viewEvent/" + event._id);
            };

        }]);
});
