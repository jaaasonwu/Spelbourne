define(['app'], function (app) {
    app.controller('createEventController', ['$scope', '$http', function($scope, $http) {
        // These are mock data, will qurey from the server in the future
        $scope.sportsCategory = [
            "Tennis",
            "Swimming",
            "Soccer",
            "Basketball"
        ];

        $scope.startTime = ["9:00", "9:30", "10:00"];

        $scope.duration = ["30 min", "60 min", "90 min", "120 min"];

        // Variables to bind to the front end
        $scope.selectedSport = ""
        $scope.selectedStartTime = ""
        $scope.selectedDuration = ""

    }]);
});
