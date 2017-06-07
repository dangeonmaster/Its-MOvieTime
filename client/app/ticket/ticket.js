'use strict';

angular.module('yeomanApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/ticket', {
        template: '<ticket></ticket>'
      });
  });
