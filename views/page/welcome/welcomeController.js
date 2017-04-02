define(['app', 'angular-filter'], function (app) {
    // create the controller and inject Angular's $scope
    app.controller('welcomeController', ['$scope', '$http', function($scope, $http) {
        // create a message to display in our view
        $scope.message = 'How are you my friend';

        $scope.events = [
            [{
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
            }],
            [{
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
           }]
        ];
    }]);
});
