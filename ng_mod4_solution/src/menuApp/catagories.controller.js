(function (){
    'use strict';
    angular.module('MenuApp')
    .controller('CategoryController', CategoryController);

    CategoryController.$inject = ['items'];
    function CategoryController( items) {
        // console.log("in cate ctrl items:", items)
        var cateCtrl = this;
        cateCtrl.items = items;
    }
})();