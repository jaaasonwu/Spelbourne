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
                //Success callback
                function(res) {
                    $scope.events = [];
                    // Get the events that the user joined
                    res.data.events.forEach(function (eventID) {
                        eventService.getEvent(
                            eventID,
                            function (res) {
                                // Set the icon path of the event
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
                // Failure callback
                function(res) {
                    console.log(res.data.msg[0]);
                }
            );
            $scope.eventsMessage = "";
            // The function to go back to home page
            $scope.home = function(){
                $location.path('/');
            }

            // The function to go to an event detail page
            $scope.viewEvent = function (event) {
                $location.path("/viewEvent/" + event._id);
            };

        }]);
});
