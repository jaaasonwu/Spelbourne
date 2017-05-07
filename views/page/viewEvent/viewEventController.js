define(['app'], function (app) {
    app.controller("viewEventController", ['$scope', '$http', '$routeParams', 'eventService', 'userService',
                function($scope, $http, $routeParams, eventService, userService) {
        eventID = $routeParams.eventID;

        eventService.getEvent(
            eventID,
            function (res) {
                $scope.event = res.data;
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

                let mapOptions = {
                    zoom: 14,
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
            },
            // failure callback
            function (res) {
                console.log(res);
            }
        );
    }]);
});
