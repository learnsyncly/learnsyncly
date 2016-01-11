//require statements are loaded via browserify
//if browserify doesn't support a file, load it with file path
//angular dependencies
require('angular');
require('angular-ui-router');
require('./auth/auth.js');
require('./create/create.js');
require('./main/main.js');
require('./main/container/container.js');
require('./main/container/slide/slide.js');
// require('./main/container/video/video.js');
require('./main/flyout/flyout.js');
require('./main/toolbar/toolbar.js');
require('./services.js');
//TODO: swap item with new path above
require('./video/video.js');

//other dependencies
require('../../../node_modules/socket.io-client/socket.io.js');
require('../../../node_modules/jquery/dist/jquery.js');

//LearnSyncly
angular.module('lsync', [
  'ui.router',
  'lsync.auth',
  'lsync.create',
  'lsync.main',
  'lsync.container',
  'lsync.flyout',
  'lsync.slide',
  'lsync.services',
  'lsync.toolbar'
])
.config(function($stateProvider, $urlRouterProvider) {
  // $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('login', {
      url:'/login',
      templateUrl: 'app/auth/login.html',
      controller: 'AuthController'
    })
    .state('register', {
      url:'/register',
      templateUrl: 'app/auth/register.html',
      controller: 'AuthController'
    })
    .state('create', {
      abstract:true,
      url: '/create',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
    })
    .state('create.video', {
      url: '',
      //TODO: update me later
      // templateUrl: 'app/main/container/video/video.html',
      templateUrl: 'app/video/video.html',
      controller: 'VideoController'
    })
    .state('create.slide', {
      url: '',
      templateUrl: 'app/main/container/slide/slide.html',
      controller: 'SlideController'
    })





    ////TODO REMOVE ONCE ROUTES ARE WORKING!
    .state('slide', {
      url: '/slide',
      templateUrl: 'app/main/container/slide/slide.html',
      controller: 'SlideController'
    });
 });
