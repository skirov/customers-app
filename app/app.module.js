angular.module('customers-app', [
    'customersApp.templates',
    'mongolab-factory',
    'customers-list',
    'customers-form'
]).config(function (mongolabFactoryProvider, $routeProvider) {
    mongolabFactoryProvider.setConfigs({
        collection: 'customers',
        dataBase: 'kirov-db',
        apiKey: 'PcuAcq0p7LM9Xjpt1FPN6jULOn30EVae'
    });

    $routeProvider.when('/orders', {
        template: '<orders-list></orders-list>'
    }).when('/orders/new', {
        template: '<new-order></new-order>'
    }).when('/orders/edit/:id', {
        template: '<edit-order></edit-order>'
    }).when('/customers', {
        template: '<customers-list></customers-list>'
    }).when('/customers/new', {
        template: '<new-customer></new-customer>'
    }).when('/customers/edit/:id', {
        template: '<edit-customer></edit-customer>'
    }).when('/customers/:id', {
        template: '<customer-view></customer-view>'
    }).otherwise({
        redirectTo: '/customers'
    });
});

angular.module('customersApp.templates', []);