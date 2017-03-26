// create the controller and inject Angular's $scope
angular.module('mainApp').controller('welcomeController', ['$scope', '$http', function($scope, $http) {
    // create a message to display in our view
    $scope.message = 'How are you my friend';
}]);
