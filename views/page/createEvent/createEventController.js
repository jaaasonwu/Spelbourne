define(['app'], function (app) {
    app.controller('createEventController', ['$scope', '$http', '$location','$routeParams', '$rootScope', 'adminService', 'eventService','userService',
    function($scope, $http , $location,$routeParams, $rootScope, adminService, eventService,userService) {
        // Check if the user is authenticated
        if ($rootScope.username === undefined) {
            $location.path('/login').search({ret: '/createEvent'});
        }
        $scope.mode = $routeParams.modeID;
        $scope.event = null;
        $scope.eventID = null;
        if($scope.mode != 'new'){
            $scope.eventID = $scope.mode;
            $scope.mode = 'old';
            //fill in form
            eventService.getEvent(
                $scope.eventID,
                function (res) {
                    $scope.event = res.data;
                    if ($rootScope.userID != $scope.event.organizerID) {
                        $location.path('/login');
                    }
                    userService.getUserProfile(
                        $scope.event.organizerID,
                        function (profile) {
                            $scope.event.organizer = profile.data.email
                        }
                    );

                    utcDate = new Date($scope.event.startDate);
                    currentDate = new Date(
                        utcDate.getUTCFullYear(),
                        utcDate.getUTCMonth(),
                        utcDate.getUTCDate()
                    );
                    $scope.event.startDate = currentDate.toLocaleDateString();
                    $scope.event.participantsName = [];
                    $scope.event.participants.forEach(function(id) {
                        var name = "";
                        userService.getUserProfile(
                            id,
                            function (profile) {
                                name = profile.data.email;
                                $scope.event.participantsName.push(name);
                            }
                        );
                    });

                    eventService.getIcon(
                        $scope.event.sportType,
                        function(path) {
                            $scope.event.img = path.data;
                        }
                    );
                    renderMap();
                },
                // failure callback
                function (res) {
                    console.log(res);
                }
            );
        }
        let renderMap = function() {
            let mapOptions = {
                zoom: 15,
                center: new google.maps.LatLng(-37.7964, 144.9612),
                mapTypeId: 'roadmap'
            }
            let map = new google.maps.Map(document.getElementById('map'), mapOptions);
            let infowindow = new google.maps.InfoWindow();
            let service = new google.maps.places.PlacesService(map);
            let geocoder = new google.maps.Geocoder;
            let placeId = $scope.event.locationId;

            geocoder.geocode({'placeId': placeId}, function(results, status) {
                if (status == 'OK') {
                    if (results[0]) {
                        map.setCenter(results[0].geometry.location);
                    }
                }
            })
            service.getDetails({
                placeId: $scope.event.locationId
            }, function(place, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    var marker = new google.maps.Marker({
                        map: map,
                        position: place.geometry.location
                    });
                    google.maps.event.addListener(marker, 'click', function() {
                        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                            place.formatted_address + '</div>');
                        infowindow.open(map, this);
                    });
                }
            });
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

        $scope.duration = ["30 min", "60 min", "90 min", "120 min"];
        if($scope.mode == 'new'){
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
        }


        var defaultStartTime = new Date();
        defaultStartTime.setHours(10);
        defaultStartTime.setMinutes(0);
        defaultStartTime.setSeconds(0);

        $scope.data = {
            location: "",
            description: "",
            startDate: new Date(),
            startTime:  defaultStartTime,
            duration: $scope.duration[0],
            visibility: "Friends",
            sportType: $scope.sportsCategory[0],
            skillLevel: $scope.skillLevels[0],
            maxParticipant: "2"
        };

        $scope.timePicker = {
            hstep: 1,
            mstep: 15,
            ismeridian: true
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

        var genearteStartDate = function (startDate, startTime) {
            hour = startTime.getHours();
            minute = startTime.getMinutes();

            startDate.setHours(hour);
            startDate.setMinutes(minute);
            startDate.setSeconds(0);
            return startDate
        }


        $scope.createEvent = function () {
            // Validate the location input
            if (!$scope.locationValidation()) {
                return;
            }
            // Clone the data
            var clone_data = JSON.parse(JSON.stringify($scope.data));

            // Convert duration to seconds
            clone_data.startDate = genearteStartDate(
                new Date(clone_data.startDate),
                new Date(clone_data.startTime)
            );

            clone_data.duration = parseInt(clone_data.duration.split(" ")[0]) * 60;
            if($scope.mode == 'new'){
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
            }
            else {
                clone_data.eventID = $scope.eventID;
                clone_data = JSON.stringify(clone_data);
                eventService.updateEvent(
                    clone_data,
                    function(res){
                        alert("Successful event update");
                    },
                    function(res){
                        console.log(res);
                    }
                );
            }


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
