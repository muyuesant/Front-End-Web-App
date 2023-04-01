(function (){
    'use strict';
    angular.module('MenuApp')
    .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'src/menuApp/templates/home.template.html'
        })
        .state('categories', {
            url: '/categories',
            templateUrl: 'src/menuApp/templates/categoriesRoute.template.html',
            controller: 'CategoryController as cateCtrl',
            resolve: {
              items: ['MenuDataService', function (MenuDataService) {
                return MenuDataService.getAllCategories();
              }]
            }
        })
        .state('items', {
            url: '/items/{shortName}',
            templateUrl: 'src/menuApp/templates/itemsRoute.template.html',
            controller: 'ItemController as itemCtrl',
            resolve: {
              menuItems: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams) {
                return MenuDataService.getItemsForCategory($stateParams.shortName);
              }]
            }
        });
    };
})();