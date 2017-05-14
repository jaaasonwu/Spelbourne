define(['app'], function (app) {
    app.controller('profileController',
        ['$scope', '$http', '$location', '$rootScope','$routeParams','userService','eventService',
        function ($scope, $http, $location,$rootScope ,$routeParams, userService, eventService) {
            //prevent access by unauthorized

            if($rootScope.username == null || !$rootScope.username){
                $location.path('/');
            }
            $scope.userID = $rootScope.userID;
            //fetch profile info
            angular.element(document).ready(
                function () {

            });
            $scope.profileModes = {events:'eventsCase',stats:'statsCase',
                accountInfo:'accountInfoCase',messages:'messagesCase'};
            $scope.eventModes = {grid:'grid',timeline:'timeline'};
            $scope.events = [];
            $scope.eventCount = 0;

            userService.getUserProfile(
                $rootScope.userID,
                function(res) {
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
            console.log($scope.events);
            $scope.eventsMessage = "";
            //additional info input
            $scope.profileInfo = {
                name: "",
                img: "",
                phoneNumber: ""
            };
            $scope.phonePattern = '/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$';
            $scope.buttons = {
                showCompleteProfileOption: true,
                showCancelProfileOption:false,
                showSubmitOption:false
            };
            $scope.forms ={showAdditionalInfoForm: false};
            $scope.addProfileDetails = function(){
                $scope.forms.showAdditionalInfoForm =true;
                $scope.buttons.showCancelProfileOption = true;
                $scope.buttons.showSubmitOption = true;

            };
            $scope.closeAdditionalForm = function(){
                $scope.forms.showAdditionalInfoForm =false;
                $scope.buttons.showCancelProfileOption = false;
                $scope.buttons.showSubmitOption = false;
            }

            $scope.updateProfileInfo = function(){
                var clone_data = JSON.parse(JSON.stringify($scope.profileInfo));
                console.log(clone_data);
                userService.updateProfileInfo(
                    clone_data,
                    function (res) {
                        console.log(res);
                    },
                    function (res) {
                        if (res.data && res.data.msg && res.data.msg === '401') {
                            // the user need to login again
                            adminService.getAdmin();
                            $location.path('/login').search({ret: '/profile'});
                        }
                    }
                )

            };
            //sidebar Navigation
            $scope.closeAdditionalForm =function(){$scope.forms.showAdditionalInfoForm = false};

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
            $scope.showMessages = function(){
                $scope.activeView = $scope.profileModes.messages;
                $scope.messagesSidebarSelect = "selected";
                $scope.statsSidebarSelect =$scope.accountSidebarSelect = $scope.eventsSidebarSelect = "unselected";

            };
            $scope.showStats = function(){
                $scope.activeView = $scope.profileModes.stats;
                $scope.statsSidebarSelect = "selected"
                $scope.messagesSidebarSelect =$scope.accountSidebarSelect = $scope.eventsSidebarSelect = "unselected";
            };
            $scope.showGrid = function(){
                $scope.eventsView = $scope.eventModes.grid;
                $scope.navTabGrid = "active";
                $scope.navTabTimeline = "link";
            };
            $scope.showTimeline = function(){
                $scope.eventsView = $scope.eventModes.timeline;
                $scope.navTabTimeline = "active";
                $scope.navTabGrid = "link";
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
            $scope.editEvent = function(event){
                $location.path("/createEvent/" + event._id);
            };
            $scope.deleteEvent = function(event){
                eventService.deleteEvent(
                    event._id,
                    function(res){
                        //success
                        console.log(res);
                    },
                    function(res){
                        console.log(res);
                    }

                );
            };
            $scope.removeEvent = function(event){
                $scope.events.pop();
            };
            //initialize view
            $scope.showEvents();
            $scope.showGrid();

            $scope.home = function(){
                $location.path('/');
            }
            $scope.viewEvent = function (event) {
                console.log(event._id);
                $location.path("/viewEvent/" + event._id);
            };

        }]);
});
