angular.module('components.addCustomer', [
    'mongolab-factory'
]).directive('addCustomer', function(mongolabCustomers, mongolabOrders) {
    return {
        restrict: 'E',
        templateUrl: 'app/components/customers-list/add-customer.html',
        scope: {},
        link: function (scope) {
            scope.order = {};
            scope.customers = mongolabCustomers.query();

            scope.saveOrder = function (order) {

            }
        }
    }
});