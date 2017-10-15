angular.module('anguvideo.azure', ['anguvideo.azure.controller'])
  .component('azureMediaPlayer', {
    template : '<link href="//amp.azure.net/libs/amp/latest/skins/amp-default/azuremediaplayer.min.css" rel="stylesheet">' +
                '<div class="anguvideo embed-responsive embed-responsive-16by9">' +
                  '<video id="playerAzure" class="azuremediaplayer amp-default-skin" controls></video>' +
                '</div>',
    controller : 'AzureMediaPlayerController',
    bindings : {
      url : '@'
    }
  })
