define(['app', 'angular-filter'], function (app) {
    // create the controller and inject Angular's $scope
    app.controller('welcomeController', ['$scope','$rootScope', '$http', '$location', 'eventService', 'userService',
            function($scope, $rootScope, $http, $location, eventService, userService) {
        var events;
        eventService.getEventList(
            // success callback
            function (res) {
                events = res.data;
                // $scope.events = res.data.slice(0, 6);
                events.forEach(function(event) {
                    startDate = new Date(event.startDate);

                    event.startDate = startDate.toLocaleDateString();
                    event.startTime = startDate.toLocaleTimeString();
                    eventService.getIcon(
                        event.sportType,
                        function(path) {
                            event.img = path.data;
                        }
                    );
                });
                /*
                 * Get the recommendations
                 * For user not logged in, we only the the first 6 events in the databases
                 * For those who logged in, the preferred sports will be in first order
                 */
                if ($rootScope.userID) {
                    userService.getUserProfile($rootScope.userID,
                        // success callback
                        function(res) {
                            var pref = res.data;
                            // if the user has some preference
                            if (pref.interests && pref.interests !== []) {
                                var interested = [];
                                var notInterested = [];
                                // classify the events
                                events.forEach(function(e) {
                                   if (pref.interests.indexOf(e.sportType) > 0) {
                                       interested.push(e);
                                   } else {
                                       notInterested.push(e);
                                   }
                                });
                                // make the event list
                                if (interested.length < 6){
                                    $scope.events = interested.concat(notInterested.slice(start,6 - interested.length));
                                } else {
                                    $scope.events =interested.slice(0,6);
                                }
                            } else {
                                // if no preference
                                $scope.events = events.slice(0,6);
                            }
                        },
                        // failure callback
                        function(res) {
                            console.log(res);
                            $scope.events = events.slice(0,6);
                        }
                    )
                } else {
                    $scope.events = events.slice(0,6);
                }
            },
            // failure callback
            function (res) {
                console.log(res.data.msg[0]);
            }
        );

        $scope.viewEvent = function (event) {
            $location.path("/viewEvent/" + event._id);
        };
    }]);
});
