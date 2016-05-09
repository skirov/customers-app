angular.module('customers-app', [
    'ngRoute',
    'customersApp.templates',
    'mongolab-factory',
    'components.customersList',
    'components.navbar'
]).config(function (mongolabCustomersProvider, mongolabOrdersProvider, $routeProvider) {
    mongolabCustomersProvider.setConfigs({
        collection: 'customers',
        dataBase: 'kirov-db',
        apiKey: 'PcuAcq0p7LM9Xjpt1FPN6jULOn30EVae'
    });

    mongolabOrdersProvider.setConfigs({
        collection: 'orders',
        dataBase: 'kirov-db',
        apiKey: 'PcuAcq0p7LM9Xjpt1FPN6jULOn30EVae'
    });

    $routeProvider.when('/customers', {
        template: '<customers-list></customers-list>'
    }).otherwise({
        redirectTo: '/customers'
    });
});

angular.module('customersApp.templates', []);