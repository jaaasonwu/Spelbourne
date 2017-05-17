define(['app'], function (app) {
    app.controller('profileController',
        ['$scope', '$http', '$location', '$rootScope','$routeParams','userService','eventService',
        function ($scope, $http, $location,$rootScope ,$routeParams, userService, eventService) {
            //prevent access by unauthorized

            if ($rootScope.username == null || !$rootScope.username) {
                $location.path('/');
            }

            angular.element(document).ready(
                function () {
                    $("#interests").select2();
                    $("#regions").select2();
                }
            );

            $scope.error = "";
            $scope.success = "";

            $scope.userID = $rootScope.userID;

            // Init user data
            $scope.userData = {
                name: "",
                phone: "",
                interests: []
            }

            $scope.profileModes = {
                events:'eventsCase',
                accountInfo:'accountInfoCase'
            };

            $scope.sports = [
                {"name":"Swimming","code":"Swimming"},
                {"name":"Tennis","code":"Tennis"},
                {"name":"Soccer","code":"Soccer"},
                {"name":"Golf","code":"Golf"},
                {"name":"Basketball","code":"Basketball"},
                {"name":"Running","code":"Running"},
            ]

            $scope.events = [];

            currentDate = new Date();


            userService.getUserProfile(
                $rootScope.userID,
                function(res) {
                    $scope.userData.name = res.data.name;
                    $scope.userData.phone = res.data.phone;
                    $scope.userData.interests = res.data.interests;

                    console.log($scope.userData);
                    console.log(res.data);
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

            $scope.updateProfile = function(){
                var clone_data = JSON.stringify($scope.userData);
                console.log(clone_data);
                userService.updateProfile(clone_data,
                    function(res){
                        $scope.success = "Succesfully updated profile";
                    },
                    function(res){
                        $scope.error = "Error in profile update";
                    }
                );

            };

            $scope.viewEvent = function (event) {
                console.log(event._id);
                $location.path("/viewEvent/" + event._id);
            };

        }]
    );
});
