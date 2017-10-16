angular.module('anguvideo.azure.controller', ['angularLoad'])
  .controller('AzureMediaPlayerController', ['$scope', '$interval', 'PlayerService', 'angularLoad',
    function($scope, $interval, PlayerService, angularLoad) {
      var ctrl = this;

      ctrl.ready = false
      ctrl.timer, ctrl.timeSpent = []
      ctrl.watchedMinPercentage = 0

      ctrl.$onInit = function() {
        angularLoad.loadScript('https://amp.azure.net/libs/amp/latest/azuremediaplayer.min.js').then(function() {
          ctrl.ready = true

          ctrl.player = amp('playerAzure', {
            "nativeControlsForTouch": false,
            autoplay: false,
            controls: true,
            width: "640",
            height: "400"
            }, function() {
                attachLifecycleListeners()
            })

            ctrl.player.src([{
                src: ctrl.url,
                type: "application/x-mpegURL"
            }]);

        })
      }

      var attachLifecycleListeners = function() {
        ctrl.player.addEventListener(amp.eventName.ended, function() {
          $scope.$emit("anguvideo:finishVideo")
          $interval.cancel(ctrl.timer)
        })

        ctrl.player.addEventListener(amp.eventName.pause, function() {
          $interval.cancel(ctrl.timer)
        })

        ctrl.player.addEventListener(amp.eventName.play, function() {
            if (!ctrl.timeSpent.length) {
              for(var i=0, l=parseInt(ctrl.player.duration()); i<l; i++) {
                ctrl.timeSpent.push(false)
              }
            }
        })

        ctrl.player.addEventListener(amp.eventName.timeupdate, function() {
          ctrl.timeSpent[parseInt(ctrl.player.currentTime())] = true
          PlayerService.showPercentage($scope, ctrl.timeSpent, ctrl.timer, ctrl.watchedMinPercentage)
        })

        $scope.$on("pause", function() {
          ctrl.player.pause()
        })

        $scope.$on("play", function() {
          ctrl.player.play()
        })

        $scope.$on("anguvideo:watchedMinPercentage", function() {
          ctrl.player.removeEventListener(amp.eventName.play)
          ctrl.player.removeEventListener(amp.eventName.pause)
          ctrl.player.removeEventListener(amp.eventName.timeupdate)
          ctrl.player = undefined
        })
      }
  }])
