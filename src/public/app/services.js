angular.module('lsync.services', [])
  .factory('AppState', function(Auth, SlideState, VideoState, UserState) {
    appState = {};
    appState.slide = SlideState;
    appState.video = VideoState;
    appState.user = UserState;
 

    //flyout status nested object for easy extending etc
    appState.data = {};
    appState.data.flyoutActive = false;
    appState.data.slideActive = false;

    appState.toggleFlyout = function(){
      appState.data.flyoutActive = !appState.data.flyoutActive;
    };

    appState.toggleSlideView = function(){
      appState.data.slideActive = !appState.data.slideActive;
      if(appState.video.data.playing){
        appState.video.pause();
      }else{
        appState.video.play();
      }
    };

    //store app state data here
    return appState;
  })
  .factory('PresentationState', function(AppState){
   presentation={
    timestamps:[15,30,45,60,75,90],
    slides:[1,2,3,4,5,6],
    timeIndex:0;
   };
   presentation.setTimeIndex = function(index){
    presentation.timeIndex=index;
   }
   presentation.checkTime = function(){ 
      if(AppState.video.data.playing){
        if(AppState.video.data.currentTime>=presentation.timestamps(presentation.timeIndex)){
          presentation.timeIndex++;
          AppState.video.pause();
          AppState.toggleSlideView();
          AppState.slide.next();

        }
      }
    };
   setInterval(presentaiton.checkTime, 500);

   return presentation;
  })
  .factory('Auth', function() {
    //store video state data here
    return {};
  })
  .factory('UserState', function() {
    //store video state data here
    return {};
  })
  .factory('VideoState', function($rootScope) {
    var video={};
    video.data={
      videoid:'',
      curretTime:0
    };
    video.playerEvent = function(event){
      var data = Array.prototype.slice.apply(arguments, 1);
      this.$broadcast(event,data);
    };
    video.play = function(){
      video.playerEvent('play');
    };
    video.pause = function(){
      video.playerEvent('pause');
    };
    video.seekTo = function(number){
      video.playerEvent('seekTo', number);
    };
    video.setTime = function(time){
      video.data.curretTime=time;
    };
    return video;
  })
  .factory('SlideState', function($rootScope, $sce, VideoState, PresentationState) {
    //initial properties
    var slide = {};

    //data object to help namespace scope when extended on controller
    slide.data = {};

    //test data... TODO:remove later
    slide.data.aspectRatio = 'aspect16-9';
    slide.data.length = 6;
    slide.data.identifier = '1RXSpyU92LtugPzj9-IUnifwEl7Vy-wOztnsmekNVJ9g';

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
      VideoState.seekTo(PresentationState.presentation.timestamps[slide.data.slideNumber-1]);
      PresentationState.presentation.setTimeIndex(slide.data.slideNumber);
      slide.data.url = $sce.trustAsResourceUrl(slide.data.baseUrl + slide.data.slideNumber);
      return true;
    };

    slide.prev = function() {
      if(slide.data.slideNumber - 1 < 0){
        return false;
      }
      slide.data.slideNumber --;
      VideoState.seekTo(PresentationState.presentation.timestamps[slide.data.slideNumber-1]);
      PresentationState.presentation.setTimeIndex(slide.data.slideNumber);
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
