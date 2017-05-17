define(['app'], function (app) {
    app.controller('profileController',
        ['$scope', '$http', '$location', '$rootScope','$routeParams','userService','eventService',
        function ($scope, $http, $location,$rootScope ,$routeParams, userService, eventService) {
            //prevent access by unauthorized

            if($rootScope.username == null || !$rootScope.username){
                $location.path('/');
            }
            angular.element(document).ready(
                function () {
                    $("#interests").select2();
                    $("#regions").select2();
                });
            $
            $scope.userID = $rootScope.userID;

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

            $scope.interests;
            $scope.events = [];
            $scope.userData = [];
            $scope.eventCount = 0;
            $scope.getProfileData = function(){
                userService.getUserProfile(
                    $rootScope.userID,
                    function(res) {
                        $scope.userData.push(res.data);
                        $scope.eventCount = res.data.events.length;
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
            };
            $scope.getProfileData();
            $scope.userProfile = $scope.userData[0];
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
            $scope.deleteEvent = function(event){
                confirm('Deleting event');
                eventService.deleteEvent(event._id,
                    function (res) {
                        console.log(res);
                    },
                    function (res) {
                        console.log(res);
                    }
                );

            };
            $scope.updateProfile = function(){
                var clone_data = JSON.stringify($scope.userData);
                console.log(clone_data);
                userService.updateProfile(clone_data,
                    function(res){
                        console.log("succesfully updated profile")
                    },
                    function(res){
                        console.log("error in profile update");
                    }
                );

            };
            $scope.viewEvent = function (event) {
                console.log(event._id);
                $location.path("/viewEvent/" + event._id);
            };

        }]);
});
