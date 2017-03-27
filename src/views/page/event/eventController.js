define(['app'], function (app) {
    app.controller('eventController', ['$scope', '$http', 'eventService', function($scope, $http, eventService) {
        $scope.event = eventService.getEvent();
    }]);
});
