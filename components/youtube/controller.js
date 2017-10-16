angular.module('anguvideo.youtube.controller', ['angularLoad', 'anguvideo.player.service'])
  .controller('YoutubePlayerController', ['angularLoad', 'PlayerService', '$scope', '$interval', '$timeout',
    function(angularLoad, PlayerService, $scope, $interval, $timeout) {
      var ctrl = this

      ctrl.ready = false;
      ctrl.timer, ctrl.timeSpent = [];
      ctrl.watchedMinPercentage = 0;

      ctrl.$onInit = function() {
        ctrl.embedUrl = fixUrl(ctrl.url)

        window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

        angularLoad.loadScript('https://www.youtube.com/iframe_api').then(function() {
          ctrl.ready = true

          PlayerService.attachLifecycleListeners($scope, ctrl.player, ctrl.timer)
        })
      }

      var onYouTubeIframeAPIReady = function() {
        if (typeof(YT) !== 'undefined' && typeof(YT.Player) !== 'undefined') {
          ctrl.player = new YT.Player('playerYV', {
            events: {
              'onStateChange': onPlayerStateChange
            }
          })
        }
      }

      var onPlayerStateChange = function(event) {
        if (!event.data) {
          $scope.$emit("anguvideo:finishVideo")

          $interval.cancel(ctrl.timer)
        }

        if (event.data === 1) {
            if (!ctrl.timeSpent.length) {
                for(var i=0, l=parseInt(ctrl.player.getDuration()); i<l; i++)
                  ctrl.timeSpent.push(false)
            }

            ctrl.timer = $interval(function() {
              PlayerService.record($scope, ctrl.timeSpent, ctrl.timer, ctrl.player, ctrl.watchedMinPercentage)
            }, 100)
          } else {
           $interval.cancel(ctrl.timer)
        }
      }

      var fixUrl = function(url) {
        var params = '?autoplay=0&enablejsapi=1&origin=' + location.origin

        if (url.indexOf("youtu.be") >= 0) {
            var newUrl = url.slice(url.indexOf(".be/") + 4, url.length)

            return "http://www.youtube.com/embed/" + newUrl + params
        } else if (url.indexOf("youtube.com") >= 0) {
            if (url.indexOf("embed") >= 0) {
                return url + params
            } else {
                return url.replace("/watch?v=", "/embed/") + params
            }
        }
      }
  }])
