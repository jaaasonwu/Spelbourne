/**
 * Created by zhai7 on 3/26/2017.
 */
angular.module('mainApp').controller('resultController', ['$scope', '$http', function($scope, $http) {
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
    ]
}]);
