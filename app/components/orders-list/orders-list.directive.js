angular.module('components.ordersList', [
    'mongolab-factory'
]).directive('ordersList', function(mongolabCustomers, mongolabOrders) {
    return {
        restrict: 'E',
        templateUrl: 'app/components/orders-list/orders-list.html',
        scope: {},
        link: function (scope) {
            scope.customers = mongolabCustomers.query();
            scope.orders = mongolabOrders.query();

            scope.deleteOrder = function(order){
                mongolabOrders.remove({id: order._id.$oid}).$promise.then(function () {
                    scope.orders.splice(scope.orders.indexOf(order), 1);
                });
            }
        }
    }
});