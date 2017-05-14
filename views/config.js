// This is the config file used to import script using
// require js
requirejs.config({
    baseUrl: "",
    paths: {
        'angular': "//ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.min",
        'angular-route': "//ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-route",
        'angular-resource': "//ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-resource.min",
        'angular-filter': "//cdnjs.cloudflare.com/ajax/libs/angular-filter/0.5.15/angular-filter",
        'jQuery': "//ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min",
        'bootstrap': "//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min",
        'angularAMD':"//cdn.jsdelivr.net/angular.amd/0.2/angularAMD.min",
        'ngMaterial': "//ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min",
        'angular-animate': "//ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-animate.min",
        'angular-aria': "//ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-aria.min",
        'angular-ui' : "//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/1.3.3/ui-bootstrap-tpls",
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
        'angular-aria': ['angular'],
        'fb-sdk': [{exports: 'FB'}]
    },
    deps: ['app']
});
