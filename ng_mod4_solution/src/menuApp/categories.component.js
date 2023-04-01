(function (){
    'use strict';
    angular.module('MenuApp')
    .component('categories', {
        templateUrl: 'src/menuApp/templates/categoriesComponent.template.html',
        bindings: {
            data: '<'
        }
    });

})();