define(['app'], function (app) {
    app.controller("viewEventController", ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
        eventID = $routeParams.eventID;

        $http.get('/event/getEvent/' + eventID).then(
            // success callback
            function (res) {
                $scope.event = res.data;
                console.log(res.data);
            },
            // failure callback
            function (res) {
                console.log(res.data.msg[0]);
            }
        );

    }]);
});
