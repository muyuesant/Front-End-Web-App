(function () {
    'user strict';
    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
        .filter("TripleDollar", DollarFilter);

    ToBuyController.$inject = ['ShoppingListCheckOffService']
    function ToBuyController(ShoppingListCheckOffService) {
        var buy = this;

        buy.items = ShoppingListCheckOffService.getToBuyList();

        buy.purchase = function (itemIdex) {
            ShoppingListCheckOffService.buy(itemIdex);
        }
        
        buy.checkQUantity = function (itemIndex) {
            var quantity = buy.items[itemIndex].quantity;
            
            if ( quantity == NaN || quantity === undefined ) {
                quantity = 0;
            }
            buy.items[itemIndex].quantity = Math.abs(quantity);
        }
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService']
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var bought = this;
        bought.items = ShoppingListCheckOffService.getBoughtList();
    }

    function ShoppingListCheckOffService() {
        var service = this;
        var toBuyList = [{ name: "cookies", quantity: 10, pricePerItem: 1.99 },
                        { name: "milk", quantity: 2, pricePerItem: 2.99 },
                        { name: "dry mango", quantity: 20, pricePerItem: 12.99 },
                        { name: "coke", quantity: 50 , pricePerItem: 1.99},
                        { name: "cashews", quantity: 5, pricePerItem: 8.49 },
                        { name: "chips", quantity: 10, pricePerItem: 6.00 }
                        ];
        var boughtList = [];

        service.buy = function (itemIdex) {
            var item = toBuyList[itemIdex];
            boughtList.push(item);
            toBuyList.splice(itemIdex, 1);
        }

        service.getToBuyList = function () {
            return toBuyList;
        }

        service.getBoughtList = function () {
            return boughtList;
        }
    }

    function DollarFilter () {
        return function (input) {
            if ( typeof input === "string") {
                input = Number(input.replace(/[^\d.]/g,''))
            }
            return "$$$" + input.toFixed(2);
        };
    }

})();