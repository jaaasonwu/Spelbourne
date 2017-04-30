define(['app'], function (app) {
    app.controller("viewEventController", ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
        eventID = $routeParams.eventID;

        $http.get('/event/getEvent/' + eventID).then(
            // success callback
            function (res) {
                $scope.event = res.data;
                $http.get('/icon/' + $scope.event.sportType).then(
                    function(path) {
                        $scope.event.img = path.data;
                    }
                )
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
                console.log(res.data.msg[0]);
            }
        );
    }]);
});
