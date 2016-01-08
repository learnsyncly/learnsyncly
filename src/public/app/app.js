//angular dependencies
require('angular');
require('angular-ui-router');
require('./entry/entry.js');
//other dependencies
require('../../../node_modules/socket.io-client/socket.io.js');

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
