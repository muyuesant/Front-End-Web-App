(function () {
    "use strict";
    
    angular.module('public')
    .controller('InfoController', InfoController);
    
    InfoController.$inject = ['UserService'];
    function InfoController(UserService) {
      var $ctrl = this;
      $ctrl.user = UserService.getUser();
    }
    
    })();
    