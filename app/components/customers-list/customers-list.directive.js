angular.module('components.customersList', [
    'mongolab-factory'
]).directive('customersList', function(mongolabCustomers, mongolabOrders) {
    return {
        restrict: 'E',
        templateUrl: 'app/components/customers-list/customers-list.html',
        scope: {},
        link: function (scope) {
            scope.customers = mongolabCustomers.query();
            scope.orders = mongolabOrders.query();

            scope.deleteCustomer = function(customer) {
                mongolabCustomers.remove({id: customer._id.$oid}).$promise.then(function(res){
                    scope.customers.splice(scope.customers.indexOf(customer), 1);

                    scope.orders.filter(function(order){
                        return order.customerID === customer._id.$oid;
                    }).forEach(function(order) {
                        mongolabOrders.remove({id: order._id.$oid});
                    });
                });
            }
        }
    }
});