define(['app'], function (app) {
    app.controller('profileController',
        ['$scope', '$http', '$location', '$routeParams','userService','eventService', 'adminService',
        function ($scope, $http, $location, $routeParams, userService, eventService, adminService) {
            // configuration for date picker
            $scope.format = ["dd-MM-yyyy", "dd/MM/yyyy"];
            //default date
            $scope.dateSelect = new Date();
            $scope.dateOptions = {
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1
            };

            $scope.dp = {
                opened: false,
                click: function () {
                    this.opened = !this.opened;
                }
            };
            $scope.myEvents = eventService.get
            var eventID = '5905782097017286ed070904';
            $scope.subscribedEvents = [{
                sportType : "Tennis",
                duration : 1800,
                startTime : "10:00:00 AM",
                skillLevel : "Any",
                startDate : "2017-05-03T03:05:39.060Z",
                description : "kip44shareds natural event  3",
                location : "PARK Hendrik Potgieter Rd",
                participants : [
                    "5909489c112c0e2e2e934cea",
                    "5909533b015aa0316fb56d6b"
                ]
            },
                {
                    sportType : "Swimming",
                    duration : 1800,
                    startTime : "10:00:00 AM",
                    skillLevel : "Any",
                    startDate : "2017-05-03T03:18:38.728Z",
                    description : "kkalyas created event",
                    location : "PARK Northdene St",
                    participants : [
                        "590948a4112c0e2e2e934cec",
                        "590952f492ad60305495ff68",
                        "5909533b015aa0316fb56d6b"
                    ]
                },
                {
                    sportType : "Tennis",
                    duration : 1800,
                    startTime : "10:00:00 AM",
                    skillLevel : "Any",
                    startDate : "2017-05-03T03:42:59.891Z",
                    description : "something or other",
                    location : "Park Avenue",
                    participants : [
                        "590948a4112c0e2e2e934cec",
                        "590952f492ad60305495ff68",
                        "5909533b015aa0316fb56d6b"
                    ]
                }
            ];
            $scope.organisedEvents = [{
                sportType : "Tennis",
                duration : 1800,
                startTime : "10:00:00 AM",
                skillLevel : "Any",
                startDate : "2017-05-03T03:05:39.060Z",
                description : "kip44shareds natural event  3",
                location : "PARK Hendrik Potgieter Rd",
                participants : [
                    "5909489c112c0e2e2e934cea",
                    "5909533b015aa0316fb56d6b"
                ]
            },
            {
                sportType : "Swimming",
                duration : 1800,
                startTime : "10:00:00 AM",
                skillLevel : "Any",
                organizerID : "59094992e6b6742e5f62fcd3",
                startDate : "2017-05-03T03:18:38.728Z",
                description : "kkalyas created event",
                location : "PARK Northdene St",
                participants : [
                "590948a4112c0e2e2e934cec",
                "590952f492ad60305495ff68",
                "5909533b015aa0316fb56d6b"
                ]
            },
            {
                sportType : "Tennis",
                duration : 1800,
                startTime : "10:00:00 AM",
                skillLevel : "Any",
                organizerID : "59094992e6b6742e5f62fcd3",
                startDate : "2017-05-03T03:42:59.891Z",
                description : "something or other",
                location : "Park Avenue",
                participants : [
                "590948a4112c0e2e2e934cec",
                "590952f492ad60305495ff68",
                "5909533b015aa0316fb56d6b"
                ]
            }];
            $scope.friendsList = [
                {
                    username : "strangeDude",
                    emailAddress: "imsostrange@yahoo.com",
                    events : 0
                },
                {
                    username : "tommikyle",
                    emailAddress : "tomkal@yahoo.com",
                    events : 2
                },
                {
                    username : "kiptenai",
                    emailAddress : "kiptenaikk@gmail.com",
                    events : 10
                }
            ];


            /*userService.getProfile(
                userID,
                function(res){
                    console.log("running in getUserProfile");
                    console.log(res);
                },
                function(res){
                    console.log("error retrieving the data");
                }
            );*/

            /*userService.getUserProfile(
                userID,
                function (res) {
                    $scope.userProfile = res.data;
                    $scope.userEventsList = res.events;
                    console.log($scope.userEventsList);
                },
                function (res) {
                    console.log(res.data.msg[0]);
                }
            );*/
            //retrieve all associated events with the user
            /*eventService.getEventList(
                userID,
                function (res) {
                    $scope.eventList = res.data;
                    $scope.eventList.forEach(function (event) {
                        eventService.getIcon(
                            event.sportType,
                            function (path) {
                                event.img = path.data;
                            }
                        );
                    });
                },
                function (res) {
                    console.log(res.data.msg[0]);
                }
            );
            */
            $scope.viewEvent = function (event) {
                console.log(event._id);

                $location.path("/viewEvent/" + event._id);
            };

        }]);
});
