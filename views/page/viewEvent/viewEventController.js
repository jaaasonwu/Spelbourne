define(['app'], function (app) {
    app.controller("viewEventController", ['$scope', '$http', '$window', '$routeParams', 'eventService', 'userService',
                function($scope, $http, $window, $routeParams, eventService, userService) {
        eventID = $routeParams.eventID;

        $scope.joinEvent = function () {
            // Clone the data
            var data = {"eventID": eventID}
            console.log(data);

            eventService.joinEvent(
                data,
                function (res) {
                    $window.location.href = "/viewEvent/" + eventID;
                },
                function (res) {
                    $window.location.href = "/viewEvent/" + eventID;
                }
            );
        };

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

                startDate = new Date($scope.event.startDate);

                $scope.event.startDate = startDate.toLocaleDateString();
                $scope.event.startTime = startDate.toLocaleTimeString();
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
                )
                renderMap();
            },
            // failure callback
            function (res) {
                console.log(res);
            }
        );

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
    }]);
});
