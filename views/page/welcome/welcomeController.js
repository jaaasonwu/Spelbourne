define(['app', 'angular-filter'], function (app) {
    // create the controller and inject Angular's $scope
    app.controller('welcomeController', ['$scope', '$http', '$location', 'eventService',
            function($scope, $http, $location, eventService) {

        eventService.getEventList(
            // success callback
            function (res) {
                $scope.events = res.data;
                $scope.events.forEach(function(event) {
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
            },
            // failure callback
            function (res) {
                console.log(res.data.msg[0]);
            },
            6
        );
        $scope.viewEvent = function (event) {
            $location.path("/viewEvent/" + event._id);
        };


    }]);
});
