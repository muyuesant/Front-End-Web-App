(function (){
    'user strict';
    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive("foundItems",FoundListDirective)
        .constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com");

    NarrowItDownController.$inject = ["MenuSearchService"];
    function NarrowItDownController(MenuSearchService) {
        var mySearch = this;
        mySearch.found = [];
        mySearch.target = "";
        mySearch.emptyMessage = undefined;

        mySearch.search = function(){
            var promise = MenuSearchService.getMatchedMenuItems(mySearch.target);
            promise.then(function (response){
                mySearch.found = response;
                if(mySearch.found.length > 0){
                    mySearch.emptyMessage = undefined;
                } else {
                    mySearch.emptyMessage = "Nothing found";
                }
            });
        };

        mySearch.removeItem = function (itemIndex) {
            mySearch.found.splice(itemIndex, 1);
        };
    };
    
    MenuSearchService.$inject = ['$http','ApiBasePath'];
    function MenuSearchService($http,ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function (searchItem) {
            return $http({
                method: "GET",
                url: (ApiBasePath+"/menu_items.json")
            }).then(function (response){
                var result = [];
                if(searchItem.trim()){
                    for(var [key, value] of Object.entries(response.data)) {
                        value["menu_items"].forEach(elm => {
                            if(elm.description.indexOf(searchItem)>-1){
                                result.push(elm);
                            }
                        });
                    }
                }
                return result;
            });
            
        };
    }

    function FoundListDirective() {
        var ddo = {
            templateUrl: "foundList.html",
            scope: {
                items: '<',
                onRemove: '&'
            }
        };
        return ddo;
    }

})();