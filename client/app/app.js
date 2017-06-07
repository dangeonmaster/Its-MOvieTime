'use strict';

angular.module('yeomanApp', ['yeomanApp.auth', 'yeomanApp.admin', 'yeomanApp.constants',
    'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute', 'btford.socket-io', 'validation.match',
    'ui.filters', '720kb.datepicker'
  ])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
  });
