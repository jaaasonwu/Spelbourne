var app = angular.module('mainApp');

app.controller('resultController', ['$scope', '$http', '$location', 'eventService', function($scope, $http, $location,  eventService) {
    // create a message to display in our view
    $scope.eventList = [
        {
            img : "/images/tennis.jpg",
            type : "tennis",
            place : "erc",
            desc : "good event",
            skLevel : "master"
        },
        {
            img : "/images/tennis.jpg",
            type : "tennis",
            place : "erc",
            desc : "good event",
            skLevel : "master"
        }
    ];

    $scope.viewEvent = function (event) {
        eventService.setEvent(event);
        $location.path("/event")
    }
}]);
