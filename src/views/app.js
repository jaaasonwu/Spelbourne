// create the module and name it scotchApp
var scotchApp = angular.module('mainApp', ['ngRoute', 'angular.filter']);

// configure our routes
scotchApp.config(function ($routeProvider, $locationProvider) {
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
        .otherwise({ redirectTo: '/' });;

    $locationProvider.html5Mode(true);
});
