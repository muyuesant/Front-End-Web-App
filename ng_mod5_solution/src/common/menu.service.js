(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;
  service.allMenuItems = undefined;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    return $http.get(ApiPath + '/menu_items/' + category + '.json').then(function (response) {
      return response.data;
    });
  };

  service.getAllMenuItems = function () {
    if (service.allMenuItems) {
      return service.allMenuItems;
    }
    else {
      return $http.get(ApiPath + '/menu_items.json').then(function (response) {
        service.allMenuItems = response.data;
        return response.data;
      });
    }
  };

}



})();
