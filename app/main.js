requirejs.config({
    baseUrl: './',
    paths: {
        angular: 'vendor/angular/angular.min',
        'angular-route': 'vendor/angular-route/angular-route',
        'angular-ui-router': 'vendor/angular-ui-router/release/angular-ui-router',
        bootstrap: 'vendor/bootstrap/dist/js/bootstrap'
    },
    packages: [

    ],
    shim: {
        'angular-ui-router': {
            deps: [
                'angular',
                'angular-route'
            ]
        },
        'angular-route': {
            deps: [
                'angular'
            ]
        }
    }
});

require([
    'angular',
    'angular-ui-router',
    'angular-route'
], function () {
    require(['app'], function (app) {
        angular.bootstrap(document, [app.name]);
    });

});
