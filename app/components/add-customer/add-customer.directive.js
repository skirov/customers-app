angular.module('components.addCustomer', [
    'mongolab-factory'
]).directive('addCustomer', function(mongolabCustomers, mongolabOrders, $location) {
    return {
        restrict: 'E',
        templateUrl: 'app/components/add-customer/add-customer.html',
        scope: {},
        link: function (scope) {
            scope.customer = {};

            scope.saveCustomer = function () {
                mongolabCustomers.save(scope.customer).$promise.then(function () {
                    $location.path('/customers')
                });
            }
        }
    }
});