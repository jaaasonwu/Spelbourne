define(['app', 'angular-filter'], function (app) {
    // create the controller and inject Angular's $scope
    app.controller('welcomeController', ['$scope', '$http', '$location', 'eventService',
            function($scope, $http, $location, eventService) {

        eventService.getEventList(
            function (res) {
                $scope.events = res.data.slice(0, 6);
                console.log(res.data);
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
            function (res) {
                console.log(res.data.msg[0]);
            }
        );

        $scope.viewEvent = function (event) {
            console.log(event._id);

            $location.path("/viewEvent/" + event._id);
        };
    }]);
});
