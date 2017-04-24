define(['app'], function (app) {
    app.controller('createEventController', ['$scope', '$http', '$location', '$rootScope',
    function($scope, $http , $location, $rootScope) {
        // Check if the user is authenticated
        if ($rootScope.username == undefined) {
            $location.path('/login');
        }

        var convertUTCDateToLocalDate = function (date) {
            var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

            var offset = date.getTimezoneOffset() / 60;
            var hours = date.getHours();

            newDate.setHours(hours - offset);

            return newDate;
        }

        var generate_time_step = function (step) {
            var dt = convertUTCDateToLocalDate(new Date(1970, 0, 1, 0, 0, 0, 0));
            date = [];
            for (i = 0; i < 12; i++) {
                var point = dt.toLocaleTimeString('en-US');
                console.log(point);
                console.log(dt);
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
            "Basketball"
        ];


        $scope.myDate = new Date();
        $scope.startTime = generate_time_step(30);
        $scope.skillLevel = [
            'Beginner',
            'Intermediate',
            'Expert'
        ];
        $scope.duration = ["30 min", "60 min", "90 min", "120 min"];

        $scope.data = {
            location: "",
            description: "",
            startDate: new Date(),
            startTime: $scope.startTime[0],
            duration: $scope.duration[0],
            visibility: "Friends",
            sportType: $scope.sportsCategory[0],
            skillLevel: $scope.skillLevel[0]
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
        $scope.createEvent = function () {
            // Clone the data
            var clone_data = JSON.parse(JSON.stringify($scope.data));

            // Convert duration to seconds
            clone_data.duration = parseInt(clone_data.duration.split(" ")[0]) * 60;
            console.log(clone_data);
            clone_data = JSON.stringify(clone_data);
            $http.post('/event/createEvent', clone_data)
            .then(
                // success callback
                function (res) {
                    $location.path('/');
                },
                // failure callback
                function (res) {
                    console.log(res);
                }
            );
        };

        var mapOptions = {
            zoom: 4,
            center: new google.maps.LatLng(40.0000, -98.0000),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        }

            // $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        }]);
    });
