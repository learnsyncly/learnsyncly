angular.module('lsync.services', [])
    .factory('AppState', function(Auth, SlideState, VideoState, UserState, UserState) {
    appState = {};
    appState.slide = SlideState;
    appState.video = VideoState;
    appState.user = UserState;
    appState.socket = SocketState;
    
    //flyout status nested object for easy extending etc
    appState.data = {};
    appState.data.flyoutActive = false;
    appState.data.slideActive = false;

    appState.toggleFlyout = function(){
      appState.data.flyoutActive = !appState.data.flyoutActive;
    };

    appState.toggleSlideView = function(){
      appState.data.slideActive = !appState.data.slideActive;
    };

    //store app state data here
    return appState;
  })
  .factory('Auth', function() {
    //store video state data here
    return {};
  })
  .factory('UserState', function() {
    //store video state data here
    return {};
  })
  .factory('SocketState', function() {
    //store socket state data here
    var socket = {};
    socket.socket = false;
    socket.connect = function () {
      socket.socket = io();
    };
    return {};
  })
  .factory('VideoState', function($rootScope) {
    var video={};
    video.data={
      videoid:'',
      curretTime:0
    };
    video.play = function(){

    };
    video.pause = function(){

    };
    video.seekTo = function(){

    };
    return video;
  })
  .factory('SlideState', function($rootScope, $sce) {
    //initial properties
    var slide = {};

    //data object to help namespace scope when extended on controller
    slide.data = {};

    //test data... TODO:remove later
    slide.data.aspectRatio = 'aspect16-9';
    slide.data.length = 30;
    slide.data.identifier = '1BrXgyVVKE02KvH8AcyHAs8KK-n1_mk3517uI5bXeOvw';

    //methods accessable from SlideState
    slide.setSlide = function(number) {
      if(number > slide.data.length){
        return false;
      }
      slide.data.slideNumber = number;
      slide.data.url = $sce.trustAsResourceUrl(slide.data.baseUrl + slide.data.slideNumber);
      return true;
    };

    slide.next = function() {
      if(slide.data.slideNumber + 1 > slide.data.length){
        return false;
      }
      slide.data.slideNumber ++;
      slide.data.url = $sce.trustAsResourceUrl(slide.data.baseUrl + slide.data.slideNumber);
      return true;
    };

    slide.prev = function() {
      if(slide.data.slideNumber - 1 < 0){
        return false;
      }
      slide.data.slideNumber --;
      slide.data.url = $sce.trustAsResourceUrl(slide.data.baseUrl + slide.data.slideNumber);
      return true;
    };
    
    slide.buildBaseUrl = function(resourceId){
      return 'https://docs.google.com/presentation/d/' + resourceId + '/embed?#slide=';
    };

    slide.init = function(){
      //initial settings on setup
      slide.data.baseUrl = slide.buildBaseUrl(slide.data.identifier);
      slide.data.slideNumber = 0;
      slide.data.url = $sce.trustAsResourceUrl(slide.data.baseUrl + slide.data.slideNumber);
    };


    return slide;
  });
