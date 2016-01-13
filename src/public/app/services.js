angular.module('lsync.services', [])
  .factory('AppState', function($interval, Auth, SlideState, VideoState, UserState, SocketState, PresState) {

    appState = {};
    appState.slide = SlideState;
    appState.video = VideoState;
    appState.user = UserState;
    appState.socket = SocketState;
    appState.pres = PresState;
    //flyout status nested object for easy extending etc
    appState.data = {};
    appState.data.flyoutActive = false;
    appState.data.slideActive = false;
    appState.data.containerAspect = false;
    appState.data.autoTransition = true;

    appState.init = function() {
      var vidAspect = VideoState.data.aspectRatio;
      var slideAspect = SlideState.data.aspectRatio;
      if (vidAspect === 'aspect4-3' || slideAspect === 'aspect4-3') {
        appState.data.containerAspect = 'aspect4-3';
      } else if (vidAspect === 'aspect16-10' || slideAspect === 'aspect16-10') {
        appState.data.containerAspect = 'aspect16-10';
      } else {
        appState.data.containerAspect = 'aspect16-9';
      }
    };

    appState.toggleFlyout = function() {
      appState.data.flyoutActive = !appState.data.flyoutActive;
    };

    appState.toggleSlideView = function() {
      //swaps slide/video and pause /play based on auto transition setting
      if (appState.data.autoTransition) {
        if (appState.video.data.playing && !appState.data.slideActive) {
          appState.video.pause();
        } else if (appState.data.slideActive) {
          appState.video.play();
        }
        appState.data.slideActive = !appState.data.slideActive;
      }
    };

    appState.toggleSlideViewClick = function() {
      //click always swaps slide/video but doesn't always pause /play
      if (appState.data.autoTransition) {
        if (appState.video.data.playing && !appState.data.slideActive) {
          appState.video.pause();
        } else if (appState.data.slideActive) {
          appState.video.play();
        }
      }
      appState.data.slideActive = !appState.data.slideActive;
    };

    appState.setTimeIndex = function(index) {
      appState.pres.data.timeIndex = index;
    };

    appState.checkTime = function() {
      if (appState.video.data.playing) {
        if (appState.video.data.currentTime >= appState.pres.data.slideChanges[appState.pres.data.timeIndex].timestamp) {
          appState.pres.data.timeIndex++;
          appState.slide.setSlide(appState.pres.data.slideChanges[appState.pres.data.timeIndex].slide);
          return true;
        }
      }
      return false;
    };

    //store app state data here
    return appState;
  })
  .factory('Auth', function($http, $rootScope, $state, $window) {
    var login = function(user) {
      return $http({
          method: 'POST',
          url: '/api/login',
          data: user
        })
        .then(function(resp) {
          return resp.data.token;
        });
    };

    var register = function(user) {
      return $http({
          method: 'POST',
          url: '/api/register',
          data: user
        })
        .then(function(resp) {
          return resp.data.token;
        })
        .catch(function(err) {
          $state.go('register');
        });
    };

    var logout = function() {
      $rootScope.hasAuth = false;
      $window.localStorage.removeItem('com.lsyncly');
      $state.go('login');
    };

    var isAuth = function() {
      return !!$window.localStorage.getItem('com.lsyncly');
    };

    return {
      login: login,
      register: register,
      logout: logout,
      isAuth: isAuth
    };
  })
  .factory('UserState', function() {
    //store video state data here
    return {};
  })
  .factory('SocketState', function() {
    //store socket state data here
    var socket = {};
    socket.socket = false;
    socket.connect = function() {
      socket.socket = io();
      socket.socket.on('connect', function() {
        console.log('Connected to Server.');
      });
    };
    //socket.connect();
    return socket;
  })
  .factory('VideoState', function($sce) {
    // on youtube init this will be populated with our player
    var videoPlayer;
    //object for video access in app
    var video = {};
    video.data = {};
    video.data.videoReady = false;
    video.data.playing = false;
    video.data.currentTime = 0;
    video.data.aspectRatio = 'aspect16-9';
    video.data.identifier = '6IZ9qZFJ0i8';
    video.data.url = '';

    ytPlayerInit = function(event) {
      //set our video player and remove global access
      videoPlayer = youTubePlayer;
      //clean up youtube globals to avoid outside access
      youTubePlayer = undefined;
      youTubeApiTag = undefined;
      youTubeApiFirstTag = undefined;
      //init player variables and auto update timestamps
      video.data.videoReady = true;
      video.data.unPlayed = true;
      setInterval(updatePlayer, 1000);
    };

    var updatePlayer = function() {
      video.data.currentTime = videoPlayer.getCurrentTime();
    };

    video.play = function() {
      if (!video.data.videoReady) {
        return false;
      } else if (video.data.unPlayed) {
        video.data.unPlayed = false;
        video.seekTo(1);
        video.data.playing = true;
        return true;
      } else {
        video.data.playing = true;
        videoPlayer.playVideo();
        return true;
      }
    };

    video.pause = function() {
      if (!video.data.videoReady) {
        return false;
      }
      video.data.playing = false;
      videoPlayer.pauseVideo();
      return true;
    };

    video.toggle = function() {
      if (!video.data.videoReady) {
        return false;
      } else if (video.data.playing) {
        video.pause();
        return true;
      } else {
        video.play();
        return true;
      }
    };

    video.seekTo = function(number) {
      if (typeof number !== 'number' || !video.data.videoReady) {
        return false;
      }
      videoPlayer.seekTo(number, true);
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
    slide.data.length = 13;
    slide.data.identifier = '1pprD-zp6VBa6nBvRKsPvTiAPMFs67oUmHeqV88DOauw';

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
      slide.data.slideNumber = 1;
      slide.data.url = $sce.trustAsResourceUrl(slide.data.baseUrl + slide.data.slideNumber);
    };

    return slide;
  })
  .factory('PresState', function() {
    presentation = {};
    presentation.data = {
      slideChanges: [{
        timestamp: 5,
        slide: 0
      }, {
        timestamp: 10,
        slide: 1
      }, {
        timestamp: 15,
        slide: 2
      }, {
        timestamp: 20,
        slide: 3
      }, {
        timestamp: 25,
        slide: 4
      }, {
        timestamp: 30,
        slide: 5
      }, {
        timestamp: 35,
        slide: 6
      }, {
        timestamp: 40,
        slide: 7
      }, {
        timestamp: 45,
        slide: 8
      }, {
        timestamp: 50,
        slide: 9
      }, {
        timestamp: 55,
        slide: 10
      }, {
        timestamp: 60,
        slide: 11
      }, {
        timestamp: 65,
        slide: 12
      }, {
        timestamp: 70,
        slide: 13
      }
    ],
      timeIndex: 1
    };


    return presentation;
  });
