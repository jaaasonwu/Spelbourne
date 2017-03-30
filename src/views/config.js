// This is the config file used to import script using
// require js
requirejs.config({
    baseUrl: "",
    paths: {
        'angular': "//ajax.googleapis.com/ajax/libs/angularjs/1.6.3/angular.min",
        'angular-route': "//ajax.googleapis.com/ajax/libs/angularjs/1.6.3/angular-route",
        'angular-resource': "//ajax.googleapis.com/ajax/libs/angularjs/1.6.3/angular-resource.min",
        'angular-filter': "//cdnjs.cloudflare.com/ajax/libs/angular-filter/0.5.15/angular-filter",
        'jQuery': "//ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min",
        'bootstrap': "//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min",
        'angularAMD':"//cdn.jsdelivr.net/angular.amd/0.2/angularAMD.min"
    },
    shim: {
        'angular' : {'exports' : 'angular'},
        'angular-route': ['angular'],
        'angularAMD': ['angular'],
        'angular-resource': ['angular'],
        'angular-filter': ["angular"],
        'bootstrap': ['jQuery'],
        'jQuery': []
    },
    deps: ['app']
});
