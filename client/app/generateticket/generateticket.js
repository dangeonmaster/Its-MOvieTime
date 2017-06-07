'use strict';

angular.module('yeomanApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/generateticket', {
        template: '<generateticket></generateticket>'
      });
  });
