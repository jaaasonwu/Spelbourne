define(['angularAMD', 'angular-route', 'jQuery', 'ngMaterial', 'services/adminService.js'], function (angularAMD) {
    // create the module and name it scotchApp
    var app = angular.module('mainApp', ['ngRoute', 'ngMaterial', 'adminService']);
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
                controller : 'loginController',
                controllerUrl : 'page/login/loginController'
            }))
            .when('/signup', angularAMD.route({
                templateUrl : 'page/signup/signup.html',
                controller : 'signupController',
                controllerUrl : 'page/signup/signupController'
            }))
            .when('/result', angularAMD.route({
                templateUrl : 'page/searchResult/searchResult.html',
                controller : 'resultController',
                controllerUrl: 'page/searchResult/resultController'
            }))
            .when('/viewEvent/:eventID', angularAMD.route({
                templateUrl : 'page/viewEvent/viewEvent.html',
                controller : 'viewEventController',
                controllerUrl: 'page/viewEvent/viewEventController'
            }))
            .when('/createEvent', angularAMD.route({
                templateUrl : 'page/createEvent/createEvent.html',
                controller : 'createEventController',
                controllerUrl: 'page/createEvent/createEventController'
            }))
            .otherwise({ redirectTo: '/' });

        $locationProvider.html5Mode(true);
    })
        // initialize code
        .run(function($rootScope, adminService) {
        adminService.getAdmin();
        $rootScope.logOut = adminService.logOut;
    });
    return angularAMD.bootstrap(app);
});
