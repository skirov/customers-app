angular.module('components.singleCustomer', [
    'mongolab-factory'
]).directive('singleCustomer', function(mongolabCustomers, mongolabOrders, $routeParams) {
    return {
        restrict: 'E',
        templateUrl: 'app/components/single-customer/single-customer.html',
        scope: {},
        link: function (scope) {
            var customerId = $routeParams.id;
            scope.customer = {};
            scope.orders = mongolabOrders.query();

            mongolabCustomers.query({q:{_id:{$oid:customerId}}}).$promise.then(function (data) {
                scope.customer = data[0];
            });

            scope.deleteOrder = function(order){
                mongolabOrders.remove({id: order._id.$oid}).$promise.then(function () {
                    scope.orders.splice(scope.orders.indexOf(order), 1);
                });
            }
        }
    }
});