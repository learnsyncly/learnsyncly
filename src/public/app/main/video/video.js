//video controller
angular.module('lsync.video', [])
.controller('VideoController', function($scope, VideoState) {
  angular.extend($scope, VideoState);
  $scope.init();
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
});
