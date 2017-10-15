angular.module('anguvideo.azure', ['anguvideo.azure.controller'])
  .component('azureMediaPlayer', {
    templateUrl : './components/azure/component.html',
    controller : 'AzureMediaPlayerController',
    bindings : {
      url : '@'
    }
  })
