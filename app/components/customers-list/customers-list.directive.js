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
        }
    }
});