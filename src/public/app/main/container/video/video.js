angular.module('lsync.video', ['lsync.services'])
// .constant('videoEvent', {
//     stop:            0, 
//     play:            1,
//     pause:           2,
//     currentTime:     3, 
// })
.controller('VideoController', function($scope){
  
  
  $scope.url='https://www.youtube.com/watch?v=lBqiZSemrqg&ab_channel=TimKindberg';
  
  // $scope.sendVideoEvent=function(videoEvent) {
  //   this.$broadcast(videoEvent);
  // };

  $scope.data={
    width: 600, 
    height: 480, 
    videoid: "M7lc1UVf-VE"
  };
})
.directive('youtube', ['VideoState', function($window, VideoState) {
  return {
    restrict: "E",

    scope: {
      height: "@",
      width: "@",
      videoid: "@"
    },
/////////Create YouTube Iframe and player object////////////////////////
    template: '<div></div>',

    link: function(scope, element) {
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      var player;

      $window.onYouTubeIframeAPIReady = function() {

        player = new YT.Player(element.children()[0], {
          playerVars: {
            autoplay: 1,
            html5: 1,
            theme: "medium",
            modesbranding: 0,
            color: "white",
            iv_load_policy: 3,
            showinfo: 1,
            controls: 1
          },

          height: scope.height,
          width: scope.width,
          videoId: scope.videoid, 
        });
      };
///////////////////////////////////////////////////////////////
      var checkTime=function(){
        $rootScope.currentTime = player.getCurrentTime();
      };
      setInterval(checkTime, 500);
      scope.$watch('videoid', function(newValue, oldValue) {
        if (newValue == oldValue) {
          return;
        }

        player.cueVideoById(scope.videoid);

      }); 

      scope.$watch('height + width', function(newValue, oldValue) {
        if (newValue == oldValue) {
          return;
        }

        player.setSize(scope.width, scope.height);

      });

      // scope.$on(videoEvent.stop, function () {
      //   player.stopVideo();
      // });

      

      // scope.$on(videoEvent.play, function () {
      //   player.playVideo();
      // }); 

      // scope.$on(videoEvent.pause, function () {
      //   player.pauseVideo();
      // });  

      // scope.$on(videoEvent.currentTime, function(){
      //   return player.getCurrentTime();
      // }); 
    }  
  };
}]);



