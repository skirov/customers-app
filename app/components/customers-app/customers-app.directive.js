angular.module('customers-app').directive('app', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/components/customers-app/customers-app.html',
        controller: 'customersApp',
        controllerAs: 'ctrl',
        scope: {},
        bindToController: true
    };
});