angular.module('components.editCustomer', [
    'mongolab-factory'
]).directive('editCustomer', function(mongolabCustomers, $routeParams, $location) {
    return {
        restrict: 'E',
        templateUrl: 'app/components/single-customer/single-customer.html',
        scope: {},
        link: function (scope) {
            var customerId = $routeParams.id;
            scope.customer = {};
            scope.orders = [];

            mongolabCustomers.query({q:{_id:{$oid:customerId}}}).$promise.then(function (data) {
                scope.customer = data[0];
            });

            mongolabOrders.query({q:{customerId: customerId}}).$promise.then(function (data) {
                scope.orders = data;
                debugger;
            });

            scope.saveEditedCustomer = function () {
                mongolabCustomers.update({id:customerId},scope.customer).$promise.then(function(){
                    $location.path('/orders');
                });
            }
        }
    }
});