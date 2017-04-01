define(['app', 'angular-filter'], function (app) {
    // create the controller and inject Angular's $scope
    app.controller('welcomeController', ['$scope', '$http', function($scope, $http) {
        // create a message to display in our view
        $scope.message = 'How are you my friend';

        $scope.events = [
            {
                sport: "Tennis",
                location: "Melbourne park",
                time: "7 am"
            },
            {
                sport: "Swimming",
                location: "Melbourne park",
                time: "7 am"
            },
            {
                sport: "Golf",
                location: "Melbourne park",
                time: "7 am"
            },
            {
                sport: "Running",
                location: "Melbourne park",
                time: "7 am"
            },
            {
                sport: "Tennis",
                location: "Melbourne park",
                time: "7 am"
            },
            {
               sport: "BasketBall",
               location: "Lygon Street",
               time: "8 pm"
            }
        ];
    }]);
});
