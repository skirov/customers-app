angular.module('components.addOrder', [
    'mongolab-factory'
]).directive('addOrder', function(mongolabCustomers, mongolabOrders, $location) {
    return {
        restrict: 'E',
        templateUrl: 'app/components/add-order/add-order.html',
        scope: {},
        link: function (scope) {
            scope.order = {};
            scope.customers = mongolabCustomers.query();
            
            scope.saveOrder = function () {
                mongolabOrders.save(scope.order).$promise.then(function () {
                    $location.path('/orders');
                });
            }
        }
    }
});