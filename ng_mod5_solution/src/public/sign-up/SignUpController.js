(function () {
    "use strict";
    
    angular.module('public')
    .directive('menuNumber', MenuNumberDirective)
    .controller('SignUpController', SignUpController);
    
    SignUpController.$inject = ['allMenu','UserService'];
    function SignUpController(allMenu, UserService) {
      var signCtrl = this;
      signCtrl.user = {};
      signCtrl.allMenu = allMenu;
      signCtrl.foundDish = false;
      signCtrl.saved = false;

      signCtrl.submit = function (){
        // console.log("signCtrl.user: ",signCtrl.user);
        // console.log("UserService.user: ",UserService.getUser());
        signCtrl.foundDish = false;
        signCtrl.saved = false;
        var cate = signCtrl.user.menuNumber.replace(/\d/g,"");
        if (cate.length) {
            var menu = signCtrl.allMenu[cate.toUpperCase()];
            if (menu) {
                var found = menu.menu_items.find(element => element.short_name === signCtrl.user.menuNumber.toUpperCase());
                if (found) {
                    signCtrl.foundDish = true;
                    signCtrl.user.favorite = found;
                    signCtrl.user.cate = cate.toUpperCase();
                }
                // console.log("found: ",found);

            }     
        }
        if (signCtrl.foundDish) {
            // console.log("signCtrl.user: ",signCtrl.user);
            UserService.setUser(signCtrl.user);
            signCtrl.saved = true;
            // console.log("UserService.user: ",UserService.getUser());
        }

      };
      
    }

    MenuNumberDirective.$inject = ['MenuService'];
    function MenuNumberDirective(MenuService){
        var ddo = {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$validators.menuNumber = function(modelValue, viewValue) {
                    var allMenu= MenuService.getAllMenuItems();
                    console.log("modelValue",modelValue)
                    // console.log("allMenu",allMenu)
                    if (modelValue) {
                        var cate = modelValue.replace(/\d/g,"");
                        var menu = allMenu[cate.toUpperCase()];
                        // console.log("menu",menu);
                        if (menu) {
                            var found = menu.menu_items.find(element => element.short_name === modelValue.toUpperCase());
                            // console.log("found",found);
                            if (found) {
                                return true;
                            }
                        }     
                    }
                    // console.log("somthing wrong")
                    return false
                   
                };                 
            }
        };
        return ddo;
    }
    
    
    })();
    