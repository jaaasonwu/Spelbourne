define(['app'], function (app) {
    app.controller('createEventController', ['$scope', '$http', '$location', '$rootScope', 'adminService', 'eventService',
    function($scope, $http , $location, $rootScope, adminService, eventService) {
        // Check if the user is authenticated
        if ($rootScope.username === undefined) {
            $location.path('/login').search({ret: '/createEvent'});
        }

        var convertUTCDateToLocalDate = function (date) {
            var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

            var offset = date.getTimezoneOffset() / 60;
            var hours = date.getHours();

            newDate.setHours(hours - offset);

            return newDate;
        }

        var convertLocalDateToUTC = function (date) {
            var newDate = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
            return newDate;
        }

        var generate_time_step = function (step) {
            var dt = convertUTCDateToLocalDate(new Date(1970, 0, 1, 0, 0, 0, 0));
            date = [];
            for (i = 0; i < 12; i++) {
                var point = dt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                date.push(point);
                dt.setMinutes(dt.getMinutes() + step);
            }
            return date;
        };

        // These are mock data, will qurey from the server in the future
        $scope.sportsCategory = [
            "Tennis",
            "Swimming",
            "Soccer",
            "Basketball",
            "Golf",
            "Running"
        ];

        // Different skill levels
        $scope.skillLevels = [
            "Any",
            "Starter",
            "Intermediate",
            "Master"
        ];
        // configuration for date picker
        $scope.format = ["dd-MM-yyyy","dd/MM/yyyy"];
        $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        $scope.dp = {
            opened: false,
            click: function(){
                this.opened = !this.opened;
            }
        };
        $scope.startTime = generate_time_step(30);

        $scope.duration = ["30 min", "60 min", "90 min", "120 min"];

        $scope.data = {
            location: "",
            description: "",
            startDate: new Date(),
            startTime: $scope.startTime[0],
            duration: $scope.duration[0],
            visibility: "Friends",
            sportType: $scope.sportsCategory[0],
            skillLevel: $scope.skillLevels[0],
            maxParticipant: "2"
        };

        $scope.formValidate = function(isValid){
            if($scope.createEventForm.$valid){
                $scope.createEvent();
                alert('Event Created');
            }
            else{
                alert('Complete form before submission');
            }


        };

        $scope.locationValidation = function(){
            if (!$scope.data.location || locationInputText != locationInput.value) {
                $scope.createEventForm.$locationInvalid = true;
                $scope.data.location = '';
                return false;
            } else {
                return true;
            }
        }
        $scope.createEvent = function () {
            // Validate the location input
            if (!$scope.locationValidation()) {
                return;
            }
            // Clone the data
            var clone_data = JSON.parse(JSON.stringify($scope.data));

            // Convert duration to seconds
            console.log(clone_data.startDate);
            clone_data.startDate = convertLocalDateToUTC($scope.data.startDate)
            clone_data.duration = parseInt(clone_data.duration.split(" ")[0]) * 60;
            clone_data = JSON.stringify(clone_data);
            eventService.createEvent(
                clone_data,
                function (res) {
                    $location.path('/');
                },
                function (res) {
                    if (res.data && res.data.msg && res.data.msg === '401') {
                        // the user need to login again
                        adminService.getAdmin();
                        $location.path('/login').search({ret: '/createEvent'});
                    }
                }
            )
        };

        var mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(-37.7964, 144.9612),
            mapTypeId: 'roadmap'
        }

        let map = new google.maps.Map(document.getElementById('map'), mapOptions);
        let locationInput = document.getElementById('locationInput');
        let locationInputText = locationInput.value;
        let search = new google.maps.places.SearchBox(document.getElementById('locationInput'));
        search.addListener('places_changed', function() {
            let places = search.getPlaces();

            if (places.length == 0) {
                return;
            }
            let markers = [];

            // Clear out the old markers.
            markers.forEach(function(marker) {
                marker.setMap(null);
            });

            // For each place, get the icon, name and location.
            let bounds = new google.maps.LatLngBounds();
            places.forEach(function(place) {
                if (!place.geometry) {
                    console.log("Returned place contains no geometry");
                    return;
                }
                let icon = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };

                // Create a marker for each place.
                markers.push(new google.maps.Marker({
                    map: map,
                    icon: icon,
                    title: place.name,
                    position: place.geometry.location
                }));
                $scope.data.location = place.name;
                $scope.data.locationId = place.place_id;
                locationInputText = locationInput.value;
                $scope.createEventForm.$locationInvalid = false;
                $scope.$apply();
                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            map.fitBounds(bounds);
        });
    }]);
});
