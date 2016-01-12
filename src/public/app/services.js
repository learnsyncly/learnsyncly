angular.module('lsync.services', [])
  .factory('AppState', function($interval, Auth, SlideState, VideoState, UserState, SocketState, PresentationState) {

    appState = {};
    appState.slide = SlideState;
    appState.video = VideoState;
    appState.user = UserState;
    appState.socket = SocketState;
    appState.presentation = PresentationState;
    //flyout status nested object for easy extending etc
    appState.data = {};
    appState.data.player = false;
    appState.data.flyoutActive = false;
    appState.data.slideActive = false;

    appState.toggleFlyout = function() {
      appState.data.flyoutActive = !appState.data.flyoutActive;
    };

    appState.toggleSlideView = function() {
      appState.data.slideActive = !appState.data.slideActive;
      if (appState.video.data.playing) {
        appState.video.pause();
      } else {
        appState.video.play();
      }
    };

    appState.setTimeIndex = function(index){
      appState.presentation.data.timeIndex=index;
    };
    appState.checkTime = function(){
      if(appState.video.data.playing){
        if(appState.video.data.currentTime>=appState.presentation.data.slideChanges[appState.presentation.data.timeIndex].timestamp){
          appState.presentation.data.timeIndex++;
          appState.toggleSlideView();
          appState.slide.setSlide(appState.presentation.data.slideChanges[appState.presentation.data.timeIndex].slide);
        }
      }
    };
    setInterval(appState.checkTime, 500);

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
      socket.socket.on('connect', function () {
        console.log('Connected to Server.');
      });
    };
    //socket.connect();
    return socket;
  })
  .factory('VideoState', function($sce) {
    var video = {};
    video.data = {};
    video.data.videoReady = false;
    video.data.playing = false;
    video.data.currentTime = 0;
    video.data.aspectRatio = 'aspect16-9';
    video.data.identifier = 'M7lc1UVf-VE';
    video.data.url = '';

    ytPlayerInit = function(event) {
      video.data.videoReady = true;
      setInterval(updatePlayer, 1000);
    };

    var updatePlayer = function() {
      video.data.currentTime = player.getCurrentTime();
    };

    video.play = function() {
      if (!video.data.videoReady) {
        return false;
      }
      video.data.playing = true;
      player.playVideo();
      return true;
    };

    video.pause = function() {
      if (!video.data.videoReady) {
        return false;
      }
      video.data.playing = false;
      player.pauseVideo();
      return true;
    };

    video.seekTo = function(number) {
      if (typeof number !== 'number' || !video.data.videoReady) {
        return false;
      }
      player.seekTo(number, true);
      return true;
    };

    video.buildUrl = function(resourceId) {
      return 'https://www.youtube.com/embed/' + resourceId + '?enablejsapi=1';
    };

    video.init = function() {
      //initial settings on setup
      var TempUrl = video.buildUrl(video.data.identifier);
      video.data.url = $sce.trustAsResourceUrl(TempUrl);
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
    if (number > slide.data.length) {
      return false;
    }
    slide.data.slideNumber = number;
    slide.data.url = $sce.trustAsResourceUrl(slide.data.baseUrl + slide.data.slideNumber);
    return true;
  };

  slide.next = function() {
    if (slide.data.slideNumber + 1 > slide.data.length) {
      return false;
    }
    slide.data.slideNumber++;
    slide.data.url = $sce.trustAsResourceUrl(slide.data.baseUrl + slide.data.slideNumber);
    return true;
  };

  slide.prev = function() {
    if (slide.data.slideNumber - 1 < 0) {
      return false;
    }
    slide.data.slideNumber--;
    slide.data.url = $sce.trustAsResourceUrl(slide.data.baseUrl + slide.data.slideNumber);
    return true;
  };

  slide.buildBaseUrl = function(resourceId) {
    return 'https://docs.google.com/presentation/d/' + resourceId + '/embed?#slide=';
  };

  slide.init = function() {
    //initial settings on setup
    slide.data.baseUrl = slide.buildBaseUrl(slide.data.identifier);
    slide.data.slideNumber = 0;
    slide.data.url = $sce.trustAsResourceUrl(slide.data.baseUrl + slide.data.slideNumber);
  };

  return slide;
})
.factory('PresentationState', function(){
 presentation={};
 presentation.data={
  slideChanges:[
    {
      timestamp:5,
      slide:1
    },
    {
      timestamp:10,
      slide:3
    },
    {
      timestamp:15,
      slide:5
    },
    {
      timestamp:20,
      slide:6
    },
    {
      timestamp:25,
      slide:2
    },
    {
      timestamp:30,
      slide:8
    },
    {
      timestamp:35,
      slide:4
    },
    {
      timestamp:40,
      slide:5
    },
    {
      timestamp:45,
      slide:25
    }
  ],
  timeIndex:1
 };


 return presentation;
});
