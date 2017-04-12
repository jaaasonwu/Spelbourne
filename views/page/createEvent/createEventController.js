define(['app'], function (app) {
    app.controller('createEventController', ['$scope', '$http', '$location',
                    function($scope, $http , $location) {
        // These are mock data, will qurey from the server in the future
        $scope.sportsCategory = [
            "Tennis",
            "Swimming",
            "Soccer",
            "Basketball"
        ];
        $scope.startTime = ["9:00", "9:30", "10:00"];

        $scope.duration = ["30 min", "60 min", "90 min", "120 min"];

        $scope.data = {
            location: "",
            description: "",
            eventDate: "",
            endDate: "",
            visibility: "Friends",
            selectedSport: $scope.sportsCategory[0]
        };


        // Variables to bind to the front end
        $scope.selectedSport = "";
        $scope.selectedStartTime = "";
        $scope.selectedDuration = "";
        $scope.createEvent = function () {
            $http.post('/event/createEvent', $scope.data)
            .then(
                // success callback
                function (res) {
                    $location.path('/');
                },
                // failure callback
                function (res) {
                    console.log(res);
                }
            )
        };

        var mapOptions = {
            zoom: 4,
            center: new google.maps.LatLng(40.0000, -98.0000),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        }

        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    }]);
});
