(function (){
    'use strict';
    angular.module('MenuApp')
    .controller('ItemController', ItemController);

    ItemController.$inject = ['menuItems'];
    function ItemController( menuItems) {
        // console.log("in ItemController menuitems:", menuItems)
        var itemCtrl = this;
        itemCtrl.items = menuItems;
    }
})();