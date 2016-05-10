angular.module('customers-app', [
    'ngRoute',
    'customersApp.templates',
    'mongolab-factory',
    'components.navbar',
    'components.customersList',
    'components.ordersList',
    'components.addCustomer',
    'components.addOrder',
    'components.editCustomer',
    'components.editOrder',
    'components.singleCustomer'
]).config(function (mongolabCustomersProvider, mongolabOrdersProvider, $routeProvider) {
    $routeProvider.when('/customers', {
        template: '<customers-list></customers-list>'
    }).when('/orders', {
        template: '<orders-list></orders-list>'
    }).when('/customers/add', {
        template: '<add-customer></add-customer>'
    }).when('/orders/add', {
        template: '<add-order></add-order>'
    }).when('/orders/edit/:id', {
        template: '<edit-order></edit-order>'
    }).when('/customers/edit/:id', {
        template: '<edit-customer></edit-customer>'
    }).when('/customers/:id', {
        template: '<single-customer></single-customer>'
    }).otherwise({
        redirectTo: '/customers'
    });
});

angular.module('customersApp.templates', []);