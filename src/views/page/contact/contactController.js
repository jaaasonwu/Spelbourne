// create the controller and inject Angular's $scope
angular.module('mainApp').controller('contactController', ['$scope', '$http', function($scope, $http) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
}]);
