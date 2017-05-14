define(['app'], function (app) {
    app.controller("viewEventController", ['$scope', '$location', '$http', '$window', '$routeParams', '$rootScope', 'eventService', 'userService',
                function($scope, $location, $http, $window, $routeParams, $rootScope, eventService, userService) {
        eventID = $routeParams.eventID;
        $scope.error = "";
        $scope.success = "";

        var getEvent = function () {
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
        }

        getEvent();

        $scope.joinEvent = function () {
            // If user is not loggedIn, redirect to the front page
            if ($rootScope.username === undefined) {
                var path = $location.path();
                $location.path('/login').search({ret: path});
            }

            // Clone the data
            var data = {"eventID": eventID}

            eventService.joinEvent(
                data,
                function (res) {
                    getEvent();
                    $scope.success = "You joined the event successfully";
                    $scope.error = "";
                },
                function (res) {
                    $scope.error = res.data;
                }
            );
        };


        FB.init({
            appId      : '1357124691000611',
            xfbml      : true,
            version    : 'v2.4'
        });

        FB.AppEvents.logPageView();

        $scope.fbShare = function () {
            FB.ui({
                method: 'share',
                display: 'popup',
                href: $window.location.href,
            }, function(response){});
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
    }]);
});
