//angular dependencies
require('angular');
require('angular-ui-router');
require('./services.js');
require('./entry/entry.js');
require('./video/video.js');
require('./slide/slide.js');
require('./main/main.js');

//other dependencies
require('../../../node_modules/socket.io-client/socket.io.js');
require('../../../node_modules/jquery/dist/jquery.js');

//LearnSyncly
angular.module('lsync', [
  'ui.router',
  'lsync.services',
  'lsync.entry',
  'lsync.video',
  'lsync.slide',
  'lsync.main'
])
.config(function($stateProvider, $urlRouterProvider) {
  // $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('login', {
      url:'/login',
      templateUrl: 'app/auth/login.html',
      controller: 'AuthController'
    })
    .state('signup', {
      url:'/signup',
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    })
    .state('entry', {
      url: '/',
      templateUrl: 'app/entry/entry.html',
      controller: 'EntryController'
    })
    .state('create', {
      abstract:true,
      url: '/create',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
    })
    .state('create.video', {
      url: '',
      templateUrl: 'app/video/video.html',
      controller: 'VideoController'
    })
    .state('create.slide', {
      url: '',
      templateUrl: 'app/slide/slide.html',
      controller: 'SlideController'
    });
 });
