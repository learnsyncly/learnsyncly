//angular dependencies
require('angular');
require('angular-ui-router');
require('./services.js');
require('./entry/entry.js');
require('./video/video.js');
require('./slideshow/slideshow.js');

//other dependencies
require('../../../node_modules/socket.io-client/socket.io.js');
require('../../../node_modules/jquery/dist/jquery.js');

angular.module('lsync', [
  'ui.router',
  'lsync.services',
  'lsync.entry',
  'lsync.video',
  'lsync.slideshow'
])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('entry', {
      url: '/',
      templateUrl: 'app/entry/entry.html',
      controller: 'EntryController'
    })
    .state('slideshow', {
      url: '/slideshow',
      templateUrl: 'app/slideshow/slideshow.html',
      controller: 'SlideshowController'
    });
});
