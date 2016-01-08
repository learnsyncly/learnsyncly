require('angular');
require('angular-ui-router');
require('./entry/entry.js');

angular.module('lsync', [
  'ui.router',
  'lsync.entry'
])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('entry', {
      url: '/',
      templateUrl: 'app/entry/entry.html',
      controller: 'EntryController'
    });
});
