angular.module('components.addOrder', [
    'mongolab-factory'
]).directive('addOrder', function(mongolabCustomers, mongolabOrders) {
    return {
        restrict: 'E',
        templateUrl: 'app/components/customers-list/add-order.html',
        scope: {},
        link: function (scope) {
            scope.order = {};
            scope.customers = mongolabCustomers.query();
            
            scope.saveOrder = function (order) {
                
            }
        }
    }
});