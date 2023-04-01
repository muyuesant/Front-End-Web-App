(function (){
    'use strict';
    angular.module('MenuApp')
    .component('items', {
        templateUrl: 'src/menuApp/templates/itemsComponent.template.html',
        bindings: {
            data: '<'
        }
    });

})();