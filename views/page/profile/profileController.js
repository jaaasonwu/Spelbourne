define(['app'], function (app) {
    app.controller('profileController',
        ['$scope', '$http', '$location', '$rootScope','$routeParams','userService','eventService', 'adminService',
        function ($scope, $http, $location,$rootScope ,$routeParams, userService, eventService, adminService) {
            //prevent access by unauthorized
            if(!$rootScope.username){
                $location.path('/');
            }
            //fetch profile info


            userService.getUserProfile(
                $rootScope.userID,
                function(res) {
                    $scope.events = [];
                    res.data.events.forEach(function (eventID) {
                        eventService.getEvent(
                            eventID,
                            function (res) {
                                eventService.getIcon(
                                  res.data.sportType,
                                    function(path){
                                        res.data.img = path.data;
                                    }
                                );
                                res.data.formatDate = new Date(res.data.createEventDate).toDateString();
                                $scope.events.push(res.data);

                            }
                        );
                    });
                },
                function(res) {
                    console.log(res.data.msg[0]);
                }
            );
            $scope.eventsMessage = "";
            //console.log($scope.events.toString());
            $scope.home = function(){
                $location.path('/');
            }

            $scope.viewEvent = function (event) {
                console.log(event._id);
                $location.path("/viewEvent/" + event._id);
            };

        }]);
});
