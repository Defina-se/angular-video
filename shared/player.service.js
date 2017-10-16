angular.module('anguvideo.player.service', [])
  .service('PlayerService', ['$interval', function($interval) {
    var service = this;

    service.attachLifecycleListeners = function($scope, player, timer) {
      $scope.$on("pause", function() {
        player.pauseVideo()
      })

      $scope.$on("play", function() {
        player.playVideo()
      })

      $scope.$on("$destroy", function() {
        $interval.cancel(timer)
      })
    }

    service.showPercentage = function($scope, timeSpent, timer, watchedMinPercentage) {
        var percent = 0

        for (var i=0, l = timeSpent.length; i<l; i++) {
            if (timeSpent[i]) {
              percent++
            }
        }

        percent = Math.round(percent / timeSpent.length * 100)

        if (percent >= 70) {
          service.broadcastWatchedMinPercentage($scope, watchedMinPercentage)
          $interval.cancel(timer)
        }
    }

    service.broadcastWatchedMinPercentage = function($scope, watchedMinPercentage) {
      if (!watchedMinPercentage) {
        $scope.$emit("anguvideo:watchedMinPercentage")
        watchedMinPercentage = true
      }
    }

    service.record = function($scope, timeSpent, timer, player, watchedMinPercentage) {
      timeSpent[parseInt(player.getCurrentTime())] = true

      service.showPercentage($scope, timeSpent, timer, watchedMinPercentage)
    }
  }])
