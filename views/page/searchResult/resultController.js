define(['app'], function (app) {
    app.controller('resultController', ['$scope', '$http', '$location', 'eventService',
        function ($scope, $http, $location, eventService) {
            // What sports type we have
            $scope.types = [
                "Tennis",
                "Basketball",
                "Soccer",
                "Golf",
                "Swimming",
                "Running"
            ];
            // Default is none
            $scope.typeSelect = $scope.types[0];

            // Default is any
            $scope.skillSelect = "Any";

            // Different skill levels
            $scope.skills = [
                "Any",
                "Starter",
                "Intermediate",
                "Master"
            ];


            $scope.events = $http.get('/event/getEventList').then(
                // success callback
                function (res) {
                    $scope.eventList = res.data;
                    $scope.eventList.forEach(function(event) {
                        $http.get('/icon/' + event.sportType).then(
                            function(path) {
                                console.log(path.data);
                                event.img = path.data;
                            }
                        )
                    })
                },
                // failure callback
                function (res) {
                    console.log(res.data.msg[0]);
                }
            );

            $scope.viewEvent = function (event) {
                eventService.setEvent(event);
                $location.path("/event")
            };
        }]);
});
