// create the module and name it scotchApp
var myApp = angular.module('mainApp', ['ngRoute', 'angular.filter']);

// configure our routes
myApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        // Router for welcome page
        .when('/', {
            templateUrl : 'page/welcome/welcome.html',
        })
        // Route for contact page
        .when('/contact', {
            templateUrl : 'page/contact/contact.html',
        })
        .when('/login', {
            templateUrl : 'page/login/login.html',
        })
        .when('/result',{
            templateUrl : 'page/search-result/searchResult.html',
            controller : 'resultController'
        })
        .when('/event',{
            templateUrl : 'page/event/event.html',
            controller : 'eventController'
        })
        .otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode(true);
});
