(function () {
    "use strict";
    
    angular.module('public')
    .service('UserService', UserService);
    
    
    function UserService( ) {
      var service = this;
      service.user = {}
    
      service.getUser = function () {
        return service.user;
      };
      service.setUser = function (user) {
       
        service.user.firstName = user.firstName;
        service.user.lastName = user.lastName;
        service.user.email = user.email;
        service.user.phone = user.phone;
        service.user.menuNumber = user.menuNumber;
        service.user.favorite = user.favorite;
        service.user.cate = user.cate;
      };

    }
    
})();
    