angular.module('anguvideo.vimeo.controller', ['angularLoad', 'anguvideo.player.service'])
  .controller('VimeoPlayerController', function(angularLoad, PlayerService, $scope, $interval) {
    var ctrl = this

    ctrl.ready = false
    ctrl.timer, ctrl.timeSpent = []
    ctrl.watchedMinPercentage = 0

    ctrl.$onInit = function() {
      ctrl.embedUrl = fixUrl(ctrl.url)

      angularLoad.loadScript('https://f.vimeocdn.com/js/froogaloop2.min.js').then(function() {
        ctrl.ready = true

        ctrl.player = $f($('#playerVimeo')[0])

        attachLifecycleListeners()
      })
    }

    var fixUrl = function(url) {
      if (url.indexOf("player.vimeo") >= 0) {
          return url
      } else {
          var newUrl = url
          var urlSections = newUrl.split(".com/");

          newUrl = newUrl.replace("vimeo", "player.vimeo");
          newUrl = newUrl.replace("/" + urlSections[urlSections.length - 1], "/video/" + urlSections[urlSections.length - 1] + "");
          newUrl += '?autoplay=undefined&api=1&player_id=playerVimeo';

          return newUrl
      }
    }

    var attachLifecycleListeners = function() {
      ctrl.player.addEvent('ready', function() {
          ctrl.player.addEvent('pause', function() {
            $interval.cancel(ctrl.timer)
          })

          ctrl.player.addEvent('finish', function() {
            $scope.$emit("anguvideo:finishVideo")
            $interval.cancel(ctrl.timer)
          })

          ctrl.player.addEvent('play', function() {
            ctrl.player.api('getDuration', function(duration) {
              if (!ctrl.timeSpent.length) {
                for(var i=0, l=parseInt(duration); i<l; i++) {
                  ctrl.timeSpent.push(false)
                }
              }
            })
          })

          ctrl.player.addEvent('playProgress', function(data, id) {
            ctrl.timeSpent[parseInt(data.seconds)] = true
            PlayerService.showPercentage($scope, ctrl.timeSpent, ctrl.timer, ctrl.watchedMinPercentage)
          })

          $scope.$on("pause", function() {
            ctrl.player.api('pause')
          })

          $scope.$on("play", function() {
            ctrl.player.api('play')
          })

          $scope.$on("anguvideo:watchedMinPercentage", function() {
            ctrl.player.removeEvent('play')
            ctrl.player.removeEvent('playProgress')
            player = undefined
            iframe = undefined
          })
      })
    }
  })
