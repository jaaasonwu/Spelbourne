define(['app'], function (app) {
    app.controller('resultController', ['$scope', '$http', '$location',
        function ($scope, $http, $location, eventService) {
            // configuration for date picker
            $scope.format = ["dd-MM-yyyy","dd/MM/yyyy"];
            //default date
            $scope.dateSelect = new Date();
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

            // What sports type we have
            $scope.types = [
                "Tennis",
                "Basketball",
                "Soccer",
                "Golf",
                "Swimming",
                "Running"
            ];
            // Default is none
            $scope.typeSelect = $scope.types[0];

            // Default is any
            $scope.skillSelect = "Any";

            // Different skill levels
            $scope.skills = [
                "Any",
                "Starter",
                "Intermediate",
                "Master"
            ];


            $scope.events = $http.get('/event/getEventList').then(
                // success callback
                function (res) {
                    $scope.eventList = res.data;
                    $scope.eventList.forEach(function(event) {
                        $http.get('/icon/' + event.sportType).then(
                            function(path) {
                                event.img = path.data;
                            }
                        )
                    })
                },
                // failure callback
                function (res) {
                    console.log(res.data.msg[0]);
                }
            );

            $scope.viewEvent = function (event) {
                console.log(event._id);

                $location.path("/viewEvent/" + event._id);
            };

            $scope.joinEvent = function (event) {
                // Clone the data
                var data = {"eventID": event._id}
                console.log(data);

                $http.post('/event/joinEvent', data)
                .then(
                    // success callback
                    function (res) {
                        console.log("SUCCESS");
                    },
                    // failure callback
                    function (res) {
                        console.log(res);
                    }
                );
            };
        }]);
});
