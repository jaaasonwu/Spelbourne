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
            zoom: 14,
            center: new google.maps.LatLng(-37.7964, 144.9612),
            mapTypeId: 'roadmap'
        }

        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        $scope.search = new google.maps.places.SearchBox(document.getElementById('locationInput'));
        $scope.search.addListener('places_changed', function() {
            var places = $scope.search.getPlaces();

            if (places.length == 0) {
                return;
            }
            var markers = [];

            // Clear out the old markers.
            markers.forEach(function(marker) {
                marker.setMap(null);
            });

            // For each place, get the icon, name and location.
            var bounds = new google.maps.LatLngBounds();
            places.forEach(function(place) {
                if (!place.geometry) {
                    console.log("Returned place contains no geometry");
                    return;
                }
                var icon = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };

                // Create a marker for each place.
                markers.push(new google.maps.Marker({
                    map: $scope.map,
                    icon: icon,
                    title: place.name,
                    position: place.geometry.location
                }));

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            $scope.map.fitBounds(bounds);
        });
    }]);
});
