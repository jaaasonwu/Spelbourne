define(['app'], function (app) {
    app.controller("viewEventController", ['$scope', '$http', '$routeParams', 'eventService', 'userService',
                function($scope, $http, $routeParams, eventService, userService) {
        eventID = $routeParams.eventID;

        eventService.getEvent(
            eventID,
            function (res) {
                $scope.event = res.data;
                userService.getUserProfile(
                    $scope.event.organizerID,
                    function (profile) {
                        console.log(profile);
                        $scope.event.organizer = profile.data.email
                    }
                );
                $scope.event.participantsName = [];
                $scope.event.participants.forEach(function(id) {

                    var name = "";
                    userService.getUserProfile(
                        id,
                        function (profile) {
                            console.log(profile);
                            name = profile.data.email;
                            $scope.event.participantsName.push(name);
                        }
                    );
                });

                eventService.getIcon(
                    $scope.event.sportType,
                    function(path) {
                        $scope.event.img = path.data;
                    }
                );
            },
            // failure callback
            function (res) {
                console.log(res);
            }
        );

    }]);
});
