define(['app'], function (app) {
    app.controller("viewEventController", ['$scope', '$http', '$routeParams', 'eventService',
                function($scope, $http, $routeParams, eventService) {
        eventID = $routeParams.eventID;

        eventService.getEvent(
            eventID,
            function (res) {
                $scope.event = res.data;
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
