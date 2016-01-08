//angular dependencies
require('angular');
require('angular-ui-router');
require('./services.js');
require('./entry/entry.js');
require('./video/video.js');
//other dependencies
require('../../../node_modules/socket.io-client/socket.io.js');

angular.module('lsync', [
  'ui.router',
  'lsync.services',
  'lsync.entry',
  'lsync.video'
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
