describe('MenuService', function () {

    var MenuService;
    var $httpBackend;
    var ApiPath;
  
    beforeEach(function () {
      module('common');
  
      inject(function ($injector) {
        MenuService = $injector.get('MenuService');
        $httpBackend = $injector.get('$httpBackend');
        ApiPath = $injector.get('ApiPath');
      });
    });
  

    it('should return all menu items', function() {
        var mockResponse = {
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
        $httpBackend.whenGET(ApiPath + '/menu_items.json').respond(mockResponse);
        MenuService.getAllMenuItems().then(function(response) {
          expect(response).toEqual(mockResponse);
        });
        $httpBackend.flush();
      });
  
  });
  