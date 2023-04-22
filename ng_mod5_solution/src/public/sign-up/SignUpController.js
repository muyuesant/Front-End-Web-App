(function () {
    "use strict";
    
    angular.module('public')
    .controller('SignUpController', SignUpController);
    
    SignUpController.$inject = ['allMenu','UserService'];
    function SignUpController(allMenu, UserService) {
      var signCtrl = this;
      signCtrl.user = {};
      signCtrl.allMenu = allMenu;
      signCtrl.foundDish = false;
      signCtrl.error = false;

      signCtrl.submit = function (){
        console.log("signCtrl.user: ",signCtrl.user);
        console.log("UserService.user: ",UserService.getUser());
        signCtrl.foundDish = false;
        var cate = signCtrl.user.menuNumber.replace(/\d/g,"");
        if (cate.length) {
            var menu = signCtrl.allMenu[cate.toUpperCase()];
            if (menu) {
                var found = menu.menu_items.find(element => element.short_name === signCtrl.user.menuNumber.toUpperCase());
                if (found) {
                    signCtrl.foundDish = true;
                    signCtrl.error = false;
                    signCtrl.user.favorite = found;
                    signCtrl.user.cate = cate.toUpperCase();
                }
                // console.log("found: ",found);

            }     
        }
        if (signCtrl.foundDish == false) {
            signCtrl.error = true;
        }
        else {
            console.log("signCtrl.user: ",signCtrl.user);
            
            UserService.setUser(signCtrl.user);
            console.log("UserService.user: ",UserService.getUser());
        }
        // console.log("signCtrl.foundDish: ",signCtrl.foundDish);
        // console.log("signCtrl.error: ",signCtrl.error);
        // console.log(signCtrl.user);

      };
      
    }
    
    
    })();
    