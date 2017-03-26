var app = angular.module('mainApp');

app.controller('eventController', ['$scope', '$http', 'eventService', function($scope, $http, eventService) {
    $scope.event = eventService.getEvent();
}]);
