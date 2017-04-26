define(['app'], function (app) {
    app.controller('resultController', ['$scope', '$http', '$location', 'eventService',
        function ($scope, $http, $location, eventService) {
            // What sports type we have
            $scope.types = [
                "None",
                "Tennis",
                "Basketball",
                "Soccer"
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


            // create a message to display in our view
            $scope.eventList = [
                {
                    img: "/images/sportsicon/tennisball.svg",
                    type: "Tennis",
                    place: "ERC",
                    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis porttitor lacus, non pulvinar mi. Morbi vestibulum augue in venenatis consectetur. Praesent auctor in libero gravida ultrices. Donec sagittis dapibus iaculis. Duis lectus justo, efficitur et est quis, auctor accumsan sem. Donec gravida risus eget posuere bibendum. Vivamus iaculis tortor diam. Curabitur vitae pharetra dui, sit amet vehicula nulla. Ut dolor dolor, congue quis tincidunt vulputate, luctus sed libero. Morbi viverra purus id auctor dapibus. Duis sem arcu, ultrices sit amet dui ac, eleifend volutpat est. Mauris interdum dolor vel suscipit facilisis. Praesent elementum nunc sed sem iaculis dapibus ut eget dui.",
                    skLevel: "master"
                },
                {
                    img: "/images/sportsicon/football.svg",
                    type: "Soccer",
                    place: "ERC",
                    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis porttitor lacus, non pulvinar mi. Morbi vestibulum augue in venenatis consectetur. Praesent auctor in libero gravida ultrices. Donec sagittis dapibus iaculis. Duis lectus justo, efficitur et est quis, auctor accumsan sem. Donec gravida risus eget posuere bibendum. Vivamus iaculis tortor diam. Curabitur vitae pharetra dui, sit amet vehicula nulla. Ut dolor dolor, congue quis tincidunt vulputate, luctus sed libero. Morbi viverra purus id auctor dapibus. Duis sem arcu, ultrices sit amet dui ac, eleifend volutpat est. Mauris interdum dolor vel suscipit facilisis. Praesent elementum nunc sed sem iaculis dapibus ut eget dui.",
                    skLevel: "master"
                },
                {
                    img: "/images/sportsicon/tennisball.svg",
                    type: "Tennis",
                    place: "ERC",
                    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis porttitor lacus, non pulvinar mi. Morbi vestibulum augue in venenatis consectetur. Praesent auctor in libero gravida ultrices. Donec sagittis dapibus iaculis. Duis lectus justo, efficitur et est quis, auctor accumsan sem. Donec gravida risus eget posuere bibendum. Vivamus iaculis tortor diam. Curabitur vitae pharetra dui, sit amet vehicula nulla. Ut dolor dolor, congue quis tincidunt vulputate, luctus sed libero. Morbi viverra purus id auctor dapibus. Duis sem arcu, ultrices sit amet dui ac, eleifend volutpat est. Mauris interdum dolor vel suscipit facilisis. Praesent elementum nunc sed sem iaculis dapibus ut eget dui.",
                    skLevel: "master"
                }
            ];
            $scope.viewEvent = function (event) {
                eventService.setEvent(event);
                $location.path("/event")
            };
        }]);
});
