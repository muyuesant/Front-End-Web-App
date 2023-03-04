(function (){
    'iser strict';
    angular.module('LunchCheck',[])
    .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope']
    function LunchCheckController($scope){
        $scope.items = "";
        $scope.message = "";
        $scope.check = function (){
            // in the code below , "item 1, item2,,item3"  or "item 1, item2, ,item3" is counting as 3 items, not 4
            var items = $scope.items.split(/\s*(?:,|$)\s*/).filter(elm => elm).length;
            if (items > 3) {
                $scope.message = "Too much!";
                $scope.color = "Green";
            } else if(items >0) {
                $scope.message = "Enjoy!";
                $scope.color = "Green";
            } else {
                $scope.message = "Please enter data first";
                $scope.color = "Red";
            }
        };
    }
})();