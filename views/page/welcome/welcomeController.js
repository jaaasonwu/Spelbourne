define(['app', 'angular-filter'], function (app) {
    // create the controller and inject Angular's $scope
    app.controller('welcomeController', ['$scope', '$http', 'eventService',
            function($scope, $http, eventService) {
        // create a message to display in our view
        $scope.message = 'How are you my friend';


        eventService.getEventList(
            function (res) {
                $scope.events = res.data.slice(0, 6);
                console.log(res.data);
                $scope.events.forEach(function(event) {
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

        $scope.events = [
            {
                sport: "Tennis",
                location: "Melbourne park",
                time: "7 am",
                icon: "images/sportsicon/tennisball.svg"
            },
            {
                sport: "Swimming",
                location: "Melbourne park",
                time: "7 am",
                icon: "images/sportsicon/swimming.svg"

            },
            {
                sport: "Golf",
                location: "Melbourne park",
                time: "7 am",
                icon: "images/sportsicon/golf.svg"
            },
            {
                sport: "Running",
                location: "Melbourne park",
                time: "7 am",
                icon: "images/sportsicon/running.svg"
            },
            {
                sport: "Tennis",
                location: "Melbourne park",
                time: "7 am",
                icon: "images/sportsicon/tennisball.svg"
            },
            {
               sport: "BasketBall",
               location: "Lygon Street",
               time: "8 pm",
               icon: "images/sportsicon/basketball.svg"
           }
        ];
    }]);
});
