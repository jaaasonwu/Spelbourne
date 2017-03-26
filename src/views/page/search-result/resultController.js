/**
 * Created by zhai7 on 3/26/2017.
 */
angular.module('mainApp').controller('resultController', ['$scope', '$http', function($scope, $http) {
    // What sports type we have
    $scope.types = [
        "none",
        "tennis",
        "basketball",
        "soccer"
    ];
    // Default is none
    $scope.typeSelect = $scope.types[0];

    // Default is any
    $scope.skillSelect = "any";
    // Different skill levels
    $scope.skills = [
        "any",
        "starter",
        "intermediate",
        "master"
    ];


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
            img : "/images/football.jpg",
            type : "soccer",
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
