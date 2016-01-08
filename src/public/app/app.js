//other dependencies
require('../../../node_modules/socket.io-client/socket.io.js');
//angular dependencies
require('angular');
require('angular-ui-router');
require('./entry/entry.js');

angular.module('lsync', [
  'ui.router',
  'lsync.services'
])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('entry', {
      url: '/',
      templateUrl: '/app/entry.html',
      controller: 'EntryController'
    });
});
