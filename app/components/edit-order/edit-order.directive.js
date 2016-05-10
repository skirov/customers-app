angular.module('components.editOrder', [
    'mongolab-factory'
]).directive('editOrder', function(mongolabCustomers, mongolabOrders, $routeParams, $location) {
    return {
        restrict: 'E',
        templateUrl: 'app/components/edit-order/edit-order.html',
        scope: {},
        link: function (scope) {
            var orderId = $routeParams.id;
            scope.order = {};
            scope.customers = mongolabCustomers.query();

            mongolabOrders.query({q:{_id:{$oid:orderId}}}).$promise.then(function (data) {
                scope.order = data[0];
            });

            scope.saveEditedOrder = function () {
                mongolabOrders.update({id:orderId},scope.order).$promise.then(function(){
                    $location.path('/orders');
                });
            }
        }
    }
});