define(['app'], function (app) {
    app.controller('profileController',
        ['$scope', '$http', '$location', '$rootScope','$routeParams','userService','eventService',
        function ($scope, $http, $location,$rootScope ,$routeParams, userService, eventService) {
            //prevent access by unauthorized

            if($rootScope.username == null || !$rootScope.username){
                $location.path('/');
            }
            $scope.userID = $rootScope.userID;

            $scope.profileModes = {
                events:'eventsCase',
                accountInfo:'accountInfoCase'
            };

            $scope.events = [];


            currentDate = new Date();


            userService.getUserProfile(
                $rootScope.userID,
                function(res) {
                    res.data.events.forEach(function (eventID) {
                        eventService.getEvent(
                            eventID,
                            function (res) {
                                current_event = res.data;
                                eventService.getIcon(
                                    res.data.sportType,
                                    function(path) {
                                        res.data.img = path.data;
                                    }
                                );

                                // console.log(event);
                                current_event.startDateTime = new Date(current_event.startDate);
                                current_event.startTime = current_event.startDateTime.toLocaleTimeString();
                                current_event.startDate = current_event.startDateTime.toLocaleDateString();
                                current_event.expired = (current_event.startDateTime - currentDate) < 0;
                                if (current_event.expired) {
                                    // current_event.timeLeft = new Date(current_event.startDateTime - currentDate);
                                    // current_event.timeLeft = current_event.timeLeft.toLocaleTimeString();
                                    current_event.class = "expired-card";
                                } else {
                                    current_event.class = "card";
                                }
                                console.log(event);
                                $scope.events.push(current_event);
                                $scope.events.sort(function (event1, event2) {
                                    return event2.startDateTime -
                                                event1.startDateTime;
                                });
                            }
                        );
                    });

                },
                function(res) {
                    console.log(res.data.msg[0]);
                }
            );

            $scope.showEvents = function(){
                $scope.activeView = $scope.profileModes.events;
                $scope.eventsSidebarSelect = "selected";
                $scope.messagesSidebarSelect =$scope.accountSidebarSelect = $scope.statsSidebarSelect = "unselected";

            };
            $scope.showAccount = function(){
                $scope.activeView = $scope.profileModes.accountInfo;
                $scope.accountSidebarSelect = "selected";
                $scope.messagesSidebarSelect =$scope.statsSidebarSelect = $scope.eventsSidebarSelect = "unselected";

            };


            $scope.checkOrganizerClass = function(organizerID) {
                if(organizerID == $rootScope.userID){
                    return "timeline-inverted";
                }
                else{
                    return "";
                }

            };

            $scope.getEventTextClass = function(event) {
                //console.log(event.organizerID + ' and ' + $rootScope.userID);
                if(event.organizerID == $scope.userID){
                    return "text-primary";
                }
                if(event.organizerID == $scope.userID){
                    return "text-warning";
                }
            };


            //initialize view
            $scope.showEvents();

            $scope.viewEvent = function (event) {
                console.log(event._id);
                $location.path("/viewEvent/" + event._id);
            };

        }]);
});
