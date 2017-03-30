define(['angularAMD', 'angular-route', 'jQuery'], function (angularAMD) {
    // create the module and name it scotchApp
    var app = angular.module('mainApp', ['ngRoute']);
    // configure our routes
    app.config(function ($routeProvider, $locationProvider) {
        $routeProvider
            // Router for welcome page
            .when('/', angularAMD.route({
                templateUrl : 'page/welcome/welcome.html',
                controller : 'welcomeController',
                controllerUrl: 'page/welcome/welcomeController'
            }))
            .when('/login', angularAMD.route({
                templateUrl : 'page/login/login.html',
            }))
            .when('/signup', angularAMD.route({
                templateUrl : 'page/signup/signup.html'
            }))
            .when('/result', angularAMD.route({
                templateUrl : 'page/search-result/searchResult.html',
                controller : 'resultController',
                controllerUrl: 'page/search-result/resultController'
            }))
            .when('/event', angularAMD.route({
                templateUrl : 'page/event/event.html',
                controller : 'eventController',
                controllerUrl: 'page/event/eventController'
            }))
            .otherwise({ redirectTo: '/' });

        $locationProvider.html5Mode(true);
    });
    return angularAMD.bootstrap(app);
});
