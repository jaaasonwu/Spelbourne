// This is the config file used to import script using
// require js
requirejs.config({
    baseUrl: "",
    paths: {
        'angular': "/dependency/angular/angular.min",
        'angular-route': "/dependency/angular/angular-route",
        'angular-resource': "/dependency/angular/angular-resource.min",
        'angular-filter': "/dependency/angular/angular-filter",
        'jQuery': "/dependency/jquery/jquery.min",
        'bootstrap': "/dependency/bootstrap/js/bootstrap",
        'angularAMD':"/dependency/angular/angularAMD.min",
        'ngMaterial': "/dependency/angular/angular-material.min",
        'angular-animate': "/dependency/angular/angular-animate.min",
        'angular-aria': "/dependency/angular/angular-aria.min",
        'angular-sanitize': "/dependency/angular/angular-sanitize.min",
        'angular-ui' : "/dependency/angular/ui-bootstrap-tpls-1.3.3",
        'fb-sdk': '//connect.facebook.net/en_US/sdk'
    },
    shim: {
        'angular' : {'exports' : 'angular'},
        'angular-route': ['angular'],
        'angularAMD': ['angular'],
        'angular-resource': ['angular'],
        'angular-filter': ["angular"],
        'angular-ui': ['angular','angular-animate'],
        'bootstrap': ['jQuery'],
        'jQuery': [],
        'ngMaterial': ["angular", 'angular-animate', 'angular-aria'],
        'angular-animate': ['angular'],
        'angular-sanitize': ['angular', 'angular-animate'],
        'angular-aria': ['angular'],
        'fb-sdk': [{exports: 'FB'}]
    },
    deps: ['app']
});
