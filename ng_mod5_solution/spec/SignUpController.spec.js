describe('SignUpController', function () {

    var $controller;
    var signUpController;

    var allMenuMock = {
      "A": {
          "category": {"id":82,"name":"Soup","short_name":"A","special_instructions":""},
          "menu_items":[
              {
                  "description":"chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions",
                  "large_portion_name":"quart",
                  "name":"Won Ton Soup with Chicken",
                  "price_large":5,
                  "price_small":2.55,
                  "short_name":"A1",
                  "small_portion_name":"pint"
              }
              
          ]
      }
  }
  
    beforeEach(function () {

      module(function ($provide) {
        $provide.service('UserServiceMock', function () {
          var service = this;
          service.setUser = function (user) {
           
          };
  
          service.getUser = function () {
            return null;
          };
        });

      });

      module('public');


    });

    beforeEach(inject(function (_$controller_, UserServiceMock) {
      $controller = _$controller_;
      userMock = {"menuNumber": "A1"}
      signUpController =
        $controller('SignUpController',
                    {UserService: UserServiceMock,
                    allMenu: allMenuMock});
      signUpController.user = userMock
  
    }));
  

    it("should found dish", function() {
      signUpController.submit();
      expect(signUpController.foundDish).toBe(true);
    });
  
  });