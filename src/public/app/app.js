angular.module('lsync', [
  'ui.router'
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
